"use client";

import { useCallback, useTransition, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectStatusLabels } from "@/lib/labels";
import { cn } from "@/lib/utils";
import type { ProjectCategory, ProjectCard } from "@/types";

import {
  countProjectsByCategory,
  hasActiveFilters,
  type ProjectFilters,
  type ProjectStatus,
} from "../lib/filters";

const statusOptions: ProjectStatus[] = ["shipped", "in-progress", "confidential"];

interface ProjectFiltersBarProps {
  categories: ProjectCategory[];
  projects: ProjectCard[];
  filters: ProjectFilters;
  resultCount: number;
}

export function ProjectFiltersBar({
  categories,
  projects,
  filters,
  resultCount,
}: ProjectFiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilters = useCallback(
    (updates: Partial<ProjectFilters>) => {
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
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  const active = hasActiveFilters(filters);

  return (
    <div
      className={cn(
        "space-y-6 rounded-lg border border-border-subtle bg-surface p-5 shadow-panel md:p-6",
        isPending && "opacity-80",
      )}
      aria-label="Project filters"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="project-search"
            type="search"
            placeholder="Search by title, tech, role…"
            value={filters.q ?? ""}
            className="h-10 w-full rounded-md border border-border-subtle bg-surface-secondary pl-10 pr-10 text-body-sm text-foreground placeholder:text-muted focus-visible:outline-none"
            onChange={(event) => updateFilters({ q: event.target.value || undefined })}
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
          {resultCount} project{resultCount === 1 ? "" : "s"}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-caption font-medium uppercase tracking-wider text-muted">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!filters.category}
              onClick={() => updateFilters({ category: undefined })}
            >
              All
            </FilterChip>
            {categories.map((category) => (
              <FilterChip
                key={category._id}
                active={filters.category === category.slug}
                onClick={() =>
                  updateFilters({
                    category:
                      filters.category === category.slug ? undefined : category.slug,
                  })
                }
              >
                {category.title}
                <span className="text-muted">
                  ({countProjectsByCategory(projects, category.slug)})
                </span>
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-caption font-medium uppercase tracking-wider text-muted">
            Status
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!filters.status}
              onClick={() => updateFilters({ status: undefined })}
            >
              All statuses
            </FilterChip>
            {statusOptions.map((status) => (
              <FilterChip
                key={status}
                active={filters.status === status}
                onClick={() =>
                  updateFilters({
                    status: filters.status === status ? undefined : status,
                  })
                }
              >
                {projectStatusLabels[status]}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {active ? (
        <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4">
          <span className="text-caption text-muted">Active filters</span>
          {filters.q ? <Badge variant="secondary">Search: {filters.q}</Badge> : null}
          {filters.category ? (
            <Badge variant="secondary">
              Category:{" "}
              {categories.find((item) => item.slug === filters.category)?.title ??
                filters.category}
            </Badge>
          ) : null}
          {filters.status ? (
            <Badge variant="secondary">
              Status: {projectStatusLabels[filters.status]}
            </Badge>
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
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-caption font-medium transition-colors-token",
        active
          ? "border-border-accent bg-accent-subtle text-accent"
          : "border-border-subtle bg-surface-secondary text-muted hover:border-border hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
