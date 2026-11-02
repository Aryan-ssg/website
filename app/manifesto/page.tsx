import type { Metadata } from "next";

import { Manifesto } from "@/components/sections/manifesto";
import { SiteFooter } from "@/components/sections/site-footer";
import { WordIllumination } from "@/components/obsidian/motion";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Obsidian is a spatial design studio. We work on buildings, interiors, and the moments between them.",
};

export default function ManifestoPage() {
  return (
    <>
      <WordIllumination />
      <Manifesto />
      <SiteFooter />
    </>
  );
}