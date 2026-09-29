import { Crown, CrossOrnament, FleurDeLis, ShieldOrnament } from "./Ornament";

interface TitleSlideProps {
  isActive: boolean;
}

export function TitleSlide({ isActive }: TitleSlideProps) {
  return (
    <div className={`${isActive ? "slide-enter" : "opacity-0"} h-full`}>
      <div className="royal-bg film-grain relative h-full w-full overflow-hidden flex items-center justify-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/slide1-knights.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1a30]/80 via-[#1a2a4a]/70 to-[#0f1a30]/90" />
        </div>

        {/* Decorative corner ornaments */}
        <div className="absolute top-6 left-6 text-[#d4a849]/70">
          <CrossOrnament className="w-16 h-16" />
        </div>
        <div className="absolute top-6 right-6 text-[#d4a849]/70">
          <CrossOrnament className="w-16 h-16" />
        </div>
        <div className="absolute bottom-6 left-6 text-[#d4a849]/70">
          <ShieldOrnament className="w-12 h-14" />
        </div>
        <div className="absolute bottom-6 right-6 text-[#d4a849]/70">
          <ShieldOrnament className="w-12 h-14" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Top flourish */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a849]" />
            <Crown className="w-12 h-8 text-[#d4a849]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a849]" />
          </div>

          <div className="font-display text-[#d4a849] tracking-[0.4em] text-xs md:text-sm mb-4">
            ПРЕЗЕНТАЦІЯ З СЕРЕДНЬОВІЧНОЇ ІСТОРІЇ
          </div>

          <h1 className="font-display text-parchment text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-wide mb-4">
            ЛИЦАРСТВО
          </h1>

          <div className="flex items-center justify-center gap-3 my-6">
            <FleurDeLis className="w-6 h-6 text-[#d4a849]" />
            <div className="font-cormorant italic text-[#c9a76b] text-xl md:text-2xl">
              в Західній Європі
            </div>
            <FleurDeLis className="w-6 h-6 text-[#d4a849]" />
          </div>

          <div className="font-display text-[#d4a849]/90 tracking-[0.2em] text-sm md:text-base mb-10">
            СЕРЕДНЬОВІЧНА ДОБА
          </div>

          {/* Bottom flourish */}
          <div className="ornate-divider mt-12">
            <ShieldOrnament className="w-8 h-10 text-[#d4a849]" />
          </div>

          <div className="mt-8 font-cormorant italic text-[#c9a76b]/80 text-sm md:text-base">
            Від феодального стремена до порохового диму — подорож крізь сім розділів
          </div>
        </div>
      </div>
    </div>
  );
}