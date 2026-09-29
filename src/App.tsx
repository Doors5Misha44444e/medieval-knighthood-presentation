import { useState, useEffect, useCallback } from "react";
import { slides } from "./data/slides";
import { SlideLayout } from "./components/SlideLayout";
import { TitleSlide } from "./components/TitleSlide";
import { Crown, FleurDeLis, CrossOrnament } from "./components/Ornament";

const TOTAL = slides.length + 1; // includes title slide

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(TOTAL - 1, index)));
  }, []);

  const next = useCallback(() => {
    setCurrentSlide((s) => Math.min(TOTAL - 1, s + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(TOTAL - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, goTo]);

  const slideLabel = currentSlide === 0 ? "Prologue" : `Chapter ${slides[currentSlide - 1].number}`;
  const slideTitle = currentSlide === 0 ? "Title" : slides[currentSlide - 1].title;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0a0e1a] text-parchment overflow-hidden">
      {/* Top bar */}
      <header className="flex-shrink-0 h-14 px-4 md:px-6 flex items-center justify-between border-b border-[#b8893a]/30 bg-[#0f1a30]/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <Crown className="w-6 h-4 text-[#d4a849]" />
          <div className="font-display text-[#d4a849] text-sm md:text-base font-bold tracking-widest hidden sm:block">
            ЛИЦАРСТВО В ЗАХІДНІЙ ЄВРОПІ
          </div>
          <div className="font-display text-[#d4a849] text-sm font-bold tracking-widest sm:hidden">
            ЛИЦАРСТВО
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <FleurDeLis className="w-5 h-5 text-[#d4a849] hidden md:block" />
          <div className="font-cormorant italic text-[#c9a76b] text-xs md:text-sm">
            <span className="text-[#d4a849] font-bold not-italic font-display">{slideLabel}</span>
            <span className="mx-2 opacity-50">·</span>
            <span className="hidden md:inline">{slideTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="font-display text-[#d4a849] text-sm font-bold">
            <span className="text-[#d4a849]">{String(currentSlide + 1).padStart(2, "0")}</span>
            <span className="opacity-50"> / </span>
            <span className="opacity-70">{String(TOTAL).padStart(2, "0")}</span>
          </div>
          <CrossOrnament className="w-5 h-5 text-[#d4a849] hidden md:block" />
        </div>
      </header>

      {/* Slide area */}
      <main className="flex-1 relative overflow-hidden">
        {/* Render all slides stacked; only active is interactive visually */}
        {currentSlide === 0 ? (
          <TitleSlide isActive={true} />
        ) : (
          slides.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-300 ${
                idx + 1 === currentSlide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <SlideLayout slide={s} isActive={idx + 1 === currentSlide} />
            </div>
          ))
        )}

        {/* Navigation arrows */}
        <button
          onClick={prev}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
          className="btn-medieval absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0f1a30]/80 border border-[#d4a849]/60 text-[#d4a849] hover:bg-[#d4a849] hover:text-[#0f1a30] disabled:opacity-20 disabled:cursor-not-allowed transition-colors flex items-center justify-center backdrop-blur"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={next}
          disabled={currentSlide === TOTAL - 1}
          aria-label="Next slide"
          className="btn-medieval absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0f1a30]/80 border border-[#d4a849]/60 text-[#d4a849] hover:bg-[#d4a849] hover:text-[#0f1a30] disabled:opacity-20 disabled:cursor-not-allowed transition-colors flex items-center justify-center backdrop-blur"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </main>

      {/* Bottom navigation bar */}
      <footer className="flex-shrink-0 h-16 px-4 md:px-6 flex items-center justify-between border-t border-[#b8893a]/30 bg-[#0f1a30]/80 backdrop-blur gap-4">
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
          <button
            onClick={() => goTo(0)}
            className={`h-2 transition-all rounded-sm ${
              currentSlide === 0
                ? "w-8 bg-[#d4a849]"
                : "w-2 bg-[#d4a849]/40 hover:bg-[#d4a849]/70"
            }`}
            aria-label="Go to title"
          />
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i + 1)}
              className={`h-2 transition-all rounded-sm ${
                currentSlide === i + 1
                  ? "w-8 bg-[#d4a849]"
                  : "w-2 bg-[#d4a849]/40 hover:bg-[#d4a849]/70"
              }`}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              title={s.title}
            />
          ))}
        </div>

        {/* Help / keyboard hint */}
        <div className="font-cormorant italic text-[#c9a76b] text-xs hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <kbd className="font-display text-[10px] px-1.5 py-0.5 border border-[#d4a849]/50 rounded text-[#d4a849] bg-[#0f1a30]">←</kbd>
            <kbd className="font-display text-[10px] px-1.5 py-0.5 border border-[#d4a849]/50 rounded text-[#d4a849] bg-[#0f1a30]">→</kbd>
            <span>navigate</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="font-display text-[10px] px-1.5 py-0.5 border border-[#d4a849]/50 rounded text-[#d4a849] bg-[#0f1a30]">space</kbd>
            <span>next</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="font-display text-[#d4a849] text-xs tracking-widest hidden sm:block">ПРОГРЕС</div>
          <div className="w-24 md:w-40 h-1.5 bg-[#1a2a4a] rounded-full overflow-hidden border border-[#b8893a]/30">
            <div
              className="h-full bg-gradient-to-r from-[#b8893a] via-[#d4a849] to-[#d4a849] transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / TOTAL) * 100}%` }}
            />
          </div>
          <div className="font-display text-[#d4a849] text-xs font-bold">
            {Math.round(((currentSlide + 1) / TOTAL) * 100)}%
          </div>
        </div>
      </footer>
    </div>
  );
}