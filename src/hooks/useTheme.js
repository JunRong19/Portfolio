import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { THEME_KEY } from "../data/content";

export function useTheme(defaultTheme = "dark") {
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : defaultTheme;
  });
  const transitionTimerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = (event) => {
    if (isAnimatingRef.current) {
      return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const supportsViewTransitions = typeof document.startViewTransition === "function";

    if (!prefersReducedMotion && supportsViewTransitions) {
      const targetRect = event?.currentTarget?.getBoundingClientRect?.();
      const originX = targetRect ? targetRect.left + targetRect.width / 2 : window.innerWidth / 2;
      const originY = targetRect ? targetRect.top + targetRect.height / 2 : window.innerHeight / 2;
      const revealRadius = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY),
      );

      root.style.setProperty("--theme-reveal-x", `${originX}px`);
      root.style.setProperty("--theme-reveal-y", `${originY}px`);
      root.style.setProperty("--theme-reveal-radius", `${revealRadius}px`);
      root.classList.add("theme-reveal-active");
      isAnimatingRef.current = true;

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
        });
      });

      transition.finished.finally(() => {
        root.classList.remove("theme-reveal-active");
        root.style.removeProperty("--theme-reveal-x");
        root.style.removeProperty("--theme-reveal-y");
        root.style.removeProperty("--theme-reveal-radius");
        isAnimatingRef.current = false;
      });
      return;
    }

    if (!prefersReducedMotion) {
      document.documentElement.classList.add("theme-transition");
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
      transitionTimerRef.current = window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
        transitionTimerRef.current = null;
      }, 320);
    }

    setTheme(nextTheme);
  };

  useEffect(() => () => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    document.documentElement.classList.remove("theme-reveal-active");
    document.documentElement.style.removeProperty("--theme-reveal-x");
    document.documentElement.style.removeProperty("--theme-reveal-y");
    document.documentElement.style.removeProperty("--theme-reveal-radius");
    isAnimatingRef.current = false;
  }, []);

  return { theme, toggleTheme };
}
