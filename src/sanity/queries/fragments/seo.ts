export const seoProjection = `
  seo {
    metaTitle,
    metaDescription,
    canonicalPath,
    noIndex,
    ogImage {
      "url": asset->url,
      alt
    }
  }
`;
