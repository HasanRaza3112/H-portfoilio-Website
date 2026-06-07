export const imageProjection = `
  "url": asset->url,
  alt,
  "lqip": asset->metadata.lqip
`;

export const imageField = `{ ${imageProjection} }`;
