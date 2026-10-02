import { Resend } from "resend";

export const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ?? "hello@afronovation.com";

export const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL ?? "hello@afronovation.com";

let resendClient: Resend | null = null;

export function getResend(): Resend {
  if (resendClient) {
    return resendClient;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Configure it to send contact form notifications.",
    );
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}
