"use client";

import { useEffect } from "react";

export function MeadowMotionController() {
  useEffect(() => {
    const hero = document.getElementById("top");
    const items = hero?.querySelectorAll<HTMLElement>(".meadow-process-item");

    if (!hero || !items) {
      return;
    }

    hero.dataset.motionReady = "true";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    let frame = 0;

    const updateParallax = () => {
      frame = 0;

      if (reducedMotion.matches || !mobileViewport.matches) {
        hero.style.setProperty("--meadow-parallax", "0px");
        return;
      }

      const distance = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), 720);
      hero.style.setProperty("--meadow-parallax", `${distance}px`);
    };

    const requestParallaxUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(updateParallax);
      }
    };

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            itemObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.01 },
    );

    items.forEach((item) => itemObserver.observe(item));
    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      cancelAnimationFrame(frame);
      itemObserver.disconnect();
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);
      delete hero.dataset.motionReady;
    };
  }, []);

  return null;
}
