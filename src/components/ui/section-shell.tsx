import type { ReactNode } from "react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="relative z-0 border-t border-[#164c91]/8 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {children ?? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="relative z-0 h-44 rounded-2xl border border-[#164c91]/10 bg-white/72 shadow-[0_18px_60px_-40px_rgba(38,97,170,0.35)]"
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
