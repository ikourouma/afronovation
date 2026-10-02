import { JsonLd } from "@/components/json-ld";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteTopBars } from "@/components/layout/site-top-bars";
import { filterLiveSocialAccounts } from "@/content/social";
import { siteName, tagline } from "@/content/site";
import { getCollection, getSingleton } from "@/lib/cms/read";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronovation.com";

// Admin-managed content is cached in the static pages and refreshed on every
// admin save; the hourly refresh also applies flash-banner start/end dates.
export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [contact, socialAccounts, menuFeatures] = await Promise.all([
    getSingleton("contactDetails"),
    getCollection("socialAccounts"),
    getCollection("menuFeatures"),
  ]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    description: tagline,
    url: siteUrl,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
    },
    // Official profiles, once each social account is switched on in the admin.
    sameAs: filterLiveSocialAccounts(socialAccounts).map((account) => account.url),
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteTopBars />
      <SiteHeader features={menuFeatures} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <MobileCtaBar />
      <ScrollReveal />
    </>
  );
}
