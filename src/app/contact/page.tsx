import type { Metadata } from "next";

import { ContactPageView } from "@/features/contact";
import { ContactJsonLd } from "@/features/contact/components/contact-json-ld";
import { getCachedContactPageData } from "@/features/contact/lib/contact-data";
import { buildContactPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { profile, siteSettings } = await getCachedContactPageData();
  return buildContactPageMetadata(profile, siteSettings);
}

export default async function ContactPage() {
  const { profile, siteSettings } = await getCachedContactPageData();

  return (
    <>
      <ContactJsonLd profile={profile} siteSettings={siteSettings} />
      <ContactPageView profile={profile} siteSettings={siteSettings} />
    </>
  );
}
