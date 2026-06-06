import Link from "next/link";

import { Container } from "@/components/shared/Container";

export default function NotFoundPage() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="mt-6 text-sm text-primary hover:underline">
        ← Back to home
      </Link>
    </Container>
  );
}
