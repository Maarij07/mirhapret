"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroCarousel } from "@/components/homepage/hero-carousel";
import { CategoryWorlds } from "@/components/homepage/category-worlds";
import { SignatureEdit } from "@/components/homepage/signature-edit";
import { FabricFormCraft } from "@/components/homepage/fabric-form-craft";
import { OccasionStyling } from "@/components/homepage/occasion-styling";
import { CampaignStory } from "@/components/homepage/campaign-story";
import { TrustAssurance } from "@/components/homepage/trust-assurance";
import { SoftCTA } from "@/components/homepage/soft-cta";

export default function Home() {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex flex-col">
        <HeroCarousel />
        <CategoryWorlds />
        <SignatureEdit />
        <FabricFormCraft />
        <OccasionStyling />
        <CampaignStory />
        <TrustAssurance />
        <SoftCTA />
      </main>
      <Footer />
    </div>
  );
}