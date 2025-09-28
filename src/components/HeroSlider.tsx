"use client";
import React, { useEffect, useRef, useState } from "react";

type Slide = {
  image: string;
  href: string;
  alt?: string;
  mobileImage?: string;
};

export default function HeroSlider({
  slides,
  aspect = "aspect-[7/2]",
  autoMs = 5000,
}: {
  slides: Slide[];
  aspect?: string;
  autoMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const wrap = (i: number) => (i + slides.length) % slides.length;
  const go = (i: number) => setIndex(wrap(i));
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    if (autoMs <= 0) return;
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((i) => wrap(i + 1));
    }, autoMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [autoMs, slides.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#E2F2F9]/50">
      <div className={`relative ${aspect}`}>
        {slides.map((s, i) => (
          <a
            key={i}
            href={s.href}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-label={s.alt || `slide-${i + 1}`}
          >
            <picture>
              {s.mobileImage && (
                <source media="(max-width: 768px)" srcSet={s.mobileImage} />
              )}
              <img
                src={s.image}
                alt={s.alt || ""}
                className="h-full w-full object-contain"
              />
            </picture>
          </a>
        ))}
      </div>

      {/* Arrows */}
      <button
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow md:left-4"
        onClick={prev}
        aria-label="Önceki"
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow md:right-4"
        onClick={next}
        aria-label="Sonraki"
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
