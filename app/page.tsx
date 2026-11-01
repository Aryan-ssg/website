import { Stage } from "@/components/obsidian/stage";
import { Manifesto } from "@/components/sections/manifesto";
import { Threshold } from "@/components/sections/threshold";

export default function HomePage() {
  return (
    <Stage>
      <main>
        <Threshold />
        <Manifesto />
      </main>
    </Stage>
  );
}
