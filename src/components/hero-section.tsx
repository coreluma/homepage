import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const metrics = [
  { value: "2", label: "Developers" },
  { value: "3+", label: "Products" },
  { value: "Full-stack", label: "From core to experience" },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden border-b border-[#164c91]/8 pt-28 pb-10 sm:pt-36 sm:pb-12"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-[-18rem] right-[-10rem] h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(84,223,255,0.26),rgba(99,129,255,0.1)_42%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-18rem] left-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#8ea8ff]/10 blur-[100px]" />
        <div className="hero-grid absolute inset-0 opacity-25" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="relative z-10 max-w-2xl">
            <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-[#164c91]/10 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-[#52617d] shadow-sm backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-[#168cff] shadow-[0_0_10px_rgba(22,140,255,0.55)]" />
              Two people. One product studio.
            </div>

            <h1 className="hero-reveal mt-7 text-balance text-6xl leading-[0.92] font-semibold tracking-[-0.065em] text-[#07152f] [animation-delay:80ms] sm:text-7xl lg:text-[6.5rem]">
              Core Luma
            </h1>
            <p className="hero-reveal mt-6 max-w-xl text-balance text-2xl leading-[1.08] font-semibold tracking-[-0.035em] text-[#152b50] [animation-delay:140ms] sm:text-3xl">
              Building the core,
              <span className="block bg-gradient-to-r from-[#168cff] to-[#756cff] bg-clip-text text-transparent">
                illuminating the experience.
              </span>
            </p>
            <p className="hero-reveal mt-6 max-w-lg text-pretty text-base leading-7 text-[#61708c] [animation-delay:200ms] sm:text-lg">
              We build thoughtful digital products from core logic to delightful user experiences.
            </p>
            <p className="hero-reveal mt-2 text-sm text-[#7c8ba5] [animation-delay:240ms]">
              핵심을 만들고, 경험을 빛나게 합니다.
            </p>
            <div className="hero-reveal mt-8 flex flex-col gap-3 [animation-delay:300ms] sm:flex-row">
              <Button href="#products">View Products <span className="ml-2" aria-hidden="true">→</span></Button>
              <Button href="#members" variant="secondary">Meet the Team</Button>
            </div>
          </div>

          <div className="hero-reveal relative mx-auto h-[25rem] w-full max-w-[35rem] [animation-delay:180ms] sm:h-[31rem] lg:h-[36rem]" aria-hidden="true">
            <div className="absolute inset-[8%] rounded-full bg-white/40 blur-2xl" />
            <div className="absolute top-[4%] left-1/2 h-[42%] w-[42%] -translate-x-1/2 [clip-path:polygon(50%_0,100%_88%,50%_100%,0_88%)] bg-gradient-to-br from-white/90 via-[#65e6ff]/75 to-[#526eff]/65 shadow-[0_35px_70px_-28px_rgba(31,126,255,0.65)] backdrop-blur-xl">
              <div className="absolute inset-[15%] [clip-path:polygon(50%_8%,90%_80%,50%_68%,10%_80%)] bg-gradient-to-b from-[#efffff]/95 to-[#448dff]/35" />
            </div>
            <div className="absolute top-[42%] left-1/2 h-[14%] w-[62%] -translate-x-1/2 [clip-path:polygon(50%_0,100%_62%,50%_100%,0_62%)] bg-gradient-to-r from-[#42bfff]/65 via-white/90 to-[#6278ff]/65 shadow-[0_22px_45px_-20px_rgba(42,118,231,0.7)]" />
            <div className="absolute top-[51%] left-1/2 h-[35%] w-[68%] -translate-x-1/2 rounded-[50%_50%_44%_44%/22%_22%_72%_72%] border border-white/70 bg-gradient-to-br from-[#75efff]/65 via-[#e2faff]/80 to-[#6175ff]/65 shadow-[0_35px_70px_-25px_rgba(41,121,223,0.6)] backdrop-blur-xl">
              <div className="absolute inset-[10%] rounded-[inherit] bg-gradient-to-br from-white/70 via-transparent to-[#407cff]/35" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid divide-y divide-[#164c91]/8 border-t border-[#164c91]/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="py-6 sm:px-8 sm:first:pl-0">
              <p className="text-xl font-semibold tracking-[-0.03em] text-[#07152f]">{metric.value}</p>
              <p className="mt-1 text-xs font-medium text-[#7c8ba5]">{metric.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
