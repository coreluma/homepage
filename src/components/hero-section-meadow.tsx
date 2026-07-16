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
      <Container className="flex h-22 items-center justify-between !px-4 min-[421px]:!px-6 md:h-24 md:!px-8 lg:!px-12">
        <a href="#top" className="flex items-center text-[1.1rem] font-semibold tracking-[-0.035em] min-[421px]:text-[1.35rem] md:gap-0 md:text-xl focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-white">
          <Image
            src="/images/logo/core-luma-logo-white.svg"
            alt=""
            width={24}
            height={24}
            priority
            className="size-6 shrink-0 object-contain"
          />
          Core Luma
        </a>
        <nav className="hidden rounded-full border border-white/18 bg-white/16 p-1 backdrop-blur-md lg:flex" aria-label="Main navigation">
          <a href="#products" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1764e8] shadow-sm xl:px-8">Products</a>
          <a href="#about" className="rounded-full px-5 py-3 text-sm font-semibold text-white/92 transition hover:bg-white/10 xl:px-8">About</a>
          <a href="#members" className="rounded-full px-5 py-3 text-sm font-semibold text-white/92 transition hover:bg-white/10 xl:px-8">Members</a>
          <a href="#process" className="rounded-full px-5 py-3 text-sm font-semibold text-white/92 transition hover:bg-white/10 xl:px-8">Engineering</a>
        </nav>
        <a href="#contact" className="inline-flex items-center gap-1 rounded-full bg-white px-[0.9rem] py-2 text-[0.82rem] font-semibold text-[#1764e8] shadow-[0_12px_28px_rgba(32,88,170,0.16)] transition min-[421px]:px-[1.05rem] min-[421px]:py-[0.85rem] min-[421px]:text-[0.95rem] md:px-5 md:py-3 md:text-sm md:shadow-lg md:shadow-blue-800/10 hover:-translate-y-0.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          Contact
        </a>
      </Container>
    </header>
  );
}

export function HeroSectionMeadow() {
  return (
    <section id="top" className="meadow-hero relative isolate min-h-[100svh] overflow-hidden text-white">
      <MeadowHeader />
      <div className="meadow-bg-stage pointer-events-none absolute inset-0 min-h-[100svh] overflow-hidden" aria-hidden="true">
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
          className="luma-side-cloud luma-side-cloud-left meadow-side-cloud meadow-side-cloud-left absolute top-28 -left-40 h-auto w-80 max-w-none opacity-64 md:top-[clamp(4.5rem,7.4vw,6rem)] md:left-[max(-8rem,-4.8vw)] md:w-[clamp(22rem,33vw,36rem)] md:opacity-78"
        />
        <Image
          src="/images/luma-side-cloud-right-meadow.png"
          alt=""
          width={522}
          height={289}
          priority
          className="luma-side-cloud luma-side-cloud-right meadow-side-cloud meadow-side-cloud-right absolute top-[7.4rem] -right-42 h-auto w-80 max-w-none opacity-64 md:top-[clamp(6.8rem,9.8vw,8.6rem)] md:right-[max(-6.5rem,-3.4vw)] md:w-[clamp(17rem,25vw,27.5rem)] md:opacity-82"
        />
        <Image
          src="/images/luma-bottom-clouds-natural.png"
          alt=""
          width={1536}
          height={1024}
          priority
          className="meadow-bottom-clouds absolute inset-x-0 top-[calc(100svh-15rem)] z-[3] h-auto w-[170%] max-w-none -translate-x-[20%] md:top-auto md:bottom-[clamp(5.8rem,11vw,9.5rem)] md:w-[112%] md:-translate-x-[5.5%] lg:bottom-0"
        />
        <Image
          src="/images/dreamcore-grass.png"
          alt=""
          width={1746}
          height={901}
          priority
          className="meadow-grass absolute inset-x-0 top-[calc(100svh-8.5rem)] z-[5] h-auto w-[180%] max-w-none -translate-x-[22%] md:top-auto md:bottom-[-4.5vw] md:w-full md:translate-x-0 lg:bottom-[-7vw]"
        />
      </div>

      <Container className="meadow-content relative z-10 flex min-h-[100svh] flex-col items-center pt-22 pb-5 md:pt-28 md:pb-10 lg:pt-24">
        <div className="meadow-intro flex min-h-[clamp(34rem,78svh,46rem)] w-full flex-none flex-col items-center justify-center pt-4 pb-[clamp(5rem,14svh,8rem)] text-center md:min-h-0 md:w-auto md:flex-1 md:translate-y-[clamp(0.6rem,4.2vh,2.6rem)] md:p-0">
          <InteractiveMeadowTitle />
          <p className="meadow-subtitle mt-[1.15rem] max-w-84 text-balance text-base leading-[1.35] font-medium tracking-[-0.03em] text-white/92 drop-shadow-[0_2px_10px_rgba(54,113,181,0.22)] sm:text-lg md:mt-5 md:max-w-none md:leading-normal">
            Building the core, illuminating the experience.
          </p>
          <a href="#products" className="meadow-cta relative z-16 mt-8 rounded-full bg-gradient-to-r from-[#357dff] to-[#9a8cff] px-[1.45rem] py-[0.95rem] text-sm font-semibold text-white shadow-[0_14px_34px_rgba(62,111,255,0.28)] transition md:mt-9 md:px-7 md:py-3.5 hover:-translate-y-0.5">
            View Our Products&nbsp; →
          </a>
        </div>

        <div className="meadow-process-panel relative z-12 mt-4 mb-0 grid w-full gap-7 rounded-[1.8rem] border border-white/75 bg-white/88 p-[clamp(1.35rem,6vw,2rem)] text-[#17386a] shadow-[0_28px_80px_rgba(39,75,132,0.17)] backdrop-blur-xl sm:grid-cols-2 md:mt-0 md:mb-[clamp(1.5rem,5vw,4rem)] md:rounded-[2.1rem] md:p-8 lg:grid-cols-[1.7fr_repeat(4,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
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
