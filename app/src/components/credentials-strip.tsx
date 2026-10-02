import type { Methodology } from "@/content/types";

/** Team certifications row (About / Leadership page). */
export function CredentialsStrip({ credentials }: { credentials: Methodology[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-t pt-8">
      <p className="mr-2 text-sm font-semibold text-muted-foreground">Team credentials</p>
      {credentials.map((credential) => (
        <span key={credential.code} className="rounded-sm border border-l-4 border-l-violet px-3 py-1 text-sm">
          <strong className="font-bold">{credential.code}</strong>{" "}
          <span className="font-serif text-muted-foreground">{credential.name}</span>
        </span>
      ))}
    </div>
  );
}
