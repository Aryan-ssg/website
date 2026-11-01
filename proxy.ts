import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Warn only once so a misconfigured production deploy is visible in logs
// without flooding them on every request.
let warnedAboutMissingEnv = false;

/**
 * Next.js 16 proxy (the renamed `middleware`).
 *
 * We only use it to keep the Supabase auth session fresh: Supabase access
 * tokens are short-lived, so the refresh token is exchanged here and the new
 * cookies are written onto the response before a page renders.
 *
 * NOTE: a proxy is not a security boundary for reads/writes. Permissions must
 * still be enforced in each Server Action / Route Handler and by RLS.
 */
export async function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // No Supabase project configured yet (e.g. a fresh clone without
  // .env.local). Do not crash the whole site - just pass the request through.
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "production" && !warnedAboutMissingEnv) {
      warnedAboutMissingEnv = true;
      console.warn(
        "[proxy] NEXT_PUBLIC_SUPABASE_* env vars are missing; Supabase session refresh is disabled.",
      );
    }
    return NextResponse.next();
  }

  // Start with a normal response but forward the request headers, because
  // refreshed auth cookies have to be visible to the code that renders.
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        // Updated cookies must be sent to the browser (response) *and*
        // passed along with the request (so this render sees them).
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        // Supabase asks for no-store cache headers on responses that set auth
        // cookies, so a CDN can never hand one user's session to another.
        Object.entries(headers).forEach(([key, value]) =>
          response.headers.set(key, value),
        );
      },
    },
  });

  try {
    // Reads the session from cookies and refreshes the token when expired.
    // Must run before the response is returned, otherwise refreshed cookies
    // would be lost.
    await supabase.auth.getClaims();
  } catch {
    // A broken/expired session should not break public pages. The user is
    // simply treated as signed out by the code that renders.
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on every path except:
     * - _next/static and _next/image (Next.js build/image assets)
     * - favicon.ico and common static file extensions in public/
     * API routes and Server Actions are intentionally included so they also
     * get a refreshed session.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|txt|xml|woff|woff2|ttf)$).*)",
  ],
};
