"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  createUserAction,
  resetPasswordAction,
  setUserActiveAction,
  setUserRoleAction,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const selectClass = "h-9 rounded-md border border-input bg-background px-2 text-sm";

export function UserRowActions({
  userId,
  role,
  active,
  isSelf,
}: {
  userId: string;
  role: string;
  active: boolean;
  isSelf: boolean;
}) {
  const [pending, startTransition] = useTransition();

  const run = (action: () => Promise<{ ok: boolean; message: string }>) =>
    startTransition(async () => {
      const result = await action();
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        aria-label="Role"
        defaultValue={role}
        disabled={pending || isSelf}
        onChange={(event) => run(() => setUserRoleAction(userId, event.target.value))}
        className={selectClass}
      >
        <option value="platform_admin">Platform Admin</option>
        <option value="editor">Editor</option>
      </select>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => {
          const password = window.prompt("New temporary password (at least 12 characters):");
          if (password) run(() => resetPasswordAction(userId, password));
        }}
      >
        Reset password
      </Button>
      {isSelf ? null : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => run(() => setUserActiveAction(userId, !active))}
        >
          {active ? "Deactivate" : "Reactivate"}
        </Button>
      )}
    </div>
  );
}

export function CreateUserForm() {
  const [pending, startTransition] = useTransition();
  const [formKey, setFormKey] = useState(0);

  return (
    <form
      key={formKey}
      className="mt-4 grid gap-4 rounded-md border bg-background p-6 sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        startTransition(async () => {
          const result = await createUserAction({
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? ""),
            role: String(form.get("role") ?? "editor"),
            password: String(form.get("password") ?? ""),
          });
          if (result.ok) {
            toast.success(result.message);
            setFormKey((key) => key + 1);
          } else {
            toast.error(result.message);
          }
        });
      }}
    >
      <div className="space-y-1.5">
        <Label htmlFor="new-name">Full name</Label>
        <Input id="new-name" name="name" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="new-email">Email</Label>
        <Input id="new-email" name="email" type="email" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="new-role">Role</Label>
        <select id="new-role" name="role" defaultValue="editor" className={`${selectClass} h-10 w-full`}>
          <option value="editor">Editor (changes need approval)</option>
          <option value="platform_admin">Platform Admin</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="new-password">Temporary password</Label>
        <Input id="new-password" name="password" type="text" minLength={12} required autoComplete="off" />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" aria-hidden /> : null}
          Create account
        </Button>
      </div>
    </form>
  );
}
