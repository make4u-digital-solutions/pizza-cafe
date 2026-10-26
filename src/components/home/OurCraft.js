"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, CheckCircle2 } from "lucide-react";

export default function OurCraft() {
  const craftPoints = [
    "48-hour cold fermentation yielding deep aroma and easily digestible crusts.",
    "Stoneground organic flour blended with wild mother sourdough starter.",
    "Hand-crushed San Marzano D.O.P. tomatoes picked from volcanic soils.",
    "Fired in our custom 450°C Italian refractory stone oven in under 90 seconds.",
  ];

  return (
    <section className="py-24 bg-[#FFF7EA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Chef and Stone Hearth Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-16/11">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
                alt="Artisan Pizza Dough Crafting at FORNO"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Overlapping smaller image */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=400&q=80"
                alt="Wood-fired stone oven"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>

            {/* Hearth Badge */}
            <div className="absolute top-6 left-6 bg-[#24201E]/90 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#C83224] flex items-center justify-center text-white">
                <Flame className="w-4 h-4 fill-current" />
              </span>
              <div>
                <p className="text-[10px] text-[#E8D5B8] uppercase font-bold tracking-wider">
                  The Hearth
                </p>
                <p className="text-xs font-bold">450°C Stone Oven</p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full">
              Heritage & Craftsmanship
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#24201E] tracking-tight leading-tight">
              Good Pizza Starts Long Before the First Bite.
            </h2>

            <p className="text-[#746B63] text-sm sm:text-base leading-relaxed">
              At FORNO, making pizza is not a fast-food assembly line; it is an obsession with time, temperature, and provenance. We cultivate a wild sourdough culture fed daily, paired with unbleached heritage flour and pristine spring water.
            </p>

            <div className="space-y-3 pt-2">
              {craftPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4D6B42] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#24201E] font-medium leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#24201E] hover:bg-[#383330] text-[#FFF7EA] text-sm font-bold px-7 py-3.5 rounded-full transition-all shadow-sm hover:scale-105 active:scale-100"
              >
                <span>Read Our Full Story & Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
