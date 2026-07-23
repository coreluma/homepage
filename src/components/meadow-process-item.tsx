"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type MeadowProcessItemProps = {
  children: ReactNode;
  className?: string;
  index: number;
};

export function MeadowProcessItem({
  children,
  className = "",
  index,
}: MeadowProcessItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const initialScrollY = window.scrollY;

    const updateVisibility = () => {
      frame = 0;
      setIsMounted(true);

      if (Math.abs(window.scrollY - initialScrollY) < 1) {
        return;
      }

      const item = itemRef.current;

      if (!item) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const viewportHeight = document.documentElement.clientHeight;
      setIsFallbackVisible(rect.top < viewportHeight - 60 && rect.bottom > 60);
    };

    const requestVisibilityUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(updateVisibility);
      }
    };

    frame = requestAnimationFrame(() => {
      frame = 0;
      setIsMounted(true);
    });

    window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestVisibilityUpdate);
    };
  }, []);

  if (!isMounted) {
    return (
      <div ref={itemRef} className={`meadow-process-item ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={itemRef}
      className={`meadow-process-item ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isFallbackVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {children}
    </motion.div>
  );
}
