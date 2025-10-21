"use client";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      className="
        self-start flex items-center justify-center
        w-auto h-9 px-3
        bg-[var(--accent-dark)]/50 rounded-full
        shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),0_2px_4px_rgba(255,255,255,0.05)]
        hover:shadow-inner hover:shadow-black/30 hover:bg-[var(--accent-dark)]/20
        transition-all duration-200
      "
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <img className="w-6 h-6" src="/up-double.svg" alt="To Top" />
    </button>
  );
}
