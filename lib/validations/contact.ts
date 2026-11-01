import { z } from "zod";

/**
 * Rules for the contact form, shared by the form and (later) the server.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be at most 80 characters"),
  email: z.email("Please enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be at most 2000 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
