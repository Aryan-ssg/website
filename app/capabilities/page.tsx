import type { Metadata } from "next";

import { Capabilities } from "@/components/sections/capabilities";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "We are one studio with five appetites. Architecture, interiors, objects, environments, strategy.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <Capabilities />
      <SiteFooter />
    </>
  );
}