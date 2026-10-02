"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { moveEntryAction } from "@/app/admin/actions";

export function EntryOrderButtons({
  collection,
  entryId,
  canMoveUp,
  canMoveDown,
}: {
  collection: string;
  entryId: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [pending, startTransition] = useTransition();

  const move = (direction: "up" | "down") =>
    startTransition(async () => {
      const result = await moveEntryAction(collection, entryId, direction);
      if (!result.ok) toast.error(result.message);
    });

  return (
    <div className="flex flex-col">
      <button
        type="button"
        disabled={!canMoveUp || pending}
        onClick={() => move("up")}
        aria-label="Move up"
        className="grid size-6 place-items-center rounded-sm text-muted-foreground hover:bg-muted disabled:opacity-30"
      >
        <ChevronUp className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        disabled={!canMoveDown || pending}
        onClick={() => move("down")}
        aria-label="Move down"
        className="grid size-6 place-items-center rounded-sm text-muted-foreground hover:bg-muted disabled:opacity-30"
      >
        <ChevronDown className="size-4" aria-hidden />
      </button>
    </div>
  );
}
