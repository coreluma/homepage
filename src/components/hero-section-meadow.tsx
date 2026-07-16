import Image from "next/image";
import { InteractiveMeadowTitle } from "@/components/interactive-meadow-title";
import { Container } from "@/components/ui/container";

const process = [
  { icon: "◆", title: "Ideate", copy: "We find meaningful problems worth solving." },
  { icon: "</>", title: "Build", copy: "We build with clean code and solid architecture." },
  { icon: "✦", title: "Launch", copy: "We ship fast and focus on real user value." },
  { icon: "▥", title: "Improve", copy: "We listen, learn, and keep improving every day." },
];

const bubbles = [
  "left-[14%] top-[25%] size-10 sm:size-16",
  "left-[22%] top-[39%] size-6 sm:size-10",
  "left-[7%] top-[51%] size-7 sm:size-11",
  "left-[34%] top-[21%] size-5 sm:size-8",
  "right-[18%] top-[24%] size-9 sm:size-14",
  "right-[8%] top-[45%] size-6 sm:size-10",
  "right-[29%] top-[38%] size-5 sm:size-8",
  "left-[58%] top-[18%] size-5 sm:size-8",
  "right-[43%] top-[30%] size-4 sm:size-7",
];

function MeadowHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 text-white">
      <Container className="flex h-24 items-center justify-between">
        <a href="#top" className="flex items-center gap-3 text-xl font-semibold tracking-[-0.035em] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-white">
          <span className="text-2xl font-light" aria-hidden="true">♙</span>
          Core Luma
        </a>
        <nav className="hidden rounded-full border border-white/18 bg-white/16 p-1 backdrop-blur-md md:flex" aria-label="Main navigation">
          <a href="#products" className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1764e8] shadow-sm">Products</a>
          <a href="#about" className="rounded-full px-8 py-3 text-sm font-semibold text-white/92 transition hover:bg-white/10">About</a>
          <a href="#members" className="rounded-full px-8 py-3 text-sm font-semibold text-white/92 transition hover:bg-white/10">Members</a>
          <a href="#process" className="rounded-full px-8 py-3 text-sm font-semibold text-white/92 transition hover:bg-white/10">Engineering</a>
        </nav>
        <a href="#contact" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1764e8] shadow-lg shadow-blue-800/10 transition hover:-translate-y-0.5">✉&nbsp; Contact</a>
      </Container>
    </header>
  );
}

export function HeroSectionMeadow() {
  return (
    <section id="top" className="meadow-hero relative isolate min-h-[100svh] overflow-hidden text-white">
      <MeadowHeader />
      <div className="meadow-bg-stage pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="meadow-clouds absolute inset-0" />
        {bubbles.map((position) => (
          <span
            key={position}
            className={`dream-bubble meadow-bubble absolute rounded-full ${position}`}
          />
        ))}
        <Image
          src="/images/luma-side-cloud-left.png"
          alt=""
          width={626}
          height={317}
          priority
          className="luma-side-cloud luma-side-cloud-left meadow-side-cloud meadow-side-cloud-left absolute h-auto"
        />
        <Image
          src="/images/luma-side-cloud-right-meadow.png"
          alt=""
          width={522}
          height={289}
          priority
          className="luma-side-cloud luma-side-cloud-right meadow-side-cloud meadow-side-cloud-right absolute h-auto"
        />
        <Image
          src="/images/luma-bottom-clouds-natural.png"
          alt=""
          width={1536}
          height={1024}
          priority
          className="meadow-bottom-clouds absolute inset-x-0 z-[3] h-auto w-full"
        />
        <Image
          src="/images/dreamcore-grass.png"
          alt=""
          width={1746}
          height={901}
          priority
          className="meadow-grass absolute inset-x-0 z-[5] h-auto w-full"
        />
      </div>

      <Container className="meadow-content relative z-10 flex min-h-[100svh] flex-col items-center pt-28 pb-10 lg:pt-24">
        <div className="meadow-intro flex flex-1 flex-col items-center justify-center text-center">
          <InteractiveMeadowTitle />
          <p className="meadow-subtitle mt-5 text-balance text-base font-medium tracking-[-0.03em] text-white/92 drop-shadow-[0_2px_10px_rgba(54,113,181,0.22)] sm:text-lg">
            Building the core, illuminating the experience.
          </p>
          <a href="#products" className="meadow-cta mt-9 rounded-full bg-gradient-to-r from-[#357dff] to-[#9a8cff] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(62,111,255,0.28)] transition hover:-translate-y-0.5">
            View Our Products&nbsp; →
          </a>
        </div>

        <div className="meadow-process-panel grid w-full gap-7 rounded-[2.1rem] border border-white/75 bg-white/88 p-7 text-[#17386a] shadow-[0_28px_80px_rgba(39,75,132,0.17)] backdrop-blur-xl sm:p-8 lg:grid-cols-[1.7fr_repeat(4,1fr)]">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.045em] text-[#152d52] sm:text-3xl">What we do</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#526582]">Core Luma is a two-person product studio. We design, build, and ship digital products that solve real problems and create meaningful experiences.</p>
          </div>
          {process.map((item) => (
            <div key={item.title}>
              <span className="flex size-12 items-center justify-center rounded-2xl border border-[#dae3ff] bg-gradient-to-br from-white to-[#f5f7ff] font-mono text-lg font-semibold text-[#7188ff] shadow-sm">{item.icon}</span>
              <h3 className="mt-3 font-semibold text-[#1a3157]">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#5e6f89]">{item.copy}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
