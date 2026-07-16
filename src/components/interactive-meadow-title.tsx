"use client";

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
      className="interactive-meadow-title"
      style={initialStyle}
    >
      <span className="interactive-meadow-title-glow" aria-hidden="true" />
      <span className="interactive-meadow-title-ray" aria-hidden="true" />
      <h1 className="luma-title meadow-title text-[clamp(5rem,10vw,9.6rem)] leading-[0.82] font-normal tracking-[-0.065em]">
        Core Luma
      </h1>
    </div>
  );
}
