import { cn } from "@/lib/utils";

export function ContentSection({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={cn("mt-12", className)}>
      <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
          >
            <span
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProseBody({
  body,
  className,
}: {
  body?: string;
  className?: string;
}) {
  if (!body) return null;

  return (
    <div className={cn("mt-12 space-y-6", className)}>
      {body.split("\n\n").map((paragraph) => (
        <p
          key={paragraph}
          className="text-base leading-relaxed text-muted-foreground"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
