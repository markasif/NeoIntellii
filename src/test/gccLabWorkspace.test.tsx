import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LabWorkspace from "@/components/gcc-lab/LabWorkspace";
import { STORAGE_KEY } from "@/lib/gcc-lab/storage";

vi.mock("recharts", async () => {
  const original = await vi.importActual<typeof import("recharts")>("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children?: React.ReactNode }) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  };
});

/**
 * Behaviour tests for the workspace itself: the things that are only true once
 * the pieces are wired together - inputs surviving a move between areas, a
 * suggestion never overwriting an edit silently, and above all that a visitor
 * who never asks for a review sends nothing anywhere.
 */

const applyStarterTeam = async (user: ReturnType<typeof userEvent.setup>, name: RegExp) => {
  await user.click(screen.getByRole("button", { name: "Use a starter team" }));
  await user.click(screen.getByRole("button", { name }));
  await user.click(screen.getByRole("button", { name: /Apply to my team/ }));
};

describe("the workspace", () => {
  let fetchSpy: ReturnType<typeof vi.fn>;
  let sendBeaconSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    window.localStorage.clear();
    fetchSpy = vi.fn(() => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) } as Response));
    vi.stubGlobal("fetch", fetchSpy);
    sendBeaconSpy = vi.fn(() => true);
    Object.defineProperty(window.navigator, "sendBeacon", { value: sendBeaconSpy, configurable: true });
    // jsdom has no layout engine; the chart and the sticky panel do not need one.
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("asks for nothing but a country, a team and a city before showing a number", () => {
    render(<LabWorkspace />);

    expect(screen.getByLabelText(/Head office country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City in India/i)).toBeInTheDocument();
    // Nothing that gates the first estimate.
    expect(screen.queryByLabelText(/^Work email/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/revenue/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/annual revenue|company name/i)).not.toBeInTheDocument();
  });

  it("labels the opening city as an assumption until one is chosen", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    expect(screen.getAllByText(/opening assumption/i).length).toBeGreaterThan(0);

    await user.selectOptions(screen.getByLabelText(/City in India/i), "hyderabad");
    await waitFor(() => {
      expect(screen.queryByText(/is the workspace's opening assumption, not a recommendation/i)).not.toBeInTheDocument();
    });
  });

  it("previews a team suggestion as a diff and can undo it", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);

    await user.click(screen.getByRole("button", { name: "Use a starter team" }));
    await user.click(screen.getByRole("button", { name: /GenAI application team/ }));

    // The diff is shown before anything is applied.
    expect(screen.getByText(/What applying this would change/i)).toBeInTheDocument();
    expect(screen.getByText(/Add 1 x AI Engineers \(senior\)/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Undo:/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Apply to my team/ }));

    expect(await screen.findByRole("button", { name: /Undo:/ })).toBeInTheDocument();
    expect(screen.getAllByLabelText(/^Role$/i).length).toBe(3);

    await user.click(screen.getByRole("button", { name: /Undo:/ }));
    await waitFor(() => expect(screen.queryAllByLabelText(/^Role$/i).length).toBe(0));
  }, 15000);

  it("keeps the team and the inputs when the city changes", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    expect(screen.getAllByLabelText(/^Role$/i).length).toBe(3);

    await user.selectOptions(screen.getByLabelText(/City in India/i), "chennai");

    expect(screen.getAllByLabelText(/^Role$/i).length).toBe(3);
    expect((screen.getByLabelText(/City in India/i) as HTMLSelectElement).value).toBe("chennai");
  }, 15000);

  it("keeps inputs when moving between areas", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    await user.selectOptions(screen.getByLabelText(/Head office country/i), "NO");
    await applyStarterTeam(user, /Data platform team/);

    await user.click(screen.getByRole("button", { name: "Prepare" }));
    expect(await screen.findByText(/How you would enter/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Team & cost" }));
    expect((await screen.findByLabelText(/Head office country/i)) as HTMLSelectElement).toHaveValue("NO");
    expect(screen.getAllByLabelText(/^Role$/i).length).toBeGreaterThan(0);
  }, 15000);

  it("sends nothing anywhere while a visitor only calculates", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);

    await applyStarterTeam(user, /Agentic workflow team/);
    await user.selectOptions(screen.getByLabelText(/City in India/i), "pune");
    await user.click(screen.getByRole("button", { name: "Compare" }));
    await user.click(screen.getByRole("button", { name: "Prepare" }));
    await user.click(screen.getByRole("button", { name: "Decision pack" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(sendBeaconSpy).not.toHaveBeenCalled();
    // Nothing persisted either: saving is a deliberate act.
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("puts no profile content in the URL", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.selectOptions(screen.getByLabelText(/City in India/i), "hyderabad");

    expect(window.location.search).toBe("");
    expect(window.location.href).not.toMatch(/hyderabad|overrideAnnual|salary/i);
  });

  it("says the economics are unavailable rather than drawing a line with no baseline", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.click(screen.getByRole("button", { name: "Compare" }));

    expect(await screen.findByText(/No baseline costs have been entered/i)).toBeInTheDocument();
    expect(screen.getByText(/only you have that/i)).toBeInTheDocument();
  });

  it("gives the chart a table alternative once there is a baseline to chart", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.click(screen.getByRole("button", { name: "Compare" }));

    await user.click(await screen.findByRole("button", { name: /Add a baseline role/i }));
    const cost = await screen.findByLabelText(/Fully loaded annual cost/i);
    await user.type(cost, "200000");

    // The same numbers are available as a table, not only as a line.
    expect(await screen.findByText(/The same data, as a table/i)).toBeInTheDocument();
    const table = screen.getByRole("region", { name: /Cumulative cash difference by month/i });
    expect(within(table).getAllByRole("row").length).toBeGreaterThan(3);
  });

  it("labels a cost line with no approved figure as not budgeted, never as zero", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);

    const rows = await screen.findAllByText("Not budgeted");
    expect(rows.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Excluded from these figures/i).length).toBeGreaterThan(0);
  });

  it("is operable from the keyboard alone", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);

    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Team & cost" }));

    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Compare" }));

    await user.keyboard("{Enter}");
    expect(await screen.findByText(/What are you comparing against/i)).toBeInTheDocument();
  });

  it("announces a recalculation politely, once, rather than on every keystroke", async () => {
    render(<LabWorkspace />);
    const region = document.querySelector('[aria-live="polite"]');
    expect(region).toBeTruthy();
    expect(region).toHaveAttribute("aria-atomic", "true");
    expect(region?.textContent).toBe("");
  });

  it("marks the site chrome and the controls as non-printing so the pack prints alone", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.click(screen.getByRole("button", { name: "Decision pack" }));

    expect(await screen.findByRole("button", { name: /Download PDF/i })).toBeInTheDocument();
    expect(document.querySelectorAll(".no-print").length).toBeGreaterThan(0);
  });
});

