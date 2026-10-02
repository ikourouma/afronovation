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
import { SocialIcon } from "@/components/brand/social-icon";

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
                <SocialIcon platform="linkedin" />
                LinkedIn
              </Link>
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
