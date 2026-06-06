import type { Metadata } from "next";

import { DevlogList } from "@/features/devlogs/components/DevlogList";
import { getDevlogs } from "@/features/devlogs/api";

export const metadata: Metadata = {
  title: "Devlogs",
  description:
    "Long-form content documenting engineering growth, learning, and career development.",
};

export default async function DevlogsPage() {
  const devlogs = await getDevlogs();

  return <DevlogList devlogs={devlogs} />;
}
