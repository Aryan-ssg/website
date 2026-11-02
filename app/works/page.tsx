import type { Metadata } from "next";

import { SiteFooter } from "@/components/sections/site-footer";
import { Works } from "@/components/sections/works";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Five climates, five bodies. Each project begins underground and ends in light.",
};

export default function WorksPage() {
  return (
    <>
      <Works />
      <SiteFooter />
    </>
  );
}