import Image from "next/image";
import Link from "next/link";

import { SocialIcon } from "@/components/brand/social-icon";
import { ExpandableText } from "@/components/expandable-text";
import type { TeamMember } from "@/content/types";
import { media } from "@/lib/media";

type TeamMemberCardProps = {
  member: TeamMember;
  variant?: "compact" | "full";
};

export function TeamMemberCard({
  member,
  variant = "full",
}: TeamMemberCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href="/about#team"
        className="group flex flex-col items-center gap-3 text-center"
      >
        <div className="relative size-24 overflow-hidden rounded-full ring-2 ring-border transition-shadow group-hover:shadow-lg sm:size-28">
          <Image
            src={media(member.headshotKey)}
            alt={member.headshotAlt}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div>
          <p className="font-heading font-medium">{member.name}</p>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      </Link>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-md border bg-card p-7">
      <span className="self-start rounded-full bg-brand-gradient p-[3px]">
        <Image
          src={media(member.headshotKey)}
          alt={member.headshotAlt}
          width={128}
          height={128}
          className="size-32 rounded-full border-4 border-background object-cover object-top"
        />
      </span>
      <h3 className="mt-5 font-heading text-xl font-bold">{member.name}</h3>
      <p className="mt-1 font-serif text-sm italic text-primary">{member.role}</p>
      <div className="mt-4 flex flex-1">
        <ExpandableText text={member.bio} name={member.name} />
      </div>
      {member.credentials.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Certifications">
          {member.credentials.map((credential) => (
            <li
              key={credential}
              className="rounded-sm border border-l-4 border-l-violet px-2 py-0.5 text-xs font-bold"
            >
              {credential}
            </li>
          ))}
        </ul>
      ) : null}
      {member.linkedinUrl ? (
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          <SocialIcon platform="linkedin" />
          {member.name.split(" ")[0]} on LinkedIn
        </a>
      ) : null}
    </article>
  );
}
