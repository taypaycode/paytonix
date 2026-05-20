/**
 * src/app/page.tsx
 * Paytonix landing page — core layout composition.
 */

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/hero/HeroSection";
import { BeforeAfterMatrix } from "@/components/sections/BeforeAfterMatrix";
import { CapabilitiesGrid } from "@/components/sections/CapabilitiesGrid";
import { AuditForm } from "@/components/sections/AuditForm";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <BeforeAfterMatrix />
        <CapabilitiesGrid />
        <AuditForm />
      </main>
      <SiteFooter />
    </>
  );
}
