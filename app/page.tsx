import { Capabilities } from "@/components/sections/capabilities";
import { Manifesto } from "@/components/sections/manifesto";
import { Process } from "@/components/sections/process";
import { ScrollProgress, ScrollReveal } from "@/components/obsidian/motion";
import { SiteFooter } from "@/components/sections/site-footer";
import { Stage } from "@/components/obsidian/stage";
import { Studio } from "@/components/sections/studio";
import { Threshold } from "@/components/sections/threshold";
import { Works } from "@/components/sections/works";

export default function HomePage() {
  return (
    <Stage>
      <ScrollProgress />
      <ScrollReveal />
      <main>
        <Threshold />
        <Manifesto />
        <Works />
        <Capabilities />
        <Process />
        <Studio />
        <SiteFooter />
      </main>
    </Stage>
  );
}