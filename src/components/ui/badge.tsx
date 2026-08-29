import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "ink",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "ink" | "accent" | "paper" | "success";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tone === "ink" && "bg-ink text-cream",
        tone === "accent" && "bg-accent text-accent-fg",
        tone === "paper" && "bg-paper-2 text-fg",
        tone === "success" && "bg-success-soft text-success",
        className,
      )}
      {...props}
    />
  );
}
