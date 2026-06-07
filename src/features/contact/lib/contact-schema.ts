import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  company: z
    .string()
    .trim()
    .max(100, "Company must be 100 characters or fewer."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(150, "Subject must be 150 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
  website: z
    .string()
    .max(0, "Invalid submission.")
    .optional()
    .or(z.literal("")),
  formLoadedAt: z.number().int().positive(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormData = ContactFormValues;

export const contactFormDefaultValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  website: "",
  formLoadedAt: 0,
};

export interface ContactApiSuccessResponse {
  success: true;
}

export interface ContactApiErrorResponse {
  success: false;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
}

export type ContactApiResponse = ContactApiSuccessResponse | ContactApiErrorResponse;
