/**
 * Entry arrangements, modelled as independent dimensions rather than a menu.
 *
 * "Micro GCC or BOT?" is a badly formed question: one is a description of
 * scale and operating style, the other is a description of ownership and
 * transition. They are not alternatives, and a visitor who is offered them as
 * alternatives will pick one for the wrong reason.
 *
 * So the model asks about five independent things - scale, who the legal
 * employer is, who is accountable for delivery, what ownership you intend, and
 * how much of the running you want to do - and then explains the familiar
 * names in terms of those answers. An EOR arrangement settles who the employer
 * is and settles nothing about IP, tax, security or delivery accountability;
 * the model says so rather than letting the name carry the implication.
 *
 * The rules can return "defer a GCC", "start with a limited pod" and
 * "insufficient information". A NeoIntelli-managed option is not the default
 * answer and is not always among the options.
 */

import type { Recommendation } from "./types";

export const PATHWAY_RULES_VERSION = "pathway-rules-1.0.0";

export type ScaleDimension = "small-team" | "micro-centre" | "larger-centre";
export type EmployerDimension = "client-entity" | "provider-entity" | "undecided";
export type AccountabilityDimension = "client-led" | "provider-led" | "shared" | "undecided";
export type OwnershipDimension = "own-now" | "transfer-later" | "no-transfer" | "undecided";
export type OperationsDimension = "self-managed" | "managed" | "undecided";

export interface ArrangementDimensions {
  scale: ScaleDimension;
  employer: EmployerDimension;
  accountability: AccountabilityDimension;
  ownership: OwnershipDimension;
  operations: OperationsDimension;
}

export interface ArrangementInputs extends ArrangementDimensions {
  /** Does an Indian legal entity already exist? */
  entityReady: "yes" | "no" | "in-progress" | "unknown";
  /** Is owning the entity a requirement, or just a preference? */
  ownershipRequired: "required" | "preferred" | "not-required" | "unknown";
  urgency: "under-3-months" | "3-6-months" | "6-12-months" | "no-date";
  /** Is there a named HQ leader accountable for this? */
  accountableLeader: "yes" | "no" | "unknown";
  budgetHorizon: "under-12-months" | "12-24-months" | "over-24-months" | "unknown";
  deliveryMaturity: "established" | "developing" | "new" | "unknown";
  willingToRunOperations: "yes" | "no" | "unknown";
}

export interface PathwayExplanation {
  key: string;
  label: string;
  /** Where this name sits on each dimension. */
  dimensions: Partial<ArrangementDimensions>;
  summary: string;
  /** What the name does NOT settle. The part that gets assumed. */
  doesNotSettle: string[];
}

export const PATHWAY_EXPLANATIONS: PathwayExplanation[] = [
  {
    key: "direct-gcc",
    label: "Direct GCC",
    dimensions: { employer: "client-entity", accountability: "client-led", ownership: "own-now", operations: "self-managed" },
    summary:
      "Your own Indian entity employs the team and you run it. Most control, most set-up work, and the arrangement that needs the most from you before the first hire.",
    doesNotSettle: ["Whether you have the India management bandwidth to run it", "How long entity incorporation actually takes for your structure"],
  },
  {
    key: "managed-operation",
    label: "Managed operation",
    dimensions: { accountability: "shared", operations: "managed" },
    summary:
      "Someone else runs the day-to-day - hiring, HR, workplace, IT - while you keep delivery direction. It is a statement about operations, not about who owns the entity or the IP.",
    doesNotSettle: ["Who the legal employer is", "Who is accountable when delivery slips", "What happens at the end of the arrangement"],
  },
  {
    key: "bot",
    label: "Build-operate-transfer",
    dimensions: { ownership: "transfer-later", operations: "managed" },
    summary:
      "A provider builds and runs the centre with an intention that you take it over later. The transfer is the whole point and it is also the part most often left vague.",
    doesNotSettle: [
      "What triggers the transfer, and whether a headcount number is a trigger or just a review point",
      "What the transfer costs and who bears it",
      "Whether employment terms, tenure and any equity survive it",
      "Whether the contracts, assets and IP are actually assignable",
    ],
  },
  {
    key: "eor-team",
    label: "EOR-enabled team",
    dimensions: { employer: "provider-entity", ownership: "no-transfer" },
    summary:
      "An employer of record holds the employment relationship so you can hire without an entity. It is the fastest way to a first hire and the narrowest in what it decides.",
    doesNotSettle: [
      "Who owns the IP the team produces - that is a contract question, not an EOR feature",
      "Permanent-establishment and transfer-pricing exposure",
      "Security and data access arrangements",
      "Who is accountable for delivery",
    ],
  },
  {
    key: "delivery-pod",
    label: "Delivery pod",
    dimensions: { scale: "small-team", accountability: "provider-led", employer: "provider-entity" },
    summary:
      "A provider-employed, provider-led team delivering against your backlog. A way to start delivering without answering the centre questions yet - and a way to postpone them indefinitely if you are not careful.",
    doesNotSettle: ["Whether this becomes your own team later, and on what terms"],
  },
  {
    key: "micro-centre",
    label: "Micro GCC",
    dimensions: { scale: "micro-centre" },
    summary:
      "A description of scale and operating style - a small centre run lean - not a legal alternative to any of the above. A micro GCC can be direct, managed, or built to transfer.",
    doesNotSettle: ["Every one of the questions above. This name describes size, not structure."],
  },
];

