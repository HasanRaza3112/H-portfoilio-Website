"use client";

import { useCallback, useTransition, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DevlogCard } from "@/types";

import {
  extractDevlogTags,
  hasActiveDevlogFilters,
  type DevlogFilters,
  type DevlogTagCount,
} from "../lib/filters";

interface DevlogFiltersBarProps {
  tags: DevlogTagCount[];
  devlogs: DevlogCard[];
  filters: DevlogFilters;
  resultCount: number;
}

export function DevlogFiltersBar({
  tags,
  devlogs,
  filters,
  resultCount,
}: DevlogFiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilters = useCallback(
    (updates: Partial<DevlogFilters>) => {
      const next = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (!value) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }

      startTransition(() => {
        const query = next.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  const active = hasActiveDevlogFilters(filters);
  const allTags = tags.length > 0 ? tags : extractDevlogTags(devlogs);

  return (
    <div
      className={cn(
        "space-y-6 rounded-lg border border-border-subtle bg-surface p-5 shadow-panel md:p-6",
        isPending && "opacity-80",
      )}
      aria-label="Devlog filters"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <label htmlFor="devlog-search" className="sr-only">
            Search devlogs
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="devlog-search"
            type="search"
            placeholder="Search journal entries…"
            value={filters.q ?? ""}
            className="h-10 w-full rounded-md border border-border-subtle bg-surface-secondary pl-10 pr-10 text-body-sm text-foreground placeholder:text-muted focus-visible:outline-none"
            onChange={(event) =>
              updateFilters({ q: event.target.value || undefined })
            }
          />
          {filters.q ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted hover:text-foreground"
              onClick={() => updateFilters({ q: undefined })}
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
        <p className="text-body-sm text-muted" aria-live="polite">
          {resultCount} entr{resultCount === 1 ? "y" : "ies"}
        </p>
      </div>

      {allTags.length > 0 ? (
        <div>
          <p className="mb-2 text-caption font-medium uppercase tracking-wider text-muted">
            Journal tags
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!filters.tag}
              onClick={() => updateFilters({ tag: undefined })}
            >
              All tags
            </FilterChip>
            {allTags.map(({ tag, count }) => (
              <FilterChip
                key={tag}
                active={filters.tag === tag}
                onClick={() =>
                  updateFilters({
                    tag: filters.tag === tag ? undefined : tag,
                  })
                }
              >
                {tag}
                <span className="text-muted">({count})</span>
              </FilterChip>
            ))}
          </div>
        </div>
      ) : null}

      {active ? (
        <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4">
          <span className="text-caption text-muted">Active filters</span>
          {filters.q ? (
            <Badge variant="secondary">Search: {filters.q}</Badge>
          ) : null}
          {filters.tag ? (
            <Badge variant="secondary">Tag: {filters.tag}</Badge>
          ) : null}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const chipClassName = cn(
    "rounded-full border px-3 py-1.5 text-caption font-medium transition-colors-token",
    active
      ? "border-border-accent bg-accent-subtle text-accent"
      : "border-border-subtle bg-surface-secondary text-muted hover:border-border hover:text-foreground",
  );

  if (active) {
    return (
      <button type="button" onClick={onClick} aria-pressed="true" className={chipClassName}>
        {children}
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-pressed="false" className={chipClassName}>
      {children}
    </button>
  );
}
