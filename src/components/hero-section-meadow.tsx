"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { InteractiveMeadowTitle } from "@/components/interactive-meadow-title";
import { MeadowMotionController } from "@/components/meadow-motion-controller";
import { MeadowProcessItem } from "@/components/meadow-process-item";
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
    <header className="absolute inset-x-0 top-0 z-40 h-auto w-full text-white">
      <Container className="flex h-16 items-center justify-between !px-4 min-[421px]:!px-6 md:h-28 md:!px-8 lg:!px-12">
        <a href="#top" className="flex items-center focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-white">
          <Image
            src="/images/logo/coreluma-glitter-logo-flat.svg"
            alt="Core Luma"
            width={148}
            height={24}
            priority
            className="h-4 w-auto min-[421px]:h-5 md:h-6"
          />
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
  const [heroReplayKey, setHeroReplayKey] = useState(0);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    const hero = document.getElementById("top");

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          if (hasEnteredRef.current) {
            setHeroReplayKey((current) => current + 1);
          }

          hasEnteredRef.current = true;
        });
      },
      {
        threshold: 0.32,
      },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section key={heroReplayKey} id="top" className="meadow-hero relative isolate min-h-[100svh] w-full text-white md:h-[100svh]">
      <MeadowMotionController />
      
      {/* 액자 프레임 배경 */}
      <div className="meadow-bg-stage pointer-events-none absolute inset-0 z-0 h-full w-full overflow-clip" aria-hidden="true">
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
          className="meadow-bottom-clouds absolute inset-x-0 bottom-0 z-[3] h-auto w-[170%] max-w-none -translate-x-[20%] md:bottom-[clamp(5.8rem,11vw,9.5rem)] md:w-[112%] md:-translate-x-[5.5%] lg:bottom-0"
        />
        <div className="sticky top-0 z-[5] h-[100svh] w-full md:contents">
          <Image
            src="/images/dreamcore-grass.png"
            alt=""
            width={1746}
            height={901}
            priority
            className="meadow-grass absolute inset-x-0 bottom-0 z-[5] h-auto w-[180%] max-w-none -translate-x-[22%] md:bottom-[-4.5vw] md:w-full md:translate-x-0 lg:bottom-[-7vw]"
          />
        </div>
      </div>

      {/* 내부 콘텐츠 스크롤 컨테이너 */}
      <div className="meadow-opening-light pointer-events-none absolute inset-0 z-30" aria-hidden="true" />

      <div className="meadow-content-scroll-container relative z-10 w-full md:h-[100svh]">
        <MeadowHeader />
        
        <Container className="meadow-content flex flex-col items-center pt-16 pb-0 md:h-[100svh] md:min-h-[100svh] md:pt-20 md:pb-10">
          
          {/* 
            [핵심 수정 1] 
            모바일에서 불필요하게 가상 높이를 만들던 min-h-[calc(100svh-5.5rem)]를 제거하고 h-auto로 변경했습니다.
            첫 뷰에서 자연스럽게 중앙 정렬되도록 패딩 배율(pt-16 pb-20)을 새로 고정했습니다.
          */}
          <div className="meadow-intro relative z-1 flex h-auto min-h-0 w-full flex-none flex-col items-center justify-center pt-4 pb-4 text-center md:w-auto md:flex-1 md:translate-y-[clamp(0.4rem,2.5vh,1.5rem)] md:p-0">
            <InteractiveMeadowTitle />
            <p className="meadow-subtitle meadow-subtitle-entrance mt-[0.75rem] max-w-100 text-balance text-sm leading-[1.35] font-medium tracking-[-0.03em] text-white/92 drop-shadow-[0_2px_10px_rgba(54,113,181,0.22)] sm:text-base md:mt-0 md:max-w-none md:text-xl md:leading-normal lg:text-2xl">
              Building the core,
              <br className="md:hidden" />{" "}
              illuminating the experience.
            </p>
            <a href="#products" className="meadow-cta meadow-cta-entrance relative z-16 mt-8 rounded-full bg-gradient-to-r from-[#357dff] to-[#9a8cff] px-[1.45rem] py-[0.95rem] text-sm font-semibold text-white shadow-[0_14px_34px_rgba(62,111,255,0.28)] transition md:mt-9 md:px-7 md:py-3.5 hover:-translate-y-0.5">
              View Our Products&nbsp; →
            </a>
          </div>

          {/* 
            [핵심 수정 2] 
            프로세스 판넬 상단 진입 시의 불필요한 공백을 걷어내기 위해 상단 패딩을 pt-4로 최적화했습니다.
          */}
          <div className="flex h-auto w-full shrink-0 items-center pt-4 pb-12 md:min-h-0 md:w-full md:shrink-1 md:items-stretch md:p-0 md:contents">
            <div className="meadow-process-panel relative z-12 grid w-full gap-7 rounded-[1.8rem] border border-white/75 bg-white/72 p-[clamp(1.35rem,8vw,2rem)] text-[#17386a] shadow-[0_28px_80px_rgba(39,75,132,0.17)] backdrop-blur-xl sm:grid-cols-2 md:mb-[clamp(1.5rem,4vw,3.5rem)] md:rounded-[2.1rem] md:p-8 lg:grid-cols-[1.7fr_repeat(4,1fr)]">
              <div className="meadow-process-intro sm:col-span-2 lg:col-span-1">
                <h2 className="text-2xl font-semibold tracking-[-0.045em] text-[#152d52] sm:text-3xl">What we do</h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-[#526582]">Core Luma is a two-person product studio. We design, build, and ship digital products that solve real problems and create meaningful experiences.</p>
              </div>
              {process.map((item, index) => (
                <MeadowProcessItem
                  key={item.title}
                  index={index}
                  className="grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-1 md:block"
                >
                  <span className="row-span-2 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#dae3ff] bg-gradient-to-br from-white to-[#f5f7ff] font-mono text-base font-semibold text-[#7188ff] shadow-sm md:size-12 md:text-lg">{item.icon}</span>
                  <h3 className="font-semibold text-[#1a3157] md:mt-3">{item.title}</h3>
                  <p className="col-start-2 text-sm leading-5 text-[#5e6f89] md:mt-1 md:text-xs">{item.copy}</p>
                </MeadowProcessItem>
              ))}
            </div>
          </div>

        </Container>
      </div>
    </section>
  );
}
