"use client";

import { Check, Loader2, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { reviewChangeAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ReviewButtons({ changeId }: { changeId: string }) {
  const [note, setNote] = useState("");
  const [pending, startTransition] = useTransition();

  const decide = (decision: "approve" | "reject") =>
    startTransition(async () => {
      const result = await reviewChangeAction(changeId, decision, note);
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        aria-label="Note to the editor (optional)"
        placeholder="Note (optional)"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        className="w-48"
      />
      <Button type="button" variant="outline" onClick={() => decide("reject")} disabled={pending}>
        <X aria-hidden /> Reject
      </Button>
      <Button type="button" onClick={() => decide("approve")} disabled={pending}>
        {pending ? <Loader2 className="animate-spin" aria-hidden /> : <Check aria-hidden />}
        Approve and publish
      </Button>
    </div>
  );
}
