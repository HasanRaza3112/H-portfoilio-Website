import { ResumeExpertiseSection } from "@/features/resume/components/resume-expertise-section";
import { ResumeExperienceSection } from "@/features/resume/components/resume-experience-section";
import { ResumeHeader } from "@/features/resume/components/resume-header";
import { ResumeSummarySection } from "@/features/resume/components/resume-summary-section";
import type { Experience, PersonProfile, SiteSettings } from "@/types";

interface ResumePageViewProps {
  profile: PersonProfile | null;
  siteSettings: SiteSettings | null;
  experiences: Experience[];
}

export function ResumePageView({
  profile,
  siteSettings,
  experiences,
}: ResumePageViewProps) {
  return (
    <div className="pb-section-lg">
      <ResumeHeader profile={profile} siteSettings={siteSettings} />
      <ResumeSummarySection summary={profile?.professionalSummary} />
      <ResumeExpertiseSection expertiseAreas={profile?.expertiseAreas} />
      <ResumeExperienceSection experiences={experiences} />
    </div>
  );
}
