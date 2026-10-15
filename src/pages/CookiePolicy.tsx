import LegalPage from "@/components/shared/LegalPage";
import { openCookieSettings } from "@/lib/consent";

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
          body: "NeoIntelli uses essential cookies to run the site. Analytics and marketing cookies — including Google Analytics, Google Ads and campaign measurement tools — are optional and only start after you accept them from the cookie banner.",
        },
        {
          heading: "Managing cookies",
          body: (
            <>
              <p className="mb-4">
                You can change your choice at any time, and you can also control or
                disable cookies through your browser settings. Disabling certain
                cookies may impact how parts of the website function.
              </p>
              <button
                type="button"
                onClick={openCookieSettings}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-[13px] font-bold text-white bg-[#169DC8] hover:bg-[#008EC4] shadow-sm transition-all duration-200"
              >
                Manage cookie preferences
              </button>
            </>
          ),
        },
      ]}
    />
  );
}
