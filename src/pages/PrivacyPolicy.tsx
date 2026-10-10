import LegalPage from "@/components/shared/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      pageTitle="Privacy Policy | NeoIntelli"
      title="Privacy Policy"
      blocks={[
        { body: "NeoIntelli is committed to protecting your privacy. This policy explains what information we collect, how we use it, and the choices you have when you use our website." },
        {
          heading: "Information we collect",
          body: "We may collect information you provide directly, such as your name, email, phone number, company details, and any message submitted through our contact forms.",
        },
        {
          heading: "How we use information",
          body: "We use your information to respond to inquiries, deliver requested services, improve our website, and communicate relevant updates about NeoIntelli.",
        },
        {
          heading: "Data sharing and security",
          body: "We do not sell personal information. Information is shared only with trusted partners required to operate our services or where legally required. We use reasonable safeguards to protect your data.",
        },
        {
          body: (
            <>
              For privacy-related requests, please contact us at{" "}
              <a
                href="mailto:reachus@neointelli.com"
                className="text-[#008EC4] font-semibold hover:text-[#0D306C] transition-colors"
              >
                reachus@neointelli.com
              </a>
              .
            </>
          ),
        },
      ]}
    />
  );
}
