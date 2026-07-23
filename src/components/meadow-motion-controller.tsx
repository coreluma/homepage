"use client";

import { useEffect } from "react";

export function MeadowMotionController() {
  useEffect(() => {
    const hero = document.getElementById("top");

    if (!hero) {
      return;
    }

    hero.dataset.motionReady = "true";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    let frame = 0;

    const updateMotion = () => {
      frame = 0;

      if (reducedMotion.matches || !mobileViewport.matches) {
        hero.style.setProperty("--meadow-parallax", "0px");
        return;
      }

      const distance = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), 720);
      hero.style.setProperty("--meadow-parallax", `${distance}px`);
    };

    const requestMotionUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(updateMotion);
      }
    };

    updateMotion();
    window.addEventListener("scroll", requestMotionUpdate, { passive: true });
    window.addEventListener("resize", requestMotionUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestMotionUpdate);
      window.removeEventListener("resize", requestMotionUpdate);
      delete hero.dataset.motionReady;
    };
  }, []);

  return null;
}
