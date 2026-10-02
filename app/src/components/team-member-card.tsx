import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TeamMember } from "@/content/types";
import { media } from "@/lib/media";

type TeamMemberCardProps = {
  member: TeamMember;
  variant?: "compact" | "full";
};

// lucide-react dropped brand/logo glyphs (incl. LinkedIn); inline the glyph instead.
function LinkedinGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
    <Card className="h-full">
      <CardHeader className="items-center text-center">
        <div className="relative mx-auto size-32 overflow-hidden rounded-full ring-2 ring-border sm:size-36">
          <Image
            src={media(member.headshotKey)}
            alt={member.headshotAlt}
            fill
            className="object-cover"
            sizes="144px"
          />
        </div>
        <CardTitle className="text-xl">{member.name}</CardTitle>
        <CardDescription>{member.role}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
        {member.credentials.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-2">
            {member.credentials.map((credential) => (
              <li key={credential}>
                <Badge variant="secondary">{credential}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
        {member.linkedinUrl ? (
          <div className="flex justify-center pt-2">
            <Button asChild variant="outline" size="sm">
              <Link
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinGlyph />
                LinkedIn
              </Link>
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
