"use client";

import { usePathname } from "next/navigation";
import { ScrollDriver, ScrollProgress, ScrollReveal } from "@/components/obsidian/motion";
import { Scroll3D } from "@/components/obsidian/scroll-3d";
import { DepthField } from "@/components/obsidian/depth-field";
import { CursorFollower } from "@/components/obsidian/cursor-follower";
import { Stage } from "@/components/obsidian/stage";

/**
 * Shared shell for every page: Stage + scroll driver + page transition.
 * The key={pathname} wrapper triggers a fresh mount animation on each route.
 * DepthField is rendered OUTSIDE Stage so it stays behind content.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Stage>
      <DepthField />
      <CursorFollower />
      <ScrollDriver />
      <ScrollProgress />
      <ScrollReveal />
      <Scroll3D />

      <div key={pathname} className="page-shell">
        {children}
      </div>
    </Stage>
  );
}