describe("the review request", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shows what would be sent, and will not send without explicit consent", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn(() => Promise.resolve({ ok: true, status: 200 } as Response));
    vi.stubGlobal("fetch", fetchSpy);

    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.click(screen.getByRole("button", { name: "Decision pack" }));

    const form = await screen.findByText(/This is what would be sent/i);
    expect(form).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /Review my GCC case/i });
    expect(submit).toBeDisabled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("keeps marketing permission separate from the consent needed to send", async () => {
    const user = userEvent.setup();
    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.click(screen.getByRole("button", { name: "Decision pack" }));

    const consent = await screen.findByLabelText(/Send this case and my contact details/i);
    const marketing = screen.getByLabelText(/occasional NeoIntelli updates/i);

    expect(consent).not.toBeChecked();
    expect(marketing).not.toBeChecked();

    await user.click(consent);
    expect(marketing).not.toBeChecked();
    expect(screen.getByRole("button", { name: /Review my GCC case/i })).toBeEnabled();
  });

  it("reuses one submission id across a retry, so a failed send cannot create two leads", async () => {
    const user = userEvent.setup();
    const bodies: string[] = [];
    const fetchSpy = vi.fn((url: string, init?: RequestInit) => {
      if (String(url).includes("__forms")) {
        bodies.push(String(init?.body ?? ""));
        // Fail the first attempt, accept the second.
        return bodies.length === 1
          ? Promise.resolve({ ok: false, status: 500 } as Response)
          : Promise.resolve({ ok: true, status: 200 } as Response);
      }
      return Promise.resolve({ ok: true, status: 200 } as Response);
    });
    vi.stubGlobal("fetch", fetchSpy);

    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.click(screen.getByRole("button", { name: "Decision pack" }));

    await user.type(await screen.findByLabelText(/Your name/i), "Sam Taylor");
    await user.type(screen.getByLabelText(/Work email/i), "sam@examplecorp.com");
    await user.type(screen.getByLabelText(/^Company$/i), "Example Corp");
    await user.click(screen.getByLabelText(/Send this case and my contact details/i));

    await user.click(screen.getByRole("button", { name: /Review my GCC case/i }));
    expect(await screen.findByText(/We could not save your request/i)).toBeInTheDocument();
    // A failed save is never reported as success.
    expect(screen.queryByText(/Request sent/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Try again/i }));
    await screen.findByText(/Request sent/i);

    expect(bodies).toHaveLength(2);
    const idOf = (body: string) => new URLSearchParams(body).get("submissionId");
    expect(idOf(bodies[0])).toBeTruthy();
    expect(idOf(bodies[1])).toBe(idOf(bodies[0]));
  });

  it("sends coarse case facts and no salaries, privacy answers or readiness answers", async () => {
    const user = userEvent.setup();
    let body = "";
    const fetchSpy = vi.fn((url: string, init?: RequestInit) => {
      if (String(url).includes("__forms")) body = String(init?.body ?? "");
      return Promise.resolve({ ok: true, status: 200 } as Response);
    });
    vi.stubGlobal("fetch", fetchSpy);

    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.click(screen.getByRole("button", { name: "Decision pack" }));

    await user.type(await screen.findByLabelText(/Your name/i), "Sam Taylor");
    await user.type(screen.getByLabelText(/Work email/i), "sam@examplecorp.com");
    await user.type(screen.getByLabelText(/^Company$/i), "Example Corp");
    await user.click(screen.getByLabelText(/Send this case and my contact details/i));
    await user.click(screen.getByRole("button", { name: /Review my GCC case/i }));
    await screen.findByText(/Request sent/i);

    const params = new URLSearchParams(body);
    expect(params.get("caseId")).toMatch(/^NI-/);
    expect(params.get("consent")).toBe("yes");
    expect(params.get("marketingConsent")).toBe("no");
    expect(params.get("teamSize")).toBe("3");
    // Nothing that would be a salary, a privacy answer or a readiness answer.
    expect(params.get("overrideAnnual")).toBeNull();
    expect(params.get("readiness")).toBeNull();
    expect(params.get("dataOriginMarkets")).toBeNull();
  });

  it("makes no promise about a response time", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true, status: 200 } as Response)));

    render(<LabWorkspace />);
    await applyStarterTeam(user, /GenAI application team/);
    await user.click(screen.getByRole("button", { name: "Decision pack" }));

    await user.type(await screen.findByLabelText(/Your name/i), "Sam Taylor");
    await user.type(screen.getByLabelText(/Work email/i), "sam@examplecorp.com");
    await user.type(screen.getByLabelText(/^Company$/i), "Example Corp");
    await user.click(screen.getByLabelText(/Send this case and my contact details/i));
    await user.click(screen.getByRole("button", { name: /Review my GCC case/i }));

    const confirmation = await screen.findByText(/We have not promised a response time/i);
    expect(confirmation).toBeInTheDocument();
    expect(screen.queryByText(/within 24 hours|1 business day|same day/i)).not.toBeInTheDocument();
  });
});
