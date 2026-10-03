import type { Presence } from "@/lib/admin/presence";
import { cn } from "@/lib/utils";

const labels: Record<Presence, string> = {
  online: "Online now",
  idle: "Signed in, idle",
  offline: "Signed out",
};

export function PresenceBadge({ presence }: { presence: Presence }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
      <span
        aria-hidden
        className={cn(
          "size-2.5 rounded-full",
          presence === "online" && "bg-[#2f9e6b] ring-4 ring-[#2f9e6b]/20",
          presence === "idle" && "bg-gold",
          presence === "offline" && "bg-[#b4bfd2]",
        )}
      />
      {labels[presence]}
    </span>
  );
}
