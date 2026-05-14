import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 transition-colors",
        "placeholder:text-slate-400",
        "hover:border-slate-300",
        "focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
