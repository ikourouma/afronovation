"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CheckCheck,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  MenuIcon,
  ScrollText,
  UserCog,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/brand/logo";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type SidebarProps = {
  user: { name: string; roleLabel: string };
  isAdmin: boolean;
  pendingApprovals: number;
  sections: { key: string; label: string; group: string }[];
};

function NavLink({
  href,
  children,
  active,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-white/12 text-white" : "text-[#b4bfd2] hover:bg-white/8 hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}

export function AdminSidebar({ user, isAdmin, pendingApprovals, sections }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const groups = [...new Set(sections.map((section) => section.group))];

  async function signOut() {
    await authClient.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const nav = (
    <nav aria-label="Admin" className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <Link href="/admin" onClick={close} className="px-2 pt-2">
        <Logo tone="light" className="h-8" />
      </Link>

      <div className="space-y-1">
        <NavLink href="/admin" active={pathname === "/admin"} onNavigate={close}>
          <LayoutDashboard className="size-4" aria-hidden /> Dashboard
        </NavLink>
        <NavLink href="/admin/leads" active={pathname.startsWith("/admin/leads")} onNavigate={close}>
          <Inbox className="size-4" aria-hidden /> Leads
        </NavLink>
        <NavLink href="/admin/subscribers" active={pathname.startsWith("/admin/subscribers")} onNavigate={close}>
          <Mail className="size-4" aria-hidden /> Subscribers
        </NavLink>
        {isAdmin ? (
          <NavLink href="/admin/approvals" active={pathname.startsWith("/admin/approvals")} onNavigate={close}>
            <CheckCheck className="size-4" aria-hidden /> Approvals
            {pendingApprovals > 0 ? (
              <span className="ml-auto rounded-full bg-pink px-2 text-xs font-bold text-white">{pendingApprovals}</span>
            ) : null}
          </NavLink>
        ) : null}
      </div>

      {groups.map((group) => (
        <div key={group}>
          <p className="px-3 text-xs font-semibold tracking-wide text-[#8a97ad] uppercase">{group}</p>
          <div className="mt-1.5 space-y-0.5">
            {sections
              .filter((section) => section.group === group)
              .map((section) => (
                <NavLink
                  key={section.key}
                  href={`/admin/content/${section.key}`}
                  active={pathname.startsWith(`/admin/content/${section.key}`)}
                  onNavigate={close}
                >
                  {section.label}
                </NavLink>
              ))}
          </div>
        </div>
      ))}

      <div className="space-y-1">
        {isAdmin ? (
          <>
            <NavLink href="/admin/users" active={pathname.startsWith("/admin/users")} onNavigate={close}>
              <Users className="size-4" aria-hidden /> Users
            </NavLink>
            <NavLink href="/admin/activity" active={pathname.startsWith("/admin/activity")} onNavigate={close}>
              <ScrollText className="size-4" aria-hidden /> Change log
            </NavLink>
          </>
        ) : null}
        <NavLink href="/admin/account" active={pathname.startsWith("/admin/account")} onNavigate={close}>
          <UserCog className="size-4" aria-hidden /> My account
        </NavLink>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-[#b4bfd2] hover:bg-white/8 hover:text-white"
        >
          <ExternalLink className="size-4" aria-hidden /> View website
        </a>
      </div>

      <div className="mt-auto rounded-md bg-white/6 p-3">
        <p className="text-sm font-semibold text-white">{user.name}</p>
        <p className="text-xs text-[#b4bfd2]">{user.roleLabel}</p>
        <button
          type="button"
          onClick={signOut}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f3a9cf] hover:underline"
        >
          <LogOut className="size-4" aria-hidden /> Sign out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 self-stretch bg-navy lg:block">
        <div className="sticky top-0 h-screen">{nav}</div>
      </aside>
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between bg-navy px-4 lg:hidden">
        <Logo tone="light" className="h-7" />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Admin menu"
          className="grid size-10 place-items-center rounded-md text-white hover:bg-white/10"
        >
          <MenuIcon className="size-5" aria-hidden />
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 top-14 z-40 bg-navy lg:hidden">{nav}</div>
      ) : null}
    </>
  );
}
