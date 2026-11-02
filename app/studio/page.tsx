import type { Metadata } from "next";

import { SiteFooter } from "@/components/sections/site-footer";
import { Studio } from "@/components/sections/studio";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Nine people. Three cities. One long conversation. Lisbon, Kyoto, Mexico City.",
};

export default function StudioPage() {
  return (
    <>
      <Studio />
      <SiteFooter />
    </>
  );
}