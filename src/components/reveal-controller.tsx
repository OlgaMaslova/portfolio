"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STAGGER_MS = 80;
const STAGGER_CAP = 5;
const FAILSAFE_MS = 4000;

/**
 * Drives every `data-reveal` element: fade and rise on intersection, staggered
 * between siblings. Mounted once in the layout; re-runs on navigation.
 *
 * The hidden state lives behind `.reveal-ready`, which the boot script adds —
 * so if this never runs, nothing is left invisible. A failsafe reveals
 * everything after 4s regardless of intersection.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (els.length === 0) return;

    const reveal = (el: HTMLElement) => el.classList.add("is-revealed");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    // Stagger is counted among data-reveal siblings, not document order, so
    // each group animates on its own clock.
    const seen = new Map<Element | null, number>();
    for (const el of els) {
      const index = seen.get(el.parentElement) ?? 0;
      seen.set(el.parentElement, index + 1);
      el.style.transitionDelay = `${Math.min(index, STAGGER_CAP) * STAGGER_MS}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    els.forEach((el) => observer.observe(el));

    const failsafe = window.setTimeout(() => els.forEach(reveal), FAILSAFE_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
