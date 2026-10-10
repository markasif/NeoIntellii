import LegalPage from "@/components/shared/LegalPage";

export default function CookiePolicy() {
  return (
    <LegalPage
      pageTitle="Cookie Policy | NeoIntelli"
      title="Cookie Policy"
      blocks={[
        { body: "This website uses cookies and similar technologies to improve your browsing experience, understand site usage, and support core functionality." },
        {
          heading: "What are cookies?",
          body: "Cookies are small text files stored on your device when you visit a website. They help remember preferences and enable key website features.",
        },
        {
          heading: "How we use cookies",
          body: "NeoIntelli may use essential cookies for site operation and analytics cookies to understand traffic and improve performance.",
        },
        {
          heading: "Managing cookies",
          body: "You can control or disable cookies through your browser settings. Disabling certain cookies may impact how parts of the website function.",
        },
      ]}
    />
  );
}
