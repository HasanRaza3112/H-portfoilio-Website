import type { Metadata } from "next";

import { EngineeringList } from "@/features/engineering/components/EngineeringList";
import { getEngineeringArticles } from "@/features/engineering/api";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Technical notes on SDK development, playable ads, authentication, and debugging.",
};

export default async function EngineeringPage() {
  const articles = await getEngineeringArticles();

  return <EngineeringList articles={articles} />;
}
