import { newsletterSchema } from "@/lib/newsletter-schema";
import { subscribeToNewsletter } from "@/lib/newsletter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { email, fullName, interests, website } = parsed.data;
  if (website) {
    return Response.json({ ok: true });
  }

  try {
    const { warning } = await subscribeToNewsletter({ email, fullName, interests });
    return Response.json(warning ? { ok: true, warning } : { ok: true });
  } catch (error) {
    console.error("[newsletter] Subscription failed:", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
