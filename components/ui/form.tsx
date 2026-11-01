"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/**
 * Small wrapper around react-hook-form that wires labels and error messages
 * to the form controls so they are accessible by default.
 * (This is the classic shadcn/ui Form, adapted for this project.)
 */

const Form = FormProvider;

const FormFieldContext = React.createContext<{ name: string } | null>(null);
const FormItemContext = React.createContext<{
  id: string;
  formDescriptionId: string;
  formMessageId: string;
} | null>(null);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext?.name ?? "" });

  if (!fieldContext || !itemContext) {
    throw new Error("useFormField must be used inside <FormItem>, which is inside <FormField>.");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    ...itemContext,
    ...fieldState,
  };
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();
  const contextValue = React.useMemo(
    () => ({ id, formDescriptionId: `${id}-description`, formMessageId: `${id}-message` }),
    [id],
  );

  return (
    <FormItemContext.Provider value={contextValue}>
      <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { id, error } = useFormField();

  return (
    <Label htmlFor={id} className={cn(error && "text-destructive", className)} {...props} />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error?.message ? String(error.message) : props.children;

  if (!body) return null;

  return (
    <p id={formMessageId} className={cn("text-destructive text-xs", className)} {...props}>
      {body}
    </p>
  );
}

/**
 * Passes the right `id` and aria attributes down to the wrapped input,
 * so the label and error message are announced by screen readers.
 */
function FormControl({ children }: { children: React.ReactElement<React.HTMLAttributes<HTMLElement>> }) {
  const { id, error, formMessageId } = useFormField();

  // Only point at the error message when it is actually rendered. Referencing
  // an id that never exists would leave a dangling aria-describedby.
  const describedBy = error ? formMessageId : undefined;

  return React.cloneElement(children, {
    id,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
  });
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
