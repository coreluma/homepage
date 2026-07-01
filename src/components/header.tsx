import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Members", href: "#members" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-[#164c91]/[0.07] bg-[#f5f9ff]/65 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between">
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5 font-semibold tracking-[-0.02em] text-[#07152f] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          aria-label="Core Luma home"
        >
          <span
            className="relative flex size-7 items-center justify-center rounded-lg border border-[#164c91]/10 bg-white/70 shadow-sm"
            aria-hidden="true"
          >
            <span className="size-2 rounded-full bg-gradient-to-br from-[#27d7ff] to-[#347cff] shadow-[0_0_14px_rgba(38,160,255,0.55)] transition duration-300 group-hover:scale-110" />
          </span>
          Core Luma
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-[#61708c] transition hover:bg-white/65 hover:text-[#07152f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-[#164c91]/10 bg-white/60 text-[#07152f] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open navigation menu</span>
            <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
              <span className="h-px w-full bg-current transition group-open:translate-y-[3.5px] group-open:rotate-45" />
              <span className="h-px w-full bg-current transition group-open:-translate-y-[3.5px] group-open:-rotate-45" />
            </span>
          </summary>
          <nav
            className="absolute top-13 right-0 flex w-44 flex-col rounded-2xl border border-[#164c91]/10 bg-white/95 p-2 shadow-2xl backdrop-blur-xl"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm text-[#52617d] transition hover:bg-[#edf5ff] hover:text-[#07152f]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
