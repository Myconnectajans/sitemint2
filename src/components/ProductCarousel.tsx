"use client";
import React, { useEffect, useRef } from "react";

export type ProductCard = {
  title: string;
  href: string;
  image: string;
  quantity: string;
  oldPrice: string;
  price: string;
};

export default function ProductCarousel({
  title,
  items,
  autoMs = 4000,
  cardWidth = 320,
}: {
  title: string;
  items: ProductCard[];
  autoMs?: number;
  cardWidth?: number;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const next = () => {
    const el = scroller.current;
    if (!el) return;
    if (Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    }
  };
  const prev = () => {
    const el = scroller.current;
    if (!el) return;
    if (el.scrollLeft === 0) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -(cardWidth + 20), behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (autoMs <= 0) return;
    const id = setInterval(next, autoMs);
    return () => clearInterval(id);
  }, [autoMs]);

  return (
    <section className="relative">
      <div className="mb-3 text-xl font-semibold">{title}</div>
      <div className="relative">
        <div
          ref={scroller}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          style={{scrollbarWidth:"none"} as any}
        >
          {items.map((p, i) => (
            <a
              key={i}
              href={p.href}
              className="snap-start"
              style={{ minWidth: cardWidth, maxWidth: cardWidth }}
              aria-label={p.title}
            >
              <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
                <div className="flex aspect-[8/6] items-center justify-center rounded-md bg-white">
                  <img src={p.image} alt={p.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="mt-3">
                  <div className="line-clamp-2 text-base">{p.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{p.quantity}</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm text-slate-400 line-through">{p.oldPrice}</span>
                    <span className="text-lg font-semibold">{p.price}</span>
                    <span className="text-xs text-slate-500">+KDV</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-[-12px] top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow"
          aria-label="Önceki"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-[-12px] top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow"
          aria-label="Sonraki"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
