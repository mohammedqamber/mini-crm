import { useEffect } from "react";

export function useLeadSearchShortcut() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.target instanceof HTMLInputElement) return;

      e.preventDefault();
      document
        .querySelector<HTMLInputElement>('input[placeholder="Search leads..."]')
        ?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
