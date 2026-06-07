/** Raw Portable Text array — rendered in the app layer (Phase 5+). */
export const portableTextProjection = `content[]{
  ...,
  _type == "codeBlock" => {
    ...,
  },
  _type == "callout" => {
    ...,
  },
  markDefs[]{
    ...,
    _type == "internalLink" => {
      ...,
      reference->{
        _type,
        _id,
        title,
        "slug": slug.current
      }
    }
  }
}`;
