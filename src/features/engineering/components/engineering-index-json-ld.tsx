import type { EngineeringLogCard } from "@/sanity/schemas";
import { buildEngineeringCollectionJsonLd } from "@/lib/seo";

interface EngineeringIndexJsonLdProps {
  logs: EngineeringLogCard[];
}

export function EngineeringIndexJsonLd({ logs }: EngineeringIndexJsonLdProps) {
  const schema = buildEngineeringCollectionJsonLd(logs);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
