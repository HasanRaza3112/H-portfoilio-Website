"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackResumeDownload } from "@/lib/analytics";

interface ResumeDownloadButtonProps {
  url: string;
  filename: string;
  source?: "resume_page" | "home_cta" | "header";
  className?: string;
}

export function ResumeDownloadButton({
  url,
  filename,
  source = "resume_page",
  className,
}: ResumeDownloadButtonProps) {
  return (
    <Button asChild className={className}>
      <a
        href={url}
        download={filename}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackResumeDownload({
            source,
            filename,
          })
        }
      >
        <Download aria-hidden />
        Download PDF
      </a>
    </Button>
  );
}
