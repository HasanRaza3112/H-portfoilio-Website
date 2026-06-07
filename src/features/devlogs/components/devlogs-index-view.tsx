"use client";

import { useMemo } from "react";

import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import type { DevlogCard } from "@/types";

import {
  extractDevlogTags,
  filterDevlogs,
  groupDevlogsByMonth,
  type DevlogFilters,
} from "../lib/filters";
import { DevlogFiltersBar } from "./devlog-filters-bar";
import { DevlogJournalEntry } from "./devlog-journal-entry";

interface DevlogsIndexViewProps {
  devlogs: DevlogCard[];
  filters: DevlogFilters;
}

export function DevlogsIndexView({ devlogs, filters }: DevlogsIndexViewProps) {
  const filteredDevlogs = useMemo(
    () => filterDevlogs(devlogs, filters),
    [devlogs, filters],
  );

  const tagCounts = useMemo(() => extractDevlogTags(devlogs), [devlogs]);
  const monthGroups = useMemo(
    () => groupDevlogsByMonth(filteredDevlogs),
    [filteredDevlogs],
  );

  let entryIndex = 0;

  return (
    <>
      <section
        aria-labelledby="devlogs-heading"
        className="border-b border-border-subtle py-section-md"
      >
        <div className="mx-auto w-full max-w-container-narrow px-[var(--container-padding)]">
          <Heading variant="overline" tone="accent">
            Growth Journal
          </Heading>
          <Heading variant="h1" as="h1" id="devlogs-heading" className="mt-3">
            Devlogs
          </Heading>
          <p className="mt-4 max-w-2xl text-body-lg text-muted text-pretty">
            Short-form entries documenting progress, experiments, and lessons
            learned — built to scale as the journal grows over time.
          </p>
        </div>
      </section>

      <Section spacing="md" containerSize="narrow">
        <DevlogFiltersBar
          tags={tagCounts}
          devlogs={devlogs}
          filters={filters}
          resultCount={filteredDevlogs.length}
        />
      </Section>

      <Section
        id="devlog-journal"
        aria-labelledby="devlog-journal-heading"
        divider="top"
        spacing="lg"
        containerSize="narrow"
        title="Journal"
        titleId="devlog-journal-heading"
      >
        {monthGroups.length > 0 ? (
          <div className="space-y-section-sm">
            {monthGroups.map((group) => (
              <section key={group.key} aria-labelledby={`month-${group.key}`}>
                <h3
                  id={`month-${group.key}`}
                  className="mb-2 text-overline uppercase tracking-wider text-muted"
                >
                  {group.label}
                </h3>
                <div>
                  {group.entries.map((entry) => {
                    const index = entryIndex;
                    entryIndex += 1;
                    return (
                      <DevlogJournalEntry
                        key={entry._id}
                        devlog={entry}
                        index={index}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border-subtle bg-surface-secondary p-10 text-center">
            <p className="text-body-lg text-muted">
              No journal entries match the current filters.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
