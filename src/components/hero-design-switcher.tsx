"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { HeroSectionGradient } from "@/components/hero-section-gradient";
import { HeroSectionLuma } from "@/components/hero-section-luma";

type HeroOption = 1 | 2;

export function HeroDesignSwitcher() {
  const [option, setOption] = useState<HeroOption>(1);

  return (
    <>
      {option === 1 ? (
        <>
          <Header />
          <HeroSectionGradient />
        </>
      ) : (
        <HeroSectionLuma />
      )}

      <aside
        className="fixed bottom-5 left-5 z-[100] flex items-center gap-1 rounded-full border border-white/70 bg-[#10264a]/80 p-1.5 text-xs font-semibold text-white shadow-[0_14px_45px_rgba(15,45,90,0.3)] backdrop-blur-xl"
        aria-label="Hero design options"
      >
        <span className="pl-2.5 pr-1 text-[0.62rem] tracking-[0.12em] text-white/65 uppercase">Hero</span>
        {([1, 2] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setOption(item)}
            className={`size-9 rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              option === item ? "bg-white text-[#173a78] shadow-sm" : "text-white/75 hover:bg-white/15 hover:text-white"
            }`}
            aria-pressed={option === item}
            aria-label={`Hero design option ${item}`}
          >
            {item}
          </button>
        ))}
      </aside>
    </>
  );
}
