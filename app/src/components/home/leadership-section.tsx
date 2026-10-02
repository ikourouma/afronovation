import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import type { Methodology, TeamMember } from "@/content/types";
import { media } from "@/lib/media";

export function LeadershipSection({
  members,
  credentials,
}: {
  members: TeamMember[];
  credentials: Methodology[];
}) {
  return (
    <Section spacing="xl">
      <Container className="space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Leadership"
            description="Senior partners who have led transformation at the African Development Bank, Cisco Systems, state government and international development institutions."
          />
          <Link
            href="/about#team"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Meet the team
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <li key={member.slug} className="flex flex-col items-start">
              <span className="rounded-full bg-brand-gradient p-[3px]">
                <Image
                  src={media(member.headshotKey)}
                  alt={member.headshotAlt}
                  width={112}
                  height={112}
                  className="size-28 rounded-full border-4 border-background object-cover object-top"
                />
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold">{member.name}</h3>
              <p className="mt-1 font-serif text-sm italic text-primary">{member.role}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3 border-t pt-8">
          <p className="mr-2 text-sm font-semibold text-muted-foreground">Team credentials</p>
          {credentials.map((credential) => (
            <span
              key={credential.code}
              className="rounded-sm border border-l-4 border-l-violet px-3 py-1 text-sm"
            >
              <strong className="font-bold">{credential.code}</strong>{" "}
              <span className="font-serif text-muted-foreground">{credential.name}</span>
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
