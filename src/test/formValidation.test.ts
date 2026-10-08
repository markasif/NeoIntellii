import { describe, it, expect } from "vitest";
import {
  validateWorkEmail,
  validateCompanyName,
  validatePhone,
  validateRequiredChoice,
  validateSelectedRoles,
  isPersonalEmailDomain,
} from "@/lib/formValidation";

describe("validateWorkEmail", () => {
  it("accepts company addresses", () => {
    for (const email of [
      "kr@neointelli.com",
      "first.last@acme.co.uk",
      "hiring+ai@sub.example.io",
      "j.muller@bäckerei-müller.de",
      "talent@société-générale.fr",
      "HR@ACME.COM",
    ]) {
      expect(validateWorkEmail(email), email).toBeNull();
    }
  });

  it("rejects consumer mailboxes, including country variants", () => {
    for (const email of [
      "someone@gmail.com",
      "someone@googlemail.com",
      "someone@yahoo.com",
      "someone@yahoo.fr",
      "someone@yahoo.co.in",
      "someone@hotmail.de",
      "someone@outlook.com",
      "someone@live.co.uk",
      "someone@icloud.com",
      "someone@gmx.de",
      "someone@web.de",
      "someone@orange.fr",
      "someone@libero.it",
      "someone@wp.pl",
      "someone@seznam.cz",
      "someone@mail.ru",
      "someone@qq.com",
      "someone@rediffmail.com",
      "someone@aol.com",
      "someone@protonmail.com",
    ]) {
      expect(validateWorkEmail(email), email).toMatch(/valid company email/);
    }
  });

  it("rejects disposable inboxes", () => {
    expect(validateWorkEmail("x@mailinator.com")).toMatch(/valid company email/);
    expect(validateWorkEmail("x@yopmail.com")).toMatch(/valid company email/);
  });

  it("is case-insensitive about the blocked domain", () => {
    expect(validateWorkEmail("Someone@GMail.COM")).toMatch(/valid company email/);
  });

  it("does not block a company domain that merely contains a blocked name", () => {
    expect(validateWorkEmail("careers@gmail.company.com")).toBeNull();
    expect(validateWorkEmail("hi@notgmail.com")).toBeNull();
  });

  it("rejects malformed addresses", () => {
    for (const email of ["", "  ", "no-at-sign", "a@b", "a@@b.com", "a b@c.com", "@acme.com", "a@acme."]) {
      expect(validateWorkEmail(email), JSON.stringify(email)).not.toBeNull();
    }
  });

  it("names the field when the value is empty", () => {
    expect(validateWorkEmail("")).toBe("Work email is required.");
  });

  it("exposes the domain check on its own", () => {
    expect(isPersonalEmailDomain("a@gmail.com")).toBe(true);
    expect(isPersonalEmailDomain("a@neointelli.com")).toBe(false);
  });
});

describe("validateCompanyName", () => {
  it("accepts European accents, non-Latin scripts and digits", () => {
    for (const name of [
      "Bäckerei Müller GmbH",
      "Société Générale",
      "Ørsted A/S",
      "Nestlé S.A.",
      "Æther Labs",
      "Straßenbau AG",
      "Škoda Auto a.s.",
      "Łódź Software Sp. z o.o.",
      "Ericsson (Sweden) AB",
      "3M",
      "7-Eleven",
      "AT&T",
      "O'Reilly Media",
      "Zoë’s Analytics",
      "Ωmega Systems",
      "株式会社ソニー",
    ]) {
      expect(validateCompanyName(name), name).toBeNull();
    }
  });

  it("requires a value with at least one letter or digit", () => {
    expect(validateCompanyName("")).toBe("Company name is required.");
    expect(validateCompanyName("   ")).toBe("Company name is required.");
    expect(validateCompanyName("---")).not.toBeNull();
    expect(validateCompanyName("A")).not.toBeNull();
  });

  it("rejects unsupported characters", () => {
    expect(validateCompanyName("Acme <script>")).toMatch(/unsupported characters/);
    expect(validateCompanyName("Acme {corp}")).toMatch(/unsupported characters/);
  });
});

describe("validatePhone", () => {
  it("passes when left empty - it is the only optional field", () => {
    expect(validatePhone("")).toBeNull();
    expect(validatePhone("   ")).toBeNull();
  });

  it("accepts international formats", () => {
    for (const phone of [
      "+91 98765 43210",
      "+33 1 23 45 67 89",
      "+44 (0)20 7123 4567",
      "+49-30-901820",
      "020 7123 4567",
      "+1 (415) 555-2671",
      "+46 8 123 456 78",
    ]) {
      expect(validatePhone(phone), phone).toBeNull();
    }
  });

  it("accepts the non-breaking spaces French and Nordic locales paste in", () => {
    expect(validatePhone("+33 1 23 45 67 89")).toBeNull();
    expect(validatePhone("+46 8 123 456 78")).toBeNull();
  });

  it("rejects letters and implausible lengths", () => {
    expect(validatePhone("call me")).not.toBeNull();
    expect(validatePhone("12345")).not.toBeNull();
    expect(validatePhone("+1234567890123456")).not.toBeNull();
    expect(validatePhone("+44 +1 20 7123 4567")).not.toBeNull();
  });
});

describe("required choices", () => {
  it("flags an unmade selection", () => {
    expect(validateRequiredChoice("", "your company type")).toBe("Please select your company type.");
    expect(validateRequiredChoice("AI startup", "your company type")).toBeNull();
    expect(validateSelectedRoles([])).toBe("Please select at least one role.");
    expect(validateSelectedRoles(["GenAI Engineer"])).toBeNull();
  });
});
