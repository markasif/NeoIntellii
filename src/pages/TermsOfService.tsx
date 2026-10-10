import LegalPage from "@/components/shared/LegalPage";

export default function TermsOfService() {
  return (
    <LegalPage
      pageTitle="Terms of Service | NeoIntelli"
      title="Terms of Service"
      blocks={[
        { body: "By using this website, you agree to these terms. If you do not agree, please do not use this site." },
        {
          heading: "Use of the website",
          body: "Content on this site is provided for general information. You agree not to misuse the website, attempt unauthorized access, or interfere with site functionality.",
        },
        {
          heading: "Intellectual property",
          body: "All website content, branding, and materials are owned by NeoIntelli unless otherwise stated and may not be reproduced without prior written permission.",
        },
        {
          heading: "Limitation of liability",
          body: "NeoIntelli is not liable for any direct or indirect losses arising from use of this website. External links are provided for convenience and may be governed by third-party terms.",
        },
        { body: "We may update these terms periodically. Continued use of the site indicates acceptance of any changes." },
      ]}
    />
  );
}
