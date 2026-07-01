import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-[#168cff] bg-[#168cff] text-white shadow-[0_12px_30px_-12px_rgba(22,140,255,0.65)] hover:-translate-y-0.5 hover:bg-[#087eea]",
  secondary:
    "border-[#163b70]/12 bg-white/60 text-[#10264a] shadow-sm backdrop-blur-md hover:-translate-y-0.5 hover:border-[#168cff]/25 hover:bg-white/90",
  ghost: "border-transparent text-[#61708c] hover:bg-white/60 hover:text-[#07152f]",
};

export function Button({
  className = "",
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-medium transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
