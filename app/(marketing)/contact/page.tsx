import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact us</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Have a question or want to work together? Fill in the form below.
      </p>
      <p className="text-muted-foreground mt-2 text-sm">
        Demo note: this form validates your input but does not send anything
        yet. Connect a Server Action or email provider to enable delivery.
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </section>
  );
}
