import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for the browser ("use client" components).
 *
 * Only the *public* anon key is used here. It is safe to ship to the browser
 * because Row Level Security decides what each user is allowed to read/write.
 * The service role key must never appear in a NEXT_PUBLIC_ variable.
 *
 * createBrowserClient stores the auth session in cookies (not localStorage)
 * so that the server can read the same session on the next request.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fail loudly here: a browser client without config would fail on every
  // query with a much less obvious error later.
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local (see .env.example).",
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
