"use client";

import { useEffect } from "react";

/**
 * The labels on a form vanish the moment a field starts receiving input.
 * The form is a threshold: once you begin, the drawing is finished.
 */
export function VanishingForm() {
  useEffect(() => {
    const form = document.querySelector(".invite__form");
    if (!form) return;

    const fields = form.querySelectorAll<HTMLElement>(".field");
    const sync = () => {
      for (const field of fields) {
        const input = field.querySelector<
          HTMLInputElement | HTMLTextAreaElement
        >("input, textarea");
        field.classList.toggle(
          "field--filled",
          !!input && input.value.trim().length > 0,
        );
      }
    };

    sync();
    form.addEventListener("input", sync);
    return () => form.removeEventListener("input", sync);
  }, []);

  return null;
}