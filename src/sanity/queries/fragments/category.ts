export const categoryProjection = `
  _id,
  title,
  "slug": slug.current,
  domain
`;

export const categoryField = `{ ${categoryProjection} }`;