export interface PathwayResult {
  primary: Recommendation | null;
  alternative: Recommendation | null;
  /** Answers that would change the recommendation if they changed. */
  decidingQuestions: string[];
  /** True when the model does not have enough to recommend anything. */
  insufficientInformation: boolean;
}

const unknownCount = (inputs: ArrangementInputs): number =>
  [inputs.entityReady, inputs.ownershipRequired, inputs.accountableLeader, inputs.budgetHorizon, inputs.deliveryMaturity, inputs.willingToRunOperations]
    .filter((value) => value === "unknown").length;

function build(
  ruleId: string,
  triggeringInputs: string[],
  headline: string,
  explanation: string,
  alternatives: string[],
  missingEvidence: string[],
  confidence: Recommendation["confidence"],
): Recommendation {
  return { ruleId, ruleVersion: PATHWAY_RULES_VERSION, triggeringInputs, headline, explanation, alternatives, missingEvidence, confidence };
}

/**
 * The pathway rules.
 *
 * Deterministic and ordered: the first rule that fires wins, and the order is
 * the order of the checks below. "Defer" and "insufficient information" are
 * real outcomes, reached before any arrangement is suggested.
 */
export function recommendPathway(inputs: ArrangementInputs): PathwayResult {
  const decidingQuestions: string[] = [];

  if (inputs.accountableLeader === "unknown" || inputs.ownershipRequired === "unknown") {
    decidingQuestions.push("Who at HQ is accountable for this centre?", "Is owning the entity a requirement or a preference?");
  }

  if (unknownCount(inputs) >= 3) {
    return {
      primary: build(
        "insufficient-information",
        ["three or more inputs unknown"],
        "Not enough answered to recommend an arrangement",
        "Too much of this is still open to choose a structure honestly. Answer the ownership requirement, whether there is an accountable HQ leader and whether an entity exists, and this will produce a recommendation rather than a guess.",
        [],
        ["Ownership requirement", "Accountable HQ leader", "Entity status"],
        "insufficient-evidence",
      ),
      alternative: null,
      decidingQuestions: ["Ownership requirement", "Accountable HQ leader", "Entity status", "Budget horizon"],
      insufficientInformation: true,
    };
  }

  // No accountable owner is a gate, not a preference. Nothing else is worth
  // recommending until it is answered.
  if (inputs.accountableLeader === "no") {
    return {
      primary: build(
        "defer-no-owner",
        ["accountableLeader=no"],
        "Defer the centre until someone owns it",
        "There is no named HQ leader accountable for this. A first India team without an owner at HQ is the failure mode this model treats as a gate rather than a risk - the structure you pick will not fix it. Name an owner, then come back to this.",
        ["Start with a small provider-led pod under an existing HQ manager while ownership is settled"],
        ["Who would hold the mandate", "Whether that person has decision rights over budget and hiring"],
        "planning-grade",
      ),
      alternative: build(
        "limited-pod",
        ["accountableLeader=no"],
        "Or start with a limited pod",
        "A small provider-led pod can deliver something useful under an existing HQ manager without committing to a centre. It postpones the ownership question rather than answering it, so put a date on when it gets answered.",
        [],
        ["What the pod would deliver", "When the ownership decision gets made"],
        "indicative",
      ),
      decidingQuestions: ["Who at HQ will be accountable?", "By when?"],
      insufficientInformation: false,
    };
  }

  if (inputs.budgetHorizon === "under-12-months" && inputs.ownershipRequired !== "required") {
    return {
      primary: build(
        "short-horizon-pod",
        ["budgetHorizon=under-12-months"],
        "Start with a limited pod, not a centre",
        "A funding horizon under twelve months is shorter than the time it takes a centre to be worth its set-up cost. A pod delivers inside the horizon you actually have, and leaves the centre decision to a point where you can fund it.",
        ["Secure a longer funding horizon first", "Direct GCC anyway, if a strategic mandate outranks the funding horizon"],
        ["Whether the horizon is a hard limit or a review point"],
        "planning-grade",
      ),
      alternative: build(
        "eor-first-hires",
        ["budgetHorizon=under-12-months", `entityReady=${inputs.entityReady}`],
        "Or hire the first two or three through an EOR",
        "An EOR gets people working without an entity. Settle IP assignment, security and delivery accountability in the contract - the EOR arrangement itself decides none of them.",
        [],
        ["IP assignment terms", "Permanent-establishment advice for your structure"],
        "planning-grade",
      ),
      decidingQuestions: ["Is the funding horizon hard?", "Is entity ownership a requirement?"],
      insufficientInformation: false,
    };
  }

  if (inputs.ownershipRequired === "required" && inputs.entityReady === "yes") {
    return {
      primary: build(
        "direct-gcc",
        ["ownershipRequired=required", "entityReady=yes"],
        "Direct GCC",
        "You need to own it and the entity already exists, so the structural question is settled. What is left is capacity: hiring, HR, workplace and IT all have to be run by somebody.",
        ["Managed operation on your own entity, if you do not want to run the day-to-day"],
        ["Whether you have India management bandwidth", "Who runs hiring in the first six months"],
        "planning-grade",
      ),
      alternative:
        inputs.willingToRunOperations === "no"
          ? build(
              "managed-on-own-entity",
              ["willingToRunOperations=no"],
              "Or a managed operation on your own entity",
              "You keep the entity and the IP; someone else runs hiring, HR, workplace and IT. Ownership and operations are separate decisions and this arrangement takes them separately.",
              [],
              ["What the fee covers, and which cost lines it replaces"],
              "planning-grade",
            )
          : null,
      decidingQuestions: ["Who runs day-to-day operations?", "Who owns hiring in the first six months?"],
      insufficientInformation: false,
    };
  }

  if (inputs.ownershipRequired === "required" && inputs.entityReady !== "yes" && inputs.urgency === "under-3-months") {
    return {
      primary: build(
        "build-to-transfer",
        ["ownershipRequired=required", "entityReady=no", "urgency=under-3-months"],
        "Start under a provider, with a written transfer path",
        "You need ownership eventually and you need people sooner than an entity can realistically be stood up. That is the case a transfer arrangement exists for - but only if the transfer terms are written at the start, not deferred to a later negotiation.",
        ["Push the start date back and incorporate first", "Hire two or three people through an EOR while the entity is set up"],
        [
          "What triggers the transfer, in writing",
          "What the transfer costs and who bears it",
          "Whether employment terms and tenure survive it",
          "Whether contracts, assets and IP are assignable",
        ],
        "planning-grade",
      ),
      alternative: build(
        "incorporate-first",
        ["ownershipRequired=required"],
        "Or incorporate first and start later",
        "If the date is softer than it looks, incorporating first removes the transfer question entirely - and the transfer question is where these arrangements most often go wrong.",
        [],
        ["How firm the start date really is"],
        "planning-grade",
      ),
      decidingQuestions: ["How firm is the start date?", "Are the transfer terms negotiable now rather than later?"],
      insufficientInformation: false,
    };
  }

  if (inputs.deliveryMaturity === "new" && inputs.scale === "small-team") {
    return {
      primary: build(
        "pod-first",
        ["deliveryMaturity=new", "scale=small-team"],
        "Delivery pod first",
        "A small team and a delivery practice that is still forming is the combination where a provider-led pod earns its keep: you get delivery while your own operating model settles. Put a review date on when it converts, or it will not.",
        ["Direct hire if you have an experienced India lead available now"],
        ["When the conversion review happens", "What would make you convert"],
        "planning-grade",
      ),
      alternative: null,
      decidingQuestions: ["When does the pod get reviewed for conversion?"],
      insufficientInformation: false,
    };
  }

  return {
    primary: build(
      "managed-operation",
      [`scale=${inputs.scale}`, `willingToRunOperations=${inputs.willingToRunOperations}`],
      "A managed operation is the closest fit on these answers",
      "On what you have answered, the operating burden is the binding constraint rather than ownership or urgency. A managed arrangement takes hiring, HR, workplace and IT off you while you keep delivery direction. Check what the fee covers before comparing it to a self-run cost - the two are only comparable when the same scope sits on both sides.",
      ["Direct GCC if you want to run it yourself", "Delivery pod if you want to start smaller"],
      ["Which cost lines the fee replaces", "What happens at the end of the arrangement"],
      "planning-grade",
    ),
    alternative: build(
      "direct-gcc-alt",
      [`entityReady=${inputs.entityReady}`],
      "Or a direct GCC",
      "If you have the India management bandwidth, running it yourself removes a fee layer and a dependency. It also means hiring, HR, workplace and IT become your problem from day one.",
      [],
      ["India management bandwidth"],
      "planning-grade",
    ),
    decidingQuestions: [
      "Do you want to run day-to-day operations?",
      "Is owning the entity a requirement?",
      "How firm is the start date?",
    ],
    insufficientInformation: false,
  };
}

/**
 * Headcount milestones are review triggers, never automatic transfer events.
 * The model has no default transfer date, fee, tenure outcome or equity
 * treatment, and will not produce one.
 */
export const TRANSFER_READINESS_CHECKS = [
  "Contracts: are the client, vendor and employment contracts assignable?",
  "Employment: what happens to notice, tenure, benefits and any equity on transfer?",
  "Assets: who owns the laptops, licences and workspace lease?",
  "IP: is assignment already in place, or does it happen at transfer?",
  "Entity: is the receiving entity incorporated, registered and able to run payroll?",
];

export const TRANSFER_MILESTONE_NOTE =
  "A headcount number is a good moment to review whether transfer makes sense. It is not a trigger, and this model attaches no default timeline, fee, tenure outcome or equity treatment to it.";
