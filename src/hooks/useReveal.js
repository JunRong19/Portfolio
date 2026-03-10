import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      document.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const targets = document.querySelectorAll("[data-reveal]");
    targets.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);
}
