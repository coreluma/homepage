import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { InteractiveOrb } from "@/components/landing/interactive-orb";
import { LogoIntro } from "@/components/landing/logo-intro";
import { Wordmark } from "@/components/landing/wordmark";
import { Reveal } from "@/components/landing/reveal";
import "./landing.css";

export const metadata: Metadata = {
  description:
    "Core Luma는 기획부터 디자인, 개발, 출시까지 한 팀에서 이어가는 2인 프로덕트 스튜디오입니다.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/images/logo/coreluma-landing-icon.svg", type: "image/svg+xml", sizes: "any" }],
  },
};

const navigation = [
  { label: "Studio", href: "#studio" },
  { label: "Service", href: "#service" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const principles = [
  {
    number: "01",
    keyword: "CLARITY",
    title: ["무엇을 만들지보다", "왜 필요한지 먼저"],
    description:
      "아이디어의 중심에 있는 문제를 먼저 들여다봅니다. 이유가 분명한 기능만 남겨 제품의 방향을 선명하게 만듭니다.",
  },
  {
    number: "02",
    keyword: "CRAFT",
    title: ["디자인과 개발이", "한 호흡으로"],
    description:
      "기획 · UX · 디자인 · 프론트엔드 · 백엔드가 두 사람 안에서 이어집니다. 전달 과정에서 의도가 흐려지지 않습니다.",
  },
  {
    number: "03",
    keyword: "LAUNCH",
    title: ["만드는 것에서", "끝나지 않도록"],
    description:
      "출시 이후의 운영과 성장까지 고려해 설계합니다. 실제 사용자를 만나는 순간부터가 진짜 시작이라고 생각합니다.",
  },
];

const services = [
  {
    number: "01",
    keyword: "PRODUCT DESIGN",
    title: "프로덕트 기획 · 디자인",
    description: "문제 정의부터 사용자 흐름, UI 시스템까지 제품의 뼈대를 함께 설계합니다.",
  },
  {
    number: "02",
    keyword: "WEB",
    title: "웹 서비스 · 홈페이지",
    description: "브랜드의 인상과 검색 성과를 함께 잇는 빠르고 단단한 웹을 만듭니다.",
  },
  {
    number: "03",
    keyword: "APPLICATION",
    title: "앱 개발",
    description: "iOS · Android 앱을 설계하고 출시 후 업데이트까지 함께 운영합니다.",
  },
  {
    number: "04",
    keyword: "AI PRODUCT",
    title: "AI 프로덕트",
    description: "대화, 추천, 자동화 등 AI가 실제 가치를 만드는 지점을 찾아 제품으로 구현합니다.",
  },
  {
    number: "05",
    keyword: "BACKEND",
    title: "서버 · 인프라",
    description: "Spring, AWS 기반의 안정적인 백엔드와 운영 가능한 인프라를 구축합니다.",
  },
];

const works = [
  {
    number: "01",
    name: "붕어빵 탐험대",
    nameEn: "Bunglog",
    category: "붕어빵 취향 테스트",
    description: "팥냥이와 함께 떠나는 붕어빵 탐험. 간단한 질문에 답하면 나와 꼭 맞는 붕어빵 취향을 찾아 주는 웹 서비스예요.",
    features: ["캐릭터 팥냥이와 함께하는 취향 테스트", "답변에 맞춘 붕어빵 취향 결과", "로그인하고 이어서 즐기기"],
    tags: ["웹", "테스트"],
    href: "https://bunglog.coreluma.kr/",
    logo: "/images/logo/bunglogLogo.png",
    logoScale: 1,
    glow: "246, 165, 90",
  },
  {
    number: "02",
    name: "Bobf",
    nameEn: "Bobf",
    category: "팀 점심 메뉴 추천",
    description: "바쁜 팀의 '오늘 뭐 먹지'를 빠르게 끝내 주는 메뉴 추천 서비스예요. 추천부터 팀원과 함께 정하는 과정까지 한 번에 해결해요.",
    features: ["오늘의 메뉴 빠른 추천", "팀원과 함께 고르는 그룹 결정", "설치 없이 웹에서 바로 사용"],
    tags: ["웹", "추천"],
    href: "https://bobf.coreluma.kr/",
    logo: "/images/logo/bobf-logo-white-text.png",
    logoScale: 1,
    glow: "107, 226, 154",
  },
  {
    number: "03",
    name: "Bripick",
    nameEn: "Bripick",
    category: "개발자를 위한 블록형 이력서 빌더",
    description: "경력, 프로젝트, 기술 스택을 블록처럼 쌓아 이력서를 완성해요. 쓰는 동안 A4 페이지 나눔을 확인하고, 보이는 그대로 PDF나 링크로 공유할 수 있어요.",
    features: ["블록 단위 편집과 숨기기", "A4 기준 페이지 나눔 실시간 확인", "PDF 저장 · 링크 하나로 공유", "가입 없이 시작, Google · 카카오 로그인"],
    tags: ["웹", "이력서", "PDF"],
    href: "https://bripick.coreluma.kr/",
    // The Bripick mark fills its canvas edge to edge, so it is shrunk to match the others.
    logo: "/images/logo/bripick_logo.svg",
    logoScale: 0.6,
    glow: "99, 146, 255",
  },
];

const keywords = [
  "Product Strategy",
  "UX Design",
  "Frontend",
  "Backend",
  "AI",
  "iOS",
  "Android",
  "Launch",
  "Growth",
];

// Anonymous member profiles. Years and skills are placeholders until confirmed.
const members = [
  {
    code: "Member 01",
    role: "Frontend",
    roleKo: "프론트엔드 · 프로덕트 디자인",
    years: 6,
    quote: "화면 한 장에도 분명한 이유가 있어야 한다고 믿어요.",
    intro: "사용자가 처음 마주하는 화면부터 손에 익는 흐름까지 설계하고 만듭니다.",
    skills: ["Next.js", "React", "TypeScript", "UI/UX"],
    silhouette: "from-[#9be7ff] via-[#4f9bff] to-[#5b5dff]",
    accent: "bg-[#dcefff]",
  },
  {
    code: "Member 02",
    role: "Backend",
    roleKo: "백엔드 · 인프라 · AI",
    years: 7,
    quote: "보이지 않는 곳이 단단해야 제품이 오래 갑니다.",
    intro: "서버와 데이터, AI 기능이 어떤 상황에서도 안정적으로 돌아가게 만듭니다.",
    skills: ["Spring", "AWS", "Database", "AI"],
    silhouette: "from-[#d6c8ff] via-[#8a7dff] to-[#5b3dff]",
    accent: "bg-[#e7e1ff]",
  },
];

// Same as the shared Container, with roomier side padding on phones.
function LandingContainer({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`mx-auto w-full max-w-7xl px-7 sm:px-10 md:px-12 ${className}`} {...props} />;
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05070d]/60 backdrop-blur-xl">
      <LandingContainer className="flex h-18 items-center justify-between">
        <a href="#top" className="inline-flex items-center gap-2.5 text-base font-semibold tracking-[-0.02em]" aria-label="Core Luma home">
          <Wordmark className="h-5 w-auto text-white md:h-6" />
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Landing navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-white/60 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold md:gap-2 md:px-5 md:py-2.5 md:text-sm text-[#05070d] transition hover:bg-[#bfe4ff]"
        >
          프로젝트 문의
          <ArrowIcon className="size-4" />
        </a>
      </LandingContainer>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="landing-hero relative flex min-h-svh items-end overflow-hidden pt-18 md:items-center">
      <div className="landing-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <InteractiveOrb />

      <LandingContainer className="relative z-10 pt-20 pb-14 md:py-20">
        <div className="landing-fade-in hidden items-center justify-between font-mono text-xs md:flex tracking-[0.3em] text-white/50 uppercase">
          <span>Core Luma</span>
          <span>Product Studio</span>
        </div>

        <h1 className="landing-serif text-center text-[25vw] [filter:drop-shadow(0_6px_28px_rgba(5,7,13,0.6))] md:mt-10 md:[filter:none] md:text-[clamp(4.5rem,17vw,17rem)] leading-[0.86] tracking-[-0.03em]">
          <span className="landing-hero-line">
            <span style={{ animationDelay: "calc(var(--landing-intro) + 150ms)" }}>Light</span>
          </span>
          <span className="landing-hero-line">
            <span className="landing-gradient-text" style={{ animationDelay: "calc(var(--landing-intro) + 320ms)" }}>
              the Core
            </span>
          </span>
        </h1>

        <div
          className="landing-fade-in mt-10 flex flex-col items-center justify-between gap-7 md:mt-14 md:gap-8 md:flex-row md:items-end"
          style={{ animationDelay: "calc(var(--landing-intro) + 700ms)" }}
        >
          <p className="max-w-md text-center text-xl leading-relaxed text-white/70 md:text-left">
            아이디어의 중심을 밝혀,
            <br />
            <strong className="font-semibold text-white">제품으로 완성하는 프로덕트 스튜디오</strong>
          </p>
          <a
            href="#work"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-[#05070d]"
          >
            작업 살펴보기
            <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </LandingContainer>

      <div className="landing-fade-in absolute bottom-8 left-1/2 hidden md:block -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.3em] text-white/40 uppercase" style={{ animationDelay: "calc(var(--landing-intro) + 1100ms)" }}>
        Scroll
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section id="studio" className="relative border-t border-white/10 py-32 sm:py-44">
      <LandingContainer>
        <Reveal className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">00 — Core Luma</Reveal>
        <Reveal delay={100}>
          <h2 className="mt-10 max-w-5xl text-[clamp(2.6rem,6vw,5.8rem)] leading-[1.12] font-semibold tracking-[-0.045em]">
            좋은 제품에는
            <br />
            <span className="text-white/35">빛나는 중심이 있습니다.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          <Reveal delay={200}>
            <p className="font-mono text-sm tracking-[0.2em] text-[#8fd3ff] uppercase">Design · Engineering · Launch</p>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-lg leading-[1.9] text-white/65">
              Core Luma는 두 명의 메이커가 기획, 디자인, 개발, 출시를 한 흐름으로 이어가는 프로덕트 스튜디오입니다.
              흩어진 아이디어를 하나의 중심으로 모으고, 사용자가 실제로 쓰는 제품으로 완성합니다.
            </p>
          </Reveal>
        </div>
      </LandingContainer>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="bg-[#f4f6fb] py-32 text-[#05070d] sm:py-44">
      <LandingContainer>
        <Reveal className="flex items-end justify-between gap-6 border-b border-[#05070d]/15 pb-8">
          <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-[-0.04em]">Core Luma가 일하는 방식</h2>
          <span className="hidden font-mono text-xs tracking-[0.3em] text-[#05070d]/40 uppercase sm:block">How we work</span>
        </Reveal>

        <div className="grid md:grid-cols-3">
          {principles.map((item, index) => (
            <Reveal
              key={item.number}
              delay={index * 120}
              className="border-b border-[#05070d]/15 py-14 md:border-r md:py-12 md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="flex items-center justify-between font-mono text-xs tracking-[0.3em] uppercase">
                <span className="text-[#05070d]/40">{item.number}</span>
                <span className="text-[#3c6dff]">{item.keyword}</span>
              </div>
              <h3 className="mt-10 text-[clamp(1.7rem,2.4vw,2.2rem)] md:mt-16 leading-[1.3] font-semibold tracking-[-0.04em]">
                {item.title[0]}
                <br />
                {item.title[1]}
              </h3>
              <p className="mt-6 text-base leading-[1.85] text-[#05070d]/60">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}

function ServiceSection() {
  return (
    <section id="service" className="py-32 sm:py-44">
      <LandingContainer>
        <Reveal className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">Our Service</Reveal>
        <Reveal delay={100} className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-[clamp(2.6rem,5.4vw,5rem)] leading-[1.12] font-semibold tracking-[-0.045em]">
            제품의 중심부터
            <br />
            함께 설계합니다
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-white/55">아이디어 단계부터 출시 이후까지, 필요한 만큼 함께합니다.</p>
        </Reveal>

        <div className="mt-14 border-t border-white/10 md:mt-20">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={index * 60}>
              <div className="landing-service-row group grid grid-cols-[3rem_1fr_auto] items-center gap-x-4 gap-y-4 border-b border-white/10 px-1 py-8 sm:px-6 md:grid-cols-[4rem_16rem_1fr_auto] md:gap-8">
                <span className="font-mono text-sm opacity-50">{service.number}</span>
                <span className="font-mono text-sm tracking-[0.2em] text-[#8fd3ff] uppercase group-hover:text-[#3c6dff] md:order-none">
                  {service.keyword}
                </span>
                <div className="col-span-2 col-start-2 row-start-2 md:col-span-1 md:col-start-auto md:row-start-auto">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{service.title}</h3>
                  <p className="landing-service-desc mt-2 text-base leading-relaxed text-white/55">{service.description}</p>
                </div>
                <span className="landing-service-arrow col-start-3 row-start-1 flex size-10 items-center justify-center justify-self-end rounded-full md:size-12 border border-current/20 md:col-start-4">
                  <ArrowIcon className="size-5" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="border-t border-white/10 py-32 sm:py-44">
      <LandingContainer>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">Our Work</p>
            <h2 className="landing-serif mt-6 text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-[-0.02em]">Luma Products</h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-white/55">우리가 직접 기획하고, 만들고, 운영하는 서비스입니다.</p>
        </Reveal>

        {/* md+: hovering a panel collapses the others and opens its details. Phones: a swipe row. */}
        <Reveal delay={120}>
          <div className="landing-works landing-work-scroller -mx-7 mt-14 flex snap-x snap-mandatory scroll-px-7 gap-5 overflow-x-auto overflow-y-hidden px-7 pb-2 sm:-mx-10 sm:scroll-px-10 sm:px-10 md:mx-0 md:mt-20 md:h-[32rem] md:snap-none md:gap-0 md:overflow-hidden md:px-0 md:pb-0">
            {works.map((work) => (
              <div key={work.number} className="landing-work-panel w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto md:shrink">
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-[30rem] overflow-hidden rounded-3xl md:h-full"
                >
                  <div
                    className="landing-work-surface absolute inset-0 rounded-3xl"
                    style={{ "--work-glow": work.glow } as CSSProperties}
                    aria-hidden="true"
                  />
                  <div
                    className="landing-work-logo absolute top-14 left-4 size-36 md:top-[4.5rem] md:left-6 md:size-52"
                    style={{ "--work-glow": work.glow } as CSSProperties}
                  >
                    <Image src={work.logo} alt={`${work.name} 로고`} width={240} height={240} className="size-full object-contain"
                      style={{ transform: `scale(${work.logoScale})` }}
                    />
                  </div>

                  <span className="absolute top-7 left-6 font-mono text-sm text-white/50 md:left-8">{work.number}</span>
                  <span className="landing-work-arrow absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-white/90 text-[#05070d] transition group-hover:-rotate-45">
                    <ArrowIcon className="size-5" />
                  </span>

                  <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8">
                    <p className="font-mono text-xs tracking-[0.25em] text-white/45 uppercase">{work.nameEn}</p>
                    <h3 className="mt-2 text-[2rem] leading-tight font-semibold tracking-[-0.04em] whitespace-nowrap text-white md:text-[2.4rem]">
                      {work.name}
                    </h3>
                    <p className="mt-2 text-base text-white/65">{work.category}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/55 md:hidden">{work.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {work.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/65">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="landing-work-detail absolute top-8 right-8 bottom-8 hidden w-[44%] flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:flex">
                    <p className="font-mono text-xs tracking-[0.25em] text-[#8fd3ff] uppercase">About</p>
                    <p className="mt-4 text-base leading-relaxed text-white/85">{work.description}</p>
                    <ul className="mt-6 space-y-3">
                      {work.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                          <SparkleIcon className="mt-0.5 size-3.5 shrink-0 text-[#8fd3ff]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#05070d]">
                      서비스 보러가기
                      <ArrowIcon className="size-4 -rotate-45" />
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </LandingContainer>
    </section>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...keywords, ...keywords];

  return (
    <div className="overflow-hidden py-3">
      <div className="landing-marquee-track" data-reverse={reverse}>
        {items.map((keyword, index) => (
          <span key={`${keyword}-${index}`} className="flex shrink-0 items-center gap-10 pr-10">
            <span
              className={`landing-serif text-[clamp(2.6rem,6vw,5.4rem)] leading-none whitespace-nowrap ${
                reverse ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]" : "text-white"
              }`}
            >
              {keyword}
            </span>
            <span className="size-3 rounded-full bg-gradient-to-br from-[#8fd3ff] to-[#8a7dff]" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C12.6 8.4 15.6 11.4 22 12C15.6 12.6 12.6 15.6 12 22C11.4 15.6 8.4 12.6 2 12C8.4 11.4 11.4 8.4 12 2Z" />
    </svg>
  );
}

function TeamSection() {
  return (
    <section id="team" className="border-t border-white/10 py-28 sm:py-32">
      <div className="space-y-2" aria-hidden="true">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      <LandingContainer className="mt-24 md:mt-32">
        <Reveal className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">Our Team</Reveal>
        <Reveal delay={100} className="mt-8 flex flex-col justify-between gap-6 md:mt-10 md:flex-row md:items-end">
          <h2 className="text-[clamp(2.3rem,5vw,4.6rem)] leading-[1.15] font-semibold tracking-[-0.045em]">
            두 사람이
            <br />
            <span className="text-white/35">처음부터 끝까지 만듭니다</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-white/55 md:text-lg">
            기획과 디자인, 개발과 운영을 나누지 않고 한 테이블에서 이어갑니다.
          </p>
        </Reveal>

        {/* One row per member; the second row mirrors the first (info left, portrait right). */}
        <div className="mt-12 space-y-6 md:mt-14 md:space-y-5">
          {members.map((member, index) => {
            const mirrored = index % 2 === 1;

            return (
              <div
                key={member.code}
                className={`grid gap-4 md:gap-6 ${mirrored ? "md:grid-cols-[2fr_1fr]" : "md:grid-cols-[1fr_2fr]"}`}
              >
                <Reveal className={mirrored ? "md:order-2" : ""}>
                  <div
                    className={`landing-member-portrait relative h-[20rem] overflow-hidden rounded-[1.5rem] md:h-[18rem] ${
                      mirrored ? "rounded-tl-[5rem]" : "rounded-tr-[5rem]"
                    }`}
                  >
                    <div className="relative z-10 p-6 md:p-7">
                      <p className="landing-serif text-[2.2rem] leading-none md:text-[2.4rem]">{member.role}</p>
                      <p className="mt-3 text-sm text-white/65">
                        <span className="font-semibold text-[#8fd3ff]">{member.years}년차</span> · {member.roleKo}
                      </p>
                    </div>

                    {/* Anonymous portrait: head and shoulders silhouette in the member's colors. */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center" aria-hidden="true">
                      <div className={`relative size-20 rounded-full bg-gradient-to-br md:size-[4.5rem] ${member.silhouette}`}>
                        <SparkleIcon className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-white/90 md:size-6" />
                      </div>
                      <div
                        className={`mt-2 h-24 w-[62%] rounded-t-[999px] bg-gradient-to-b opacity-90 md:h-20 md:w-[66%] ${member.silhouette}`}
                      />
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={120} className={mirrored ? "md:order-1" : ""}>
                  <div
                    className={`relative flex h-full flex-col rounded-[1.5rem] p-6 text-[#05070d] md:p-8 ${member.accent} ${
                      mirrored ? "rounded-br-[5rem]" : "rounded-bl-[5rem]"
                    }`}
                  >
                    <div className="flex gap-4">
                      <span className="landing-serif text-[3.2rem] leading-[0.7] text-[#3c6dff]" aria-hidden="true">
                        &ldquo;
                      </span>
                      <p className="text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.3] font-semibold tracking-[-0.04em]">{member.quote}</p>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-[#05070d]/65 md:pl-[3.2rem] md:text-base">{member.intro}</p>

                    <div className={`mt-auto flex flex-col gap-3 pt-6 ${mirrored ? "items-start" : "items-end"}`}>
                      <ul className={`flex flex-wrap gap-2 ${mirrored ? "" : "justify-end"}`}>
                        {member.skills.map((skill) => (
                          <li key={skill} className="rounded-full border border-[#05070d]/15 px-3.5 py-1.5 text-xs font-medium md:text-sm">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </LandingContainer>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="landing-hero relative overflow-hidden border-t border-white/10 py-36 sm:py-48">
      <div className="landing-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <LandingContainer className="relative z-10 text-center">
        <Reveal className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase">Contact</Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 text-[clamp(2.8rem,6.4vw,6rem)] leading-[1.1] font-semibold tracking-[-0.05em]">
            당신의 아이디어,
            <br />
            <span className="landing-gradient-text">그 중심을 함께 밝혀요</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-white/60">
            아직 정리되지 않은 아이디어여도 괜찮습니다. 무엇을 만들고 싶은지부터 함께 이야기해요.
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-base font-semibold md:px-9 md:py-5 text-[#05070d] transition hover:bg-[#bfe4ff]"
          >
            프로젝트 문의하기
            <ArrowIcon className="size-5 transition group-hover:translate-x-1" />
          </a>
        </Reveal>
      </LandingContainer>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-white/10 py-12">
      <LandingContainer className="flex flex-col items-start justify-between gap-6 text-sm text-white/45 md:flex-row md:items-center">
        <div className="flex items-center gap-2.5 text-white/80">
          <Wordmark className="h-5 w-auto text-white/80" />
        </div>
        <p>© {new Date().getFullYear()} Core Luma. All rights reserved.</p>
      </LandingContainer>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="landing-page min-h-screen overflow-hidden">
      <LogoIntro />
      <LandingHeader />
      <HeroSection />
      <StudioSection />
      <PrinciplesSection />
      <ServiceSection />
      <WorkSection />
      <TeamSection />
      <ContactSection />
      <LandingFooter />
    </main>
  );
}
