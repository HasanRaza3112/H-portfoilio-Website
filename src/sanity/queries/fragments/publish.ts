/** GROQ predicate — include drafts when `$preview` is true. */
export const publishedOnly = `($preview == true || publishStatus == "published")`;
