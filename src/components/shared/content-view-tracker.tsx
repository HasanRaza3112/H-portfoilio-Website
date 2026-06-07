"use client";

import { useEffect } from "react";

import { trackEngineeringView, trackProjectView } from "@/lib/analytics";

interface ContentViewTrackerProps {
  event: "project_view" | "engineering_view";
  slug: string;
}

export function ContentViewTracker({ event, slug }: ContentViewTrackerProps) {
  useEffect(() => {
    if (event === "project_view") {
      trackProjectView(slug);
    } else {
      trackEngineeringView(slug);
    }
  }, [event, slug]);

  return null;
}
