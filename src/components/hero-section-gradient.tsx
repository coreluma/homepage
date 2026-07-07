import Image from "next/image";
import { Container } from "@/components/ui/container";

const bubbles = [
  "left-[4%] top-[18%] size-20 sm:size-32",
  "right-[7%] top-[12%] size-16 sm:size-24",
  "right-[2%] top-[48%] size-24 sm:size-36",
  "left-[12%] bottom-[12%] size-14 sm:size-20",
  "right-[19%] bottom-[7%] size-12 sm:size-16",
  "left-[72%] top-[28%] size-7 sm:size-10",
];

export function HeroSectionGradient() {
  return (
    <section id="top" className="dream-hero-gradient relative isolate min-h-[100svh] overflow-hidden text-white">
      <div className="sun-glow pointer-events-none absolute -top-[18rem] -left-[12rem] size-[46rem] rounded-full" aria-hidden="true" />
      <div className="pointer-events-none absolute top-[18%] right-[8%] h-72 w-72 rounded-full bg-[#c084fc]/10 blur-[100px]" aria-hidden="true" />

      {bubbles.map((position, index) => (
        <span
          key={position}
          className={`dream-bubble pointer-events-none absolute z-20 rounded-full ${position}`}
          style={{ animationDelay: `${index * -1.7}s` }}
          aria-hidden="true"
        />
      ))}

      <Image
        src="/images/dreamcore-grass.png"
        alt=""
        width={1746}
        height={900}
        priority
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-auto min-h-[23%] w-full object-fill object-bottom sm:min-h-0"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col pt-28 pb-7 sm:pt-32">
        <div className="hero-reveal flex items-center justify-between font-mono text-[0.62rem] tracking-[0.18em] text-white/85 uppercase">
          <span>18. 7. 2026</span>
          <span className="hidden sm:inline">Core Luma / Product Studio</span>
          <span>Seoul, KR</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center pb-[12vh] text-center sm:pb-[16vh]">
          <p className="hero-reveal mb-5 font-mono text-[0.62rem] tracking-[0.3em] text-white/80 uppercase [animation-delay:80ms]">
            Building ideas into products
          </p>
          <h1 className="cloud-title cloud-float hero-reveal text-[clamp(5.1rem,17vw,14.5rem)] leading-[0.72] font-black tracking-[-0.105em] uppercase [animation-delay:140ms]">
            <span className="block">Core</span>
            <span className="block">Luma</span>
          </h1>
          <p className="hero-reveal mt-9 text-balance text-lg leading-tight font-semibold tracking-[-0.03em] text-white drop-shadow-sm [animation-delay:220ms] sm:text-2xl">
            Building the core,
            <span className="block">illuminating the experience.</span>
          </p>
          <p className="hero-reveal mt-3 text-sm text-white/75 [animation-delay:280ms]">
            핵심을 만들고, 경험을 빛나게 합니다.
          </p>
        </div>

        <div className="hero-reveal relative z-10 flex items-end justify-center font-mono text-[0.58rem] tracking-[0.16em] text-white/85 uppercase [animation-delay:360ms] sm:justify-between">
          <span className="hidden leading-relaxed sm:block">Backend × Frontend<br />Two-person studio</span>
          <a href="#products" className="group flex flex-col items-center gap-2 rounded-md px-3 py-1 focus-visible:outline-2 focus-visible:outline-white">
            <span>Scroll to explore</span>
            <span className="text-base transition group-hover:translate-y-1" aria-hidden="true">↓</span>
          </a>
          <span className="hidden text-right leading-relaxed sm:block">Design<br />Development<br />Launch</span>
        </div>
      </Container>
    </section>
  );
}
