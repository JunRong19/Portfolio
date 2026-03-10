import { useEffect, useState } from "react";

export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnWide = () => {
      if (window.innerWidth > 820) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeOnWide);
    return () => window.removeEventListener("resize", closeOnWide);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((state) => !state);

  return { isOpen, closeMenu, toggleMenu };
}
