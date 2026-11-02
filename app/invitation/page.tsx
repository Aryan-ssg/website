import type { Metadata } from "next";

import { InvitationForm } from "@/components/sections/invitation-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { VanishingForm } from "@/components/obsidian/vanishing-form";

export const metadata: Metadata = {
  title: "Invitation",
  description: "Tell us what you are trying to see.",
};

export default function InvitationPage() {
  return (
    <>
      <VanishingForm />
      <main className="contact">
        <header className="contact__head">
          <p className="contact__index">07 / 07 — Invitation</p>
          <h1 className="contact__title">Tell us what you are trying to see.</h1>
          <p className="contact__lede">
            A site, a room, a feeling you cannot name yet. We answer within
            three working days. This is a study — nothing leaves your browser.
          </p>
        </header>
        <InvitationForm />
      </main>
      <SiteFooter />
    </>
  );
}