import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client for Server Components, Server Actions and Route Handlers.
 *
 * Call this once per request (never cache the returned client across
 * requests) so that each user gets their own session.
 *
 * In Next.js 16 `cookies()` is async, so this function is async too and every
 * caller must `await createClient()`.
 */
export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local (see .env.example).",
    );
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      // Hand every request cookie to Supabase so it can find the session.
      getAll() {
        return cookieStore.getAll();
      },
      // Supabase calls this when it refreshes an expired session.
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components cannot write cookies. That is fine: the session
          // refresh in proxy.ts already wrote the new cookies to the response.
          // Server Actions and Route Handlers can set cookies, so they take
          // the branch above.
        }
      },
    },
  });
}
