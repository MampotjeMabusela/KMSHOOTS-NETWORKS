"use client";

import {
  useRef,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "div";
};

function canTilt() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function TiltCard({
  children,
  className = "",
  onClick,
  as = "button",
}: TiltCardProps) {
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLElement>) {
    if (!canTilt()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 12;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  }

  const shared = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `tilt-card shine-sweep ${className}`,
  };

  if (as === "div") {
    return (
      <div ref={ref as RefObject<HTMLDivElement>} {...shared}>
        {children}
      </div>
    );
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...shared}
    >
      {children}
    </button>
  );
}
