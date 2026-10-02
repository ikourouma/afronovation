import { SocialIcon } from "@/components/brand/social-icon";
import { filterLiveSocialAccounts } from "@/content/social";
import { getCollection } from "@/lib/cms/read";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  /** Optional heading such as "Follow us"; omitted when there is nothing to show. */
  heading?: string;
  className?: string;
  /** "navy" for dark bands (footer), "light" for white pages. */
  tone?: "navy" | "light";
};

/** Follow-us icons. Renders nothing until at least one account is live. */
export async function SocialLinks({ heading, className, tone = "light" }: SocialLinksProps) {
  const accounts = filterLiveSocialAccounts(await getCollection("socialAccounts"));
  if (accounts.length === 0) return null;

  return (
    <div className={className}>
      {heading ? <p className="mb-3 text-sm font-semibold">{heading}</p> : null}
      <ul className="flex flex-wrap gap-1.5">
        {accounts.map((account) => (
          <li key={account.platform}>
            <a
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Afronovation on ${account.label}`}
              className={cn(
                "grid size-8 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                tone === "navy"
                  ? "border-white/20 text-white hover:border-transparent hover:bg-primary"
                  : "border-border text-ink hover:border-transparent hover:bg-primary hover:text-white",
              )}
            >
              <SocialIcon platform={account.platform} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
