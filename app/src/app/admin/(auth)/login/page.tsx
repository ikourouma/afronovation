import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/brand/logo";
import { getAdminUser } from "@/lib/admin/session";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");

  return (
    <main className="theme-navy grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Logo tone="light" className="mx-auto h-10" priority />
        <div className="mt-8 rounded-md bg-background p-8 text-foreground [--background:#ffffff] [--foreground:var(--brand-ink)] [--muted-foreground:#4a5a70] [--border:rgb(7_30_54/12%)] [--input:rgb(7_30_54/20%)]">
          <h1 className="font-heading text-2xl font-bold">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">For Afronovation team members only.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
