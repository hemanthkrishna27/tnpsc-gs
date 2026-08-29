import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg bg-cream px-3.5 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none transition-[box-shadow] duration-150 placeholder:text-faint focus:shadow-[0_0_0_2px_var(--color-ink)]",
        className,
      )}
      {...props}
    />
  );
}
