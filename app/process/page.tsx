import type { Metadata } from "next";

import { Process } from "@/components/sections/process";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Process",
  description:
    "The method is subtraction. Most of the work is removing what a site can live without.",
};

export default function ProcessPage() {
  return (
    <>
      <Process />
      <SiteFooter />
    </>
  );
}