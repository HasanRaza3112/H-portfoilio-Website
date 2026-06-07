import { type NextRequest } from "next/server";

import { getServerEnv } from "@/lib/env";
import { revalidateSanityDocument } from "@/sanity/revalidate";

export async function POST(request: NextRequest) {
  const { SANITY_REVALIDATE_SECRET } = getServerEnv();
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.replace(/^Bearer\s+/i, "");
  const querySecret = request.nextUrl.searchParams.get("secret");

  const providedSecret = bearer ?? querySecret;

  if (!SANITY_REVALIDATE_SECRET || providedSecret !== SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid revalidation secret" }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const document =
    payload && typeof payload === "object"
      ? (payload as { _type?: string; _id?: string; slug?: { current?: string } })
      : {};

  const tags = revalidateSanityDocument(document);

  return Response.json({
    revalidated: true,
    tags,
    timestamp: Date.now(),
  });
}
