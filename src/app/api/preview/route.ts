import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { getServerEnv } from "@/lib/env";
import {
  resolvePreviewPath,
  resolveSingletonPreviewPath,
} from "@/sanity/preview";
import { singletonIds } from "@/sanity/env";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug");
  const type = request.nextUrl.searchParams.get("type");
  const documentId = request.nextUrl.searchParams.get("documentId");

  const { PREVIEW_SECRET } = getServerEnv();

  if (!PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  if (documentId && Object.values(singletonIds).includes(documentId as never)) {
    redirect(resolveSingletonPreviewPath(documentId));
  }

  if (type && slug) {
    const path = resolvePreviewPath(type, slug);
    if (path) {
      redirect(path);
    }
  }

  redirect("/");
}
