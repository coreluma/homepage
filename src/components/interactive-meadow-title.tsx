"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type TitleStyle = React.CSSProperties & {
  "--title-x"?: string;
  "--title-y"?: string;
  "--title-rotate-x"?: string;
  "--title-rotate-y"?: string;
  "--title-glow-x"?: string;
  "--title-glow-y"?: string;
  "--title-ray-x"?: string;
  "--title-ray-y"?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function InteractiveMeadowTitle() {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;

    const hero = document.getElementById("top");

    const handlePointerMove = (event: PointerEvent) => {
      if (!hero) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      targetRef.current.x = clamp(x, -1, 1);
      targetRef.current.y = clamp(y, -1, 1);
    };

    const resetPointer = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    const tick = () => {
      const root = rootRef.current;

      if (root) {
        const current = currentRef.current;
        const target = targetRef.current;

        current.x += (target.x - current.x) * 0.095;
        current.y += (target.y - current.y) * 0.095;

        root.style.setProperty("--title-x", `${current.x * 14}px`);
        root.style.setProperty("--title-y", `${current.y * 10}px`);
        root.style.setProperty("--title-rotate-x", `${current.y * -11}deg`);
        root.style.setProperty("--title-rotate-y", `${current.x * 11}deg`);
        root.style.setProperty("--title-glow-x", `${current.x * -22}px`);
        root.style.setProperty("--title-glow-y", `${current.y * -16}px`);
        root.style.setProperty("--title-ray-x", `${current.x * 8}px`);
        root.style.setProperty("--title-ray-y", `${current.y * 7}px`);
      }

      frame = requestAnimationFrame(tick);
    };

    hero?.addEventListener("pointermove", handlePointerMove);
    hero?.addEventListener("pointerleave", resetPointer);
    window.addEventListener("blur", resetPointer);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      hero?.removeEventListener("pointermove", handlePointerMove);
      hero?.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("blur", resetPointer);
    };
  }, []);

  const initialStyle: TitleStyle = {
    "--title-x": "0px",
    "--title-y": "0px",
    "--title-rotate-x": "0deg",
    "--title-rotate-y": "0deg",
    "--title-glow-x": "0px",
    "--title-glow-y": "0px",
    "--title-ray-x": "0px",
    "--title-ray-y": "0px",
  };

  return (
    <div
      ref={rootRef}
      className="interactive-meadow-title min-h-auto min-w-full px-0 pt-18 pb-1 md:min-h-[clamp(11rem,20vw,18rem)] md:min-w-[min(92vw,58rem)] md:px-10 md:pt-14 md:pb-[2.4rem]"
      style={initialStyle}
    >
      <span className="interactive-meadow-title-glow h-36 w-[110%] blur-[18px] md:h-[clamp(9rem,19vw,15.5rem)] md:w-[min(82vw,54rem)] md:blur-[22px]" aria-hidden="true" />
      <span className="interactive-meadow-title-ray h-18 w-[92%] blur-[14px] md:h-[clamp(5rem,9vw,8rem)] md:w-[min(74vw,47rem)] md:blur-[16px]" aria-hidden="true" />
      <h1 className="luma-title meadow-title h-[clamp(9rem,44vw,11.5rem)] w-[min(82vw,27rem)] font-normal md:h-[clamp(8rem,18vw,16rem)] md:w-[min(72vw,58rem)]">
        <Image
          src="/images/logo/coreluma-glitter-logo.svg"
          alt=""
          width={1700}
          height={1700}
          priority
          className="pointer-events-none absolute top-1/2 left-1/2 w-full max-w-none -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_3px_0_rgba(255,255,255,0.55))_drop-shadow(0_16px_28px_rgba(44,96,164,0.18))_drop-shadow(0_0_20px_rgba(255,255,255,0.18))] md:hidden"
          aria-hidden="true"
        />
        <Image
          src="/images/logo/coreluma-glitter-logo-flat.svg"
          alt=""
          width={1700}
          height={1700}
          priority
          className="pointer-events-none absolute top-1/2 left-1/2 hidden w-full max-w-none -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_5px_0_#dfecf9)_drop-shadow(0_16px_28px_rgba(44,96,164,0.18))_drop-shadow(0_0_20px_rgba(255,255,255,0.18))] md:block"
          aria-hidden="true"
        />
        <span className="sr-only">Core Luma</span>
      </h1>
    </div>
  );
}
