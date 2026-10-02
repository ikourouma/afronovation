"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { updateLeadStatusAction } from "@/app/admin/actions";

const statuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "closed", label: "Closed" },
];

export function LeadStatusSelect({ leadId, status }: { leadId: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label="Lead status"
      defaultValue={status}
      disabled={pending}
      onChange={(event) => {
        const value = event.target.value;
        startTransition(async () => {
          const result = await updateLeadStatusAction(leadId, value);
          if (!result.ok) toast.error(result.message);
        });
      }}
      className="h-9 rounded-md border border-input bg-background px-2 text-sm font-semibold"
    >
      {statuses.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
