import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-24">
      <p className="text-muted-foreground text-sm font-medium">Hello, world</p>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        Your next project starts here.
      </h1>

      <p className="text-muted-foreground mt-6 max-w-prose">
        Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, React Hook
        Form, Zod and Supabase are already wired up. Replace this page with your
        own, then add features one at a time.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
}
