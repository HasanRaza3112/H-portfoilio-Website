"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormField } from "@/features/contact/components/contact-form-field";
import { ContactFormStatus } from "@/features/contact/components/contact-form-status";
import {
  contactFormDefaultValues,
  contactFormSchema,
  type ContactApiResponse,
  type ContactFormValues,
} from "@/features/contact/lib/contact-schema";
import { trackContactSubmit } from "@/lib/analytics";

type FormStatus = "idle" | "success" | "error";

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      ...contactFormDefaultValues,
      formLoadedAt: Date.now(),
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (formStatus !== "idle" && statusRef.current) {
      statusRef.current.focus();
    }
  }, [formStatus]);

  async function onSubmit(values: ContactFormValues) {
    setFormStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as ContactApiResponse;

      if (result.success) {
        trackContactSubmit();
        reset({
          ...contactFormDefaultValues,
          formLoadedAt: Date.now(),
        });
        setFormStatus("success");
        setStatusMessage(
          "Thanks for reaching out. Your message was sent and I will follow up soon.",
        );
        return;
      }

      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          const message = messages?.[0];
          if (!message) {
            continue;
          }

          setError(field as keyof ContactFormValues, { message });
        }
      }

      setFormStatus("error");
      setStatusMessage(result.message);
    } catch {
      setFormStatus("error");
      setStatusMessage(
        "Something went wrong while sending your message. Please try again in a moment.",
      );
    }
  }

  if (formStatus === "success") {
    return (
      <Card variant="elevated" padding="lg" aria-labelledby="contact-success-heading">
        <div ref={statusRef}>
          <ContactFormStatus
            variant="success"
            title="Message sent"
            message={statusMessage}
          />
          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormStatus("idle");
                setStatusMessage("");
              }}
            >
              Send another message
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="lg">
      <CardHeader className="pb-2">
        <CardTitle id="contact-form-heading">Send a message</CardTitle>
        <CardDescription>
          Share context about the role, studio, or collaboration. No mailto links — this
          form delivers directly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formStatus === "error" ? (
          <div ref={statusRef} className="mb-6" tabIndex={-1}>
            <ContactFormStatus
              variant="error"
              title="Unable to send message"
              message={statusMessage}
            />
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-labelledby="contact-form-heading"
          className="space-y-5"
        >
          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <input type="hidden" {...register("formLoadedAt", { valueAsNumber: true })} />

          <div className="grid gap-5 md:grid-cols-2">
            <ContactFormField
              id="contact-name"
              label="Name"
              required
              error={errors.name?.message}
            >
              <Input
                id="contact-name"
                autoComplete="name"
                invalid={Boolean(errors.name)}
                {...register("name")}
              />
            </ContactFormField>

            <ContactFormField
              id="contact-email"
              label="Email"
              required
              error={errors.email?.message}
            >
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </ContactFormField>
          </div>

          <ContactFormField
            id="contact-company"
            label="Company or studio"
            hint="Optional — helps route recruitment conversations faster."
            error={errors.company?.message}
          >
            <Input
              id="contact-company"
              autoComplete="organization"
              invalid={Boolean(errors.company)}
              {...register("company")}
            />
          </ContactFormField>

          <ContactFormField
            id="contact-subject"
            label="Subject"
            required
            error={errors.subject?.message}
          >
            <Input
              id="contact-subject"
              autoComplete="off"
              invalid={Boolean(errors.subject)}
              {...register("subject")}
            />
          </ContactFormField>

          <ContactFormField
            id="contact-message"
            label="Message"
            required
            error={errors.message?.message}
          >
            <Textarea
              id="contact-message"
              rows={6}
              invalid={Boolean(errors.message)}
              {...register("message")}
            />
          </ContactFormField>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                "Send message"
              )}
            </Button>
            <p className="text-body-sm text-muted">Typical response within 1–2 business days.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
