import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/leads/") && pathname.endsWith("/edit"))
    return "Edit Lead";
  if (pathname.startsWith("/leads/")) return "Lead Details";
  if (pathname === "/leads/new") return "New Lead";
  if (pathname === "/leads") return "Leads";
  if (pathname === "/board") return "Board";
  return "Dashboard";
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
