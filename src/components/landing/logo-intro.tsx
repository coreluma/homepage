"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./wordmark";

const INTRO_DURATION = 2600;
const EXIT_DURATION = 900;

export function LogoIntro() {
  const [phase, setPhase] = useState<"playing" | "leaving" | "done">("playing");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const leaveAt = reduceMotion ? 300 : INTRO_DURATION;

    document.documentElement.style.overflow = "hidden";
    const leaveTimer = window.setTimeout(() => setPhase("leaving"), leaveAt);
    const doneTimer = window.setTimeout(() => setPhase("done"), leaveAt + EXIT_DURATION);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "playing") document.documentElement.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className="landing-intro fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-black"
      data-leaving={phase === "leaving"}
      onClick={() => setPhase("leaving")}
      aria-hidden="true"
    >
      <div className="landing-intro-glow pointer-events-none absolute size-[60vmin] rounded-full" />
      <Wordmark animated className="relative w-[min(72vw,30rem)] text-white" />
      <span className="landing-intro-caption mt-8 font-mono text-[0.7rem] tracking-[0.5em] text-white/50 uppercase">
        Product Studio
      </span>
    </div>
  );
}
