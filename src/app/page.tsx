/**
 * src/app/page.tsx
 * Paytonix landing page — Revenue Systems Engineering positioning.
 * Section order: Hero → Logo strip → Problem → Outcome → Capabilities →
 * How We Work → MarTechOS proof → Engagement models → Why Paytonix →
 * Founder → Final CTA (3-path) → Qualification form.
 */

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { homepageGraph } from "@/lib/schema";
import { HeroSection } from "@/components/hero/HeroSection";
import { LogoBlock } from "@/components/sections/LogoBlock";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { OutcomeSection } from "@/components/sections/OutcomeSection";
import { DetectionGrid } from "@/components/sections/DetectionGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MarTechOSProof } from "@/components/sections/MarTechOSProof";
import { NextSteps } from "@/components/sections/NextSteps";
import { WhyPaytonix } from "@/components/sections/WhyPaytonix";
import { FounderSection } from "@/components/sections/FounderSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { AssessmentForm } from "@/components/sections/AssessmentForm";

export default function Home() {
  return (
    <>
      <JsonLd data={homepageGraph()} />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <LogoBlock />
        <ProblemSection />
        <OutcomeSection />
        <DetectionGrid />
        <HowItWorks />
        <MarTechOSProof />
        <NextSteps />
        <WhyPaytonix />
        <FounderSection />
        <FinalCta />
        <AssessmentForm />
      </main>
      <SiteFooter />
    </>
  );
}
