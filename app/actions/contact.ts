"use server";

import { z } from "zod";

import { contactSchema } from "@/lib/validations/contact";

export type ContactResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string[] | undefined> };

/**
 * Re-validates the contact payload on the server with the same schema the
 * form uses. Delivery is intentionally not connected in this fictional
 * studio, so a successful validation is acknowledged as a demonstration.
 */
export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, errors: z.flattenError(parsed.error).fieldErrors };
  }

  return { ok: true };
}
