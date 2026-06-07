const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohammedhasanraza.com";

type PreviewDocument = {
  slug?: { current?: string };
  publishStatus?: string;
};

export function resolveProductionUrl(
  document: PreviewDocument & { _type?: string },
): string | undefined {
  const slug = document.slug?.current;
  if (!slug || document.publishStatus === "draft") {
    return undefined;
  }

  switch (document._type) {
    case "project":
      return `${siteUrl}/projects/${slug}`;
    case "engineeringLog":
      return `${siteUrl}/engineering/${slug}`;
    case "devlog":
      return `${siteUrl}/devlogs/${slug}`;
    default:
      return undefined;
  }
}

export const previewUrlConfig = {
  preview: {
    draftMode: {
      enable: "/api/preview",
    },
  },
  document: {
    productionUrl: async (
      _prev: string | undefined,
      { document }: { document: PreviewDocument & { _type?: string } },
    ) => resolveProductionUrl(document),
  },
};
