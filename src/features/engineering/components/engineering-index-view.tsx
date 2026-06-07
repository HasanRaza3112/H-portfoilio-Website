"use client";

import { useMemo } from "react";

import { EngineeringLogCardLink } from "@/components/shared/engineering-log-card";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { ENGINEERING_CATEGORIES } from "@/lib/engineering-categories";
import type { EngineeringLogCard, ProjectCategory } from "@/types";

import {
  filterEngineeringLogs,
  sortCategoriesForDisplay,
  type EngineeringFilters,
} from "../lib/filters";
import { EngineeringFiltersBar } from "./engineering-filters-bar";

interface EngineeringIndexViewProps {
  logs: EngineeringLogCard[];
  categories: ProjectCategory[];
  filters: EngineeringFilters;
}

export function EngineeringIndexView({
  logs,
  categories,
  filters,
}: EngineeringIndexViewProps) {
  const filteredLogs = useMemo(
    () => filterEngineeringLogs(logs, filters),
    [logs, filters],
  );

  const sortedCategories = useMemo(
    () => sortCategoriesForDisplay(categories),
    [categories],
  );

  return (
    <>
      <section
        aria-labelledby="engineering-heading"
        className="border-b border-border-subtle py-section-md"
      >
        <div className="mx-auto w-full max-w-container-content px-[var(--container-padding)]">
          <Heading variant="overline" tone="accent">
            Technical Thinking
          </Heading>
          <Heading variant="h1" as="h1" id="engineering-heading" className="mt-3">
            Engineering Logs
          </Heading>
          <p className="mt-4 max-w-2xl text-body-lg text-muted text-pretty">
            Long-form notes on systems, tradeoffs, and problem-solving — SDK work,
            authentication, playables, validation, and debugging.
          </p>
          <p className="mt-6 text-caption text-muted">
            Topics:{" "}
            {ENGINEERING_CATEGORIES.map((category) => category.title).join(" · ")}
          </p>
        </div>
      </section>

      <Section spacing="md" containerSize="content">
        <EngineeringFiltersBar
          categories={sortedCategories}
          logs={logs}
          filters={filters}
          resultCount={filteredLogs.length}
        />
      </Section>

      <Section
        id="engineering-list"
        aria-labelledby="engineering-list-heading"
        divider="top"
        spacing="lg"
        title="Articles"
        titleId="engineering-list-heading"
      >
        {filteredLogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredLogs.map((log, index) => (
              <MotionReveal key={log._id} delay={index * 0.04}>
                <EngineeringLogCardLink log={log} />
              </MotionReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border-subtle bg-surface-secondary p-10 text-center">
            <p className="text-body-lg text-muted">
              No engineering logs match the current filters.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
