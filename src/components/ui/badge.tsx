import type { ComponentPropsWithoutRef } from "react";

type BadgeProps = ComponentPropsWithoutRef<"span">;

export function Badge({ className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[#164c91]/10 bg-white/60 px-3 py-1 text-xs font-medium text-[#52617d] backdrop-blur-sm ${className}`}
      {...props}
    />
  );
}
