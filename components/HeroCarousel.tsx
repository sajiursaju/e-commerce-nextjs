"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/config/site";

const INTERVAL = 5000; // ms between slides

export default function HeroCarousel() {
  const slides = heroSlides ?? [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  // Auto-advance. The timer restarts whenever the slide changes.
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused, index, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div
        className="group relative overflow-hidden rounded-2xl"
        aria-roledescription="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const diff = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(diff) > 50) go(index + (diff < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className={`relative flex h-56 min-w-full items-center bg-gradient-to-r sm:h-72 lg:h-96 ${s.gradient}`}
              aria-hidden={i !== index}
            >
              {s.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}
              {s.image && <div className="absolute inset-0 bg-black/35" />}

              <div className="relative max-w-xl px-6 text-white sm:px-12">
                <h2 className="text-2xl font-bold sm:text-4xl lg:text-5xl">{s.title}</h2>
                <p className="mt-2 text-sm sm:text-lg">{s.subtitle}</p>
                <Link
                  href={s.href}
                  tabIndex={i === index ? 0 : -1}
                  className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                >
                  {s.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-900 opacity-0 transition hover:bg-white group-hover:opacity-100 sm:block"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-900 opacity-0 transition hover:bg-white group-hover:opacity-100 sm:block"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}