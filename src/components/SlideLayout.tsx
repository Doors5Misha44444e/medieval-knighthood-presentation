import { CrossOrnament, FleurDeLis, ShieldOrnament, Crown } from "./Ornament";
import type { Slide } from "../data/slides";

interface SlideLayoutProps {
  slide: Slide;
  isActive: boolean;
}

const variantStyles = {
  parchment: {
    wrapper: "parchment-bg text-ink",
    headerAccent: "text-[#7a1f24]",
    label: "text-[#7a1f24] tracking-[0.3em]",
    bullet: "border-[#7a1f24]/40 bg-[#7a1f24]/5",
    bulletDot: "bg-[#7a1f24]",
    highlight: "bg-[#7a1f24] text-parchment",
    ornament: "text-[#b8893a]",
    title: "text-ink",
    subtitle: "text-ink-soft italic",
    imageFrame: "border-[#b8893a]/60 bg-parchment-dark",
  },
  royal: {
    wrapper: "royal-bg text-parchment film-grain relative",
    headerAccent: "text-[#d4a849]",
    label: "text-[#d4a849] tracking-[0.3em]",
    bullet: "border-[#d4a849]/40 bg-[#d4a849]/5",
    bulletDot: "bg-[#d4a849]",
    highlight: "bg-[#d4a849] text-royal-deep",
    ornament: "text-[#d4a849]",
    title: "text-parchment",
    subtitle: "text-parchment-dark italic",
    imageFrame: "border-[#d4a849]/60 bg-royal-deep",
  },
  dark: {
    wrapper: "bg-[#0a0e1a] text-parchment film-grain relative",
    headerAccent: "text-[#b8893a]",
    label: "text-[#b8893a] tracking-[0.3em]",
    bullet: "border-[#b8893a]/30 bg-[#b8893a]/5",
    bulletDot: "bg-[#b8893a]",
    highlight: "bg-[#b8893a] text-[#0a0e1a]",
    ornament: "text-[#b8893a]",
    title: "text-parchment",
    subtitle: "text-[#c9a76b] italic",
    imageFrame: "border-[#b8893a]/50 bg-[#1a1a1a]",
  },
  gold: {
    wrapper: "bg-gradient-to-br from-[#1a2a4a] via-[#0f1a30] to-[#2a1f17] text-parchment film-grain relative",
    headerAccent: "text-[#d4a849]",
    label: "text-[#d4a849] tracking-[0.3em]",
    bullet: "border-[#d4a849]/40 bg-[#d4a849]/10",
    bulletDot: "bg-[#d4a849]",
    highlight: "bg-[#d4a849] text-[#0f1a30]",
    ornament: "text-[#d4a849]",
    title: "text-parchment",
    subtitle: "text-[#c9a76b] italic",
    imageFrame: "border-[#d4a849]/60 bg-[#0f1a30]",
  },
};

export function SlideLayout({ slide, isActive }: SlideLayoutProps) {
  const styles = variantStyles[slide.variant];
  const AnimWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={`${isActive ? "slide-enter" : "opacity-0"} h-full`}>{children}</div>
  );

  const TitleBlock = (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-2">
        <span className={`${styles.label} font-display text-xs font-semibold`}>
          РОЗДІЛ {slide.number}
        </span>
        <div className={`h-px flex-1 max-w-[80px] ${styles.headerAccent.replace("text-", "bg-")}`} style={{ background: "currentColor", opacity: 0.6 }} />
      </div>
      <h2 className={`font-display ${styles.title} text-4xl md:text-5xl font-bold leading-tight tracking-wide`}>
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className={`font-cormorant ${styles.subtitle} text-xl md:text-2xl mt-2 italic font-medium`}>
          {slide.subtitle}
        </p>
      )}
    </div>
  );

  const OrnamentDivider = (
    <div className="ornate-divider my-4">
      <FleurDeLis className={`${styles.ornament} w-6 h-6 opacity-80`} />
    </div>
  );

  const BulletList = (
    <ul className="space-y-3">
      {slide.bullets.map((b, i) => (
        <li key={i} className={`flex gap-3 p-3 rounded-sm border-l-2 ${styles.bullet}`}>
          <div className="flex-shrink-0 mt-1">
            <CrossOrnament className={`${styles.ornament} w-4 h-4`} />
          </div>
          <div className="flex-1 min-w-0">
            {b.label && (
              <span className={`font-display ${styles.headerAccent} text-xs font-bold uppercase tracking-widest block mb-0.5`}>
                {b.label}
              </span>
            )}
            <p className="font-serif text-[15px] md:text-[16px] leading-relaxed">
              {b.text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );

  const TimelineBlock = slide.timeline ? (
    <div className={`mt-5 border-t ${styles.bullet.replace("border-l-2", "border-t")} pt-4`}>
      <div className={`${styles.label} font-display text-[10px] font-bold mb-2`}>TIMELINE</div>
      <div className="grid grid-cols-4 gap-2">
        {slide.timeline.map((t, i) => (
          <div key={i} className="text-center">
            <div className={`font-display ${styles.headerAccent} text-sm font-bold`}>{t.period}</div>
            <div className="font-cormorant text-[11px] opacity-80 leading-tight mt-1">{t.event}</div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  const HighlightBlock = slide.highlight ? (
    <div className={`mt-4 p-4 ${styles.highlight} rounded-sm border-2 border-black/10`}>
      <div className="font-display text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">
        {slide.highlight.title}
      </div>
      <div className="font-cormorant italic text-base md:text-lg leading-snug">
        {slide.highlight.text}
      </div>
    </div>
  ) : null;

  const ImageBlock = slide.image ? (
    <div className={`relative border-2 ${styles.imageFrame} p-2 shadow-2xl`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={slide.image}
          alt={slide.imageCaption || slide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/20 pointer-events-none" />
      </div>
      {slide.imageCaption && (
        <div className={`mt-2 px-1 font-cormorant italic text-xs ${styles.subtitle} text-center`}>
          {slide.imageCaption}
        </div>
      )}
      {/* Corner ornaments */}
      <div className={`absolute -top-3 -left-3 ${styles.ornament}`}>
        <ShieldOrnament className="w-6 h-7" />
      </div>
      <div className={`absolute -bottom-3 -right-3 ${styles.ornament}`}>
        <ShieldOrnament className="w-6 h-7" />
      </div>
    </div>
  ) : null;

  return (
    <AnimWrapper>
      <div className={`${styles.wrapper} h-full w-full overflow-hidden p-6 md:p-10`}>
        {/* Decorative corner flourishes */}
        <div className={`absolute top-4 left-4 ${styles.ornament} opacity-50 hidden md:block`}>
          <CrossOrnament className="w-12 h-12" />
        </div>
        <div className={`absolute top-4 right-4 ${styles.ornament} opacity-50 hidden md:block`}>
          <CrossOrnament className="w-12 h-12" />
        </div>
        <div className={`absolute bottom-4 left-4 ${styles.ornament} opacity-50 hidden md:block`}>
          <Crown className="w-10 h-6" />
        </div>
        <div className={`absolute bottom-4 right-4 ${styles.ornament} opacity-50 hidden md:block`}>
          <Crown className="w-10 h-6" />
        </div>

        <div className="relative z-10 h-full grid md:grid-cols-5 gap-6 md:gap-8">
          {/* Left content column */}
          <div className="md:col-span-3 flex flex-col h-full overflow-hidden">
            {TitleBlock}
            {OrnamentDivider}
            <div className="flex-1 overflow-y-auto custom-scroll pr-2">
              {BulletList}
              {HighlightBlock}
              {TimelineBlock}
            </div>
          </div>

          {/* Right image column */}
          <div className="md:col-span-2 flex items-center justify-center">
            {ImageBlock}
          </div>
        </div>
      </div>
    </AnimWrapper>
  );
}