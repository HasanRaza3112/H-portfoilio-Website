import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export default function DevlogNotFound() {
  return (
    <Container className="py-section-lg">
      <div className="mx-auto max-w-lg text-center">
        <Heading variant="h1" as="h1">
          Journal entry not found
        </Heading>
        <p className="mt-4 text-body-lg text-muted">
          This devlog may be unpublished or the URL is incorrect.
        </p>
        <Button asChild className="mt-8">
          <Link href="/devlogs">Back to devlogs</Link>
        </Button>
      </div>
    </Container>
  );
}
