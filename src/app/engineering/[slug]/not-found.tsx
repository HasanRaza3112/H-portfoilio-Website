import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export default function EngineeringNotFound() {
  return (
    <Container className="py-section-lg">
      <div className="mx-auto max-w-lg text-center">
        <Heading variant="h1" as="h1">
          Engineering log not found
        </Heading>
        <p className="mt-4 text-body-lg text-muted">
          This article may be unpublished or the URL is incorrect.
        </p>
        <Button asChild className="mt-8">
          <Link href="/engineering">Back to engineering</Link>
        </Button>
      </div>
    </Container>
  );
}
