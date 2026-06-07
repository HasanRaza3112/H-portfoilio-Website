import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { buildNotFoundMetadata } from "@/lib/seo";

export const metadata = buildNotFoundMetadata();

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-section-lg text-center">
      <Heading variant="overline" tone="accent">
        404
      </Heading>
      <Heading variant="h1" as="h1" className="mt-3">
        Page not found
      </Heading>
      <p className="mt-4 max-w-md text-body-lg text-muted text-pretty">
        The page you are looking for may have moved or no longer exists.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </Container>
  );
}
