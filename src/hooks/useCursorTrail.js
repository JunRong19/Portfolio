import { useEffect } from "react";

export function useCursorTrail(layerRef, config) {
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

    if (reducedMotion || isTouchDevice) {
      return;
    }

    const active = [];
    const pool = [];
    let lastSpawn = 0;
    let rafId = 0;

    const createDot = () => {
      const el = document.createElement("span");
      el.className = "trail-dot";
      layer.appendChild(el);
      return { el, x: 0, y: 0, birth: 0, life: config.dotLifeMs, size: 0 };
    };

    const hideDot = (dot) => {
      dot.el.style.opacity = "0";
      dot.el.style.transform = "translate3d(-999px, -999px, 0)";
      pool.push(dot);
    };

    const spawnDot = (x, y, now) => {
      const dot = pool.pop() || createDot();
      dot.x = x;
      dot.y = y;
      dot.birth = now;
      dot.life = config.dotLifeMs;
      dot.size = config.dotSizeRange[0] + Math.random() * (config.dotSizeRange[1] - config.dotSizeRange[0]);

      dot.el.style.width = `${dot.size}px`;
      dot.el.style.height = `${dot.size}px`;
      dot.el.style.opacity = "1";

      active.push(dot);

      if (active.length > config.maxDots) {
        const oldest = active.shift();
        hideDot(oldest);
      }
    };

    const onPointerMove = (event) => {
      const now = performance.now();
      if (now - lastSpawn < config.spawnIntervalMs) {
        return;
      }
      lastSpawn = now;
      spawnDot(event.clientX, event.clientY, now);
    };

    const tick = (now) => {
      for (let index = active.length - 1; index >= 0; index -= 1) {
        const dot = active[index];
        const elapsed = now - dot.birth;

        if (elapsed >= dot.life) {
          active.splice(index, 1);
          hideDot(dot);
          continue;
        }

        const progress = elapsed / dot.life;
        const drift = progress * 10;

        dot.el.style.opacity = `${1 - progress}`;
        dot.el.style.transform = `translate3d(${dot.x - drift}px, ${dot.y - drift}px, 0) scale(${1 - progress * 0.35})`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(rafId);
      [...active, ...pool].forEach((dot) => dot.el.remove());
      layer.innerHTML = "";
    };
  }, [config, layerRef]);
}
