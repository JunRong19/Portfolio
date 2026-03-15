import { useEffect, useRef, useState } from "react";
import { THEME_KEY } from "../data/content";

export function useTheme(defaultTheme = "dark") {
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : defaultTheme;
  });
  const transitionTimerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  useEffect(() => () => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  return { theme, toggleTheme };
}
