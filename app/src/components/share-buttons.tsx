import { Mail } from "lucide-react";

import { SocialIcon } from "@/components/brand/social-icon";

/** Article share links (no third-party scripts or tracking). */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <SocialIcon platform="linkedin" /> },
    { label: "X", href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`, icon: <SocialIcon platform="x" /> },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, icon: <SocialIcon platform="whatsapp" /> },
    { label: "Email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, icon: <Mail className="size-4" aria-hidden /> },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="mr-1 text-sm font-semibold">Share</p>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.label === "Email" ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className="grid size-9 place-items-center rounded-full border text-ink transition-colors hover:border-transparent hover:bg-primary hover:text-white"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
