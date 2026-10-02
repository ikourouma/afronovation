import {
  enterpriseServiceCategories,
  getServicesByCategory,
} from "@/content/enterprise-services";
import { portfolioItems } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const principles = [
  "Sovereign data ownership",
  "Multi-tenant isolation",
  "Role-based entitlements",
  "Full audit trail",
  "Cloud & API ready",
];

/**
 * "One proven architecture" (Capabilities Portfolio, page 2): mission-specific
 * platforms composed from the shared enterprise digital services, with
 * program, change and adoption running alongside.
 */
export function ArchitectureDiagram() {
  return (
    <figure className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[44px_1fr]">
        <div
          aria-hidden
          className="hidden items-center justify-center rounded-md bg-navy lg:flex"
        >
          <span className="text-xs font-bold tracking-[0.2em] whitespace-nowrap text-white uppercase [writing-mode:vertical-rl] rotate-180">
            Program, change &amp; adoption
          </span>
        </div>
        <p className="rounded-md bg-navy px-4 py-2 text-center text-xs font-bold tracking-[0.2em] text-white uppercase lg:hidden">
          Program, change &amp; adoption throughout
        </p>

        <div className="space-y-4">
          <div className="theme-navy rounded-md p-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#f3a9cf] uppercase">
              Mission-specific platforms
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {portfolioItems.map((item) => (
                <li
                  key={item.slug}
                  className="rounded-sm border border-white/25 px-3 py-1 text-sm font-semibold"
                >
                  {item.name.replace(" Digital Investment & Economic Intelligence Platform", " Investment Platform")}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-violet/30 bg-secondary/60 p-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-secondary-foreground uppercase">
              Enterprise digital services
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {enterpriseServiceCategories.map((category) => (
                <div key={category.slug}>
                  <p className="text-sm font-bold">{category.name}</p>
                  <ul className="mt-2 space-y-1.5">
                    {getServicesByCategory(category.slug).map((service) => (
                      <li
                        key={service.slug}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-sm border bg-background px-2.5 py-1 text-sm",
                          service.status === "roadmap" && "border-dashed text-muted-foreground",
                          service.deliveredWithPartners && "border-gold",
                        )}
                      >
                        <span>
                          {service.name}
                          {service.deliveredWithPartners ? (
                            <span className="ml-1 text-gold" aria-label="delivered with partners">◆</span>
                          ) : null}
                        </span>
                        {service.status === "pilot" ? (
                          <span className="rounded-sm bg-secondary px-1.5 text-[10px] font-bold text-secondary-foreground uppercase">
                            Pilot
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 rounded-md bg-[#e6f4ee] px-5 py-3 text-sm font-semibold text-[#185c3d]">
            {principles.map((principle) => (
              <li key={principle} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#2f9e6b]" aria-hidden />
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
        <span>
          <span className="rounded-sm bg-secondary px-1.5 text-[10px] font-bold text-secondary-foreground uppercase">Pilot</span>{" "}
          In pilot
        </span>
        <span>
          <span className="inline-block h-3 w-6 rounded-sm border border-dashed align-middle" /> Roadmap service
        </span>
        <span>
          <span className="text-gold">◆</span> Delivered with partners
        </span>
      </figcaption>
    </figure>
  );
}
