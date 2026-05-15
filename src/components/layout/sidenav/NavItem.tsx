"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  href?: string;
}

export function NavItem({ icon, label, badge, href }: NavItemProps) {
  const pathname = usePathname();
  const isActive = href
    ? pathname === href || pathname.startsWith(`${href}/`)
    : false;
  const content = (
    <>
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      <span className="flex-1 truncate text-left">{label}</span>
      {badge && (
        <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {badge}
        </span>
      )}
    </>
  );

  const className = cn(
    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  );

  if (!href) {
    return (
      <div aria-disabled="true" className={className}>
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
