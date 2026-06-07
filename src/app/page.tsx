import type { Metadata } from "next";

import { HomeJsonLd } from "@/features/home/components/home-json-ld";
import { HomePageView } from "@/features/home";
import {
  getCachedHomePageData,
  getCachedSiteSettings,
} from "@/features/home/lib/home-data";
import { buildHomeMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [data, siteSettings] = await Promise.all([
    getCachedHomePageData(),
    getCachedSiteSettings(),
  ]);

  return buildHomeMetadata(data, siteSettings);
}

export default async function HomePage() {
  const [data, siteSettings] = await Promise.all([
    getCachedHomePageData(),
    getCachedSiteSettings(),
  ]);

  return (
    <>
      <HomeJsonLd data={data} siteSettings={siteSettings} />
      <HomePageView data={data} />
    </>
  );
}
