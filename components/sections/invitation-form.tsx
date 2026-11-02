"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { submitContact } from "@/app/actions/contact";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

type Status = "idle" | "sent" | "failed";

/** Act 07 — the form. Quiet fields, honest result. data-tilt is on the parent section. */
export function InvitationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    const result = await submitContact(values);

    if (!result.ok) {
      for (const [field, messages] of Object.entries(result.errors)) {
        if (messages?.[0]) {
          setError(field as keyof ContactFormValues, {
            type: "server",
            message: messages[0],
          });
        }
      }
      setStatus("failed");
      return;
    }

    reset();
    setStatus("sent");
  }

  return (
    <form className="invite__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className="field__input"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p className="field__error" id="contact-name-error">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          className="field__input"
          type="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="you@somewhere.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p className="field__error" id="contact-email-error">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="field field--message">
        <label className="field__label" htmlFor="contact-message">
          What are you trying to see?
        </label>
        <textarea
          id="contact-message"
          className="field__input field__input--area"
          rows={4}
          placeholder="A site, a room, a feeling you cannot name yet."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p className="field__error" id="contact-message-error">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="invite__actions">
        <button className="transmit" type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Transmitting" : "Transmit"}</span>
          <svg viewBox="0 0 24 12" fill="none" aria-hidden="true">
            <path d="M0 6h22M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>

        <p className="invite__status" role="status" aria-live="polite">
          {status === "sent"
            ? "Received. This studio is a study — nothing left your browser."
            : status === "failed"
              ? "That did not go through. Check the marked fields."
              : ""}
        </p>
      </div>
    </form>
  );
}
