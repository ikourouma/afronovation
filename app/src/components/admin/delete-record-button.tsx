"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteLeadAction, removeSubscriberAction } from "@/app/admin/actions";

/** Permanent removal for data-deletion and unsubscribe requests. */
export function DeleteRecordButton({ kind, id, email }: { kind: "lead" | "subscriber"; id: string; email: string }) {
  const [pending, startTransition] = useTransition();
  const label = kind === "lead" ? "Delete lead" : "Remove";

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        const question =
          kind === "lead"
            ? `Permanently delete the lead for ${email}? Use this for data-deletion requests.`
            : `Remove ${email} from the newsletter list?`;
        if (!window.confirm(question)) return;
        startTransition(async () => {
          const result = kind === "lead" ? await deleteLeadAction(id) : await removeSubscriberAction(id);
          if (result.ok) toast.success(result.message);
          else toast.error(result.message);
        });
      }}
      className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:underline disabled:opacity-50"
    >
      <Trash2 className="size-3.5" aria-hidden /> {label}
    </button>
  );
}
