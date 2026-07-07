import Image from "next/image";
import { Container } from "@/components/ui/container";

const process = [
  { icon: "◆", title: "Ideate", copy: "We find meaningful problems worth solving." },
  { icon: "</>", title: "Build", copy: "We build with clean code and solid architecture." },
  { icon: "✦", title: "Launch", copy: "We ship fast and focus on real user value." },
  { icon: "▥", title: "Improve", copy: "We listen, learn, and keep improving every day." },
];

function LumaHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 text-white">
      <Container className="flex h-22 items-center justify-between">
        <a href="#top" className="flex items-center gap-3 text-lg font-semibold tracking-[-0.03em] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-white">
          <span className="luma-mark" aria-hidden="true">✳</span>
          Core Luma
        </a>
        <nav className="hidden rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-md md:flex" aria-label="Main navigation">
          <a href="#products" className="rounded-full bg-white/85 px-7 py-2.5 text-sm font-semibold text-[#2361bd]">Products</a>
          <a href="#about" className="rounded-full px-7 py-2.5 text-sm text-white/90 transition hover:bg-white/10">About</a>
          <a href="#members" className="rounded-full px-7 py-2.5 text-sm text-white/90 transition hover:bg-white/10">Members</a>
          <a href="#process" className="rounded-full px-7 py-2.5 text-sm text-white/90 transition hover:bg-white/10">Engineering</a>
        </nav>
        <a href="#contact" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#17386a] shadow-lg shadow-blue-800/10 transition hover:-translate-y-0.5">✉ &nbsp;Contact</a>
      </Container>
    </header>
  );
}

export function HeroSectionLuma() {
  return (
    <section id="top" className="luma-hero relative isolate min-h-[100svh] overflow-hidden text-[#17386a]">
      <LumaHeader />
      <div className="luma-clouds pointer-events-none absolute inset-0" aria-hidden="true" />
      <span className="luma-speck left-[28%] top-[13%] size-5" aria-hidden="true" />
      <span className="luma-speck right-[23%] top-[11%] size-8" aria-hidden="true" />
      <span className="luma-speck right-[12%] top-[43%] size-5" aria-hidden="true" />
      <Image
        src="/images/luma-bottom-clouds-natural.png"
        alt=""
        width={1536}
        height={1024}
        priority
        className="luma-bottom-clouds pointer-events-none absolute inset-x-0 z-[4] h-auto w-full"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col items-center pt-28 pb-6 lg:pt-24">
        <div className="luma-intro flex flex-1 flex-col items-center justify-center py-12 text-center lg:py-6">
          <div className="mx-auto mb-2 text-5xl font-light text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]" aria-hidden="true">◔<sup className="text-2xl">✦</sup></div>
          <h1 className="luma-title text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.075em]">Core Luma</h1>
          <p className="mt-4 text-lg leading-snug font-medium tracking-[-0.025em] text-[#254c85] sm:text-xl">Building the core,<br />illuminating the experience.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#products" className="rounded-full bg-gradient-to-r from-[#347eff] to-[#9c8cff] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(65,108,255,0.32)] transition hover:-translate-y-0.5">View Our Products&nbsp; →</a>
            <a href="#about" className="rounded-full border border-white/55 bg-white/15 px-5 py-3 text-sm font-medium text-[#24497c] backdrop-blur-sm transition hover:bg-white/35">▷ &nbsp;Play Intro</a>
          </div>
        </div>

        <div className="luma-process-panel grid w-full gap-7 rounded-[1.8rem] border border-white/70 bg-white/82 p-7 shadow-[0_30px_80px_rgba(60,88,160,0.16)] backdrop-blur-xl sm:p-9 lg:grid-cols-[1.65fr_repeat(4,1fr)]">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[#152d52]">What we do</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#526582]">Core Luma is a two-person product studio. We design, build, and ship digital products that solve real problems and create meaningful experiences.</p>
          </div>
          {process.map((item) => (
            <div key={item.title}>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-[#edf2ff] font-mono text-lg font-semibold text-[#7188ff] shadow-sm">{item.icon}</span>
              <h3 className="mt-3 font-semibold text-[#1a3157]">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#5e6f89]">{item.copy}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
