import type { ComponentPropsWithoutRef } from "react";
import { wordmarkLetters, wordmarkSparkle, wordmarkViewBox } from "./wordmark-paths";

type WordmarkProps = ComponentPropsWithoutRef<"svg"> & {
  animated?: boolean;
};

export function Wordmark({ animated = false, className = "", ...props }: WordmarkProps) {
  return (
    <svg
      viewBox={wordmarkViewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Core Luma"
      className={`${animated ? "landing-wordmark-animated" : ""} ${className}`}
      {...props}
    >
      {wordmarkLetters.map((letter, index) => (
        <path
          key={letter.char + index}
          className="landing-wordmark-letter"
          style={{ animationDelay: `${180 + index * 90}ms` }}
          d={letter.d}
          fill="currentColor"
          fillRule={letter.evenOdd ? "evenodd" : undefined}
          clipRule={letter.evenOdd ? "evenodd" : undefined}
        />
      ))}
      <path className="landing-wordmark-sparkle" d={wordmarkSparkle.d} fill="currentColor" />
    </svg>
  );
}
