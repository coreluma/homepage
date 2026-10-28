"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

type RevealProps = ComponentPropsWithoutRef<"div"> & {
  delay?: number;
};

export function Reveal({ delay = 0, className = "", style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Replays every time the element scrolls back into view. It only resets once fully
    // out of view, so the offset of the hidden state can't make it flicker at the edge.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.18) {
          node.dataset.visible = "true";
        } else if (!entry.isIntersecting) {
          node.dataset.visible = "false";
        }
      },
      { threshold: [0, 0.18] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`landing-reveal ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...props}
    />
  );
}
