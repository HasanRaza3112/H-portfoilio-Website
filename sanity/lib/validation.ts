import { type Rule, type ValidationContext } from "sanity";

/** Max lengths aligned with SEO and UI constraints */
export const limits = {
  metaTitle: 60,
  metaDescription: 160,
  summary: 200,
  overview: 600,
  missionDescription: 300,
  tagline: 200,
} as const;

type SlugValue = { current?: string };

type RuleBuilder<R> = R & Rule;

function chain<R>(rule: R, apply: (rule: Rule) => Rule): R {
  return apply(rule as RuleBuilder<R>) as R;
}

export function requiredString(message = "Required") {
  return <R>(rule: R): R => chain(rule, (r) => r.required().error(message));
}

export function maxChars(max: number, fieldLabel: string) {
  return <R>(rule: R): R =>
    chain(rule, (r) => r.max(max).error(`${fieldLabel} must be ${max} characters or fewer`));
}

export function requiredSlug() {
  return <R>(rule: R): R =>
    chain(rule, (r) =>
      r.required().custom(async (slug: SlugValue | undefined, context: ValidationContext) => {
        if (!slug?.current) {
          return "Slug is required";
        }

        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
          return "Slug must be lowercase kebab-case";
        }

        const client = context.getClient({ apiVersion: "2024-01-01" });
        const id = context.document?._id?.replace(/^drafts\./, "");
        const params = {
          draft: `drafts.${id}`,
          published: id,
          slug: slug.current,
          type: context.document?._type,
        };

        const query = `!defined(*[
          _type == $type &&
          slug.current == $slug &&
          !(_id in [$draft, $published])
        ][0]._id)`;

        const isUnique = await client.fetch(query, params);
        return isUnique ? true : "Slug must be unique";
      }),
    );
}

export function requiredWhenPublished(fieldLabel: string) {
  return <R>(rule: R): R =>
    chain(rule, (r) =>
      r.custom((value, context: ValidationContext) => {
        const publishStatus = (context.document as { publishStatus?: string })
          ?.publishStatus;

        if (publishStatus === "published" && !value) {
          return `${fieldLabel} is required when status is Published`;
        }

        return true;
      }),
    );
}

export function minArrayItems(min: number, fieldLabel: string) {
  return <R>(rule: R): R =>
    chain(rule, (r) => r.min(min).error(`${fieldLabel} requires at least ${min} item(s)`));
}

export function validUrl(message = "Must be a valid URL") {
  return <R>(rule: R): R =>
    chain(rule, (r) => r.uri({ scheme: ["http", "https"] }).error(message));
}

export function validEmail(message = "Must be a valid email") {
  return <R>(rule: R): R => chain(rule, (r) => r.email().error(message));
}
