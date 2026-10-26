"use client";

import { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/pizzaData";
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerLove() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 bg-[#FFF7EA] border-t border-[#E9DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full mb-3">
              <Heart className="w-3.5 h-3.5 fill-[#C83224]" />
              Guest Stories & Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#24201E] tracking-tight">
              Loved by Foodies
            </h2>
            <p className="text-xs text-[#746B63] mt-1 italic">
              *Sample reviews presented for demonstration purposes.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#E9DFD2] bg-white hover:bg-[#FFF7EA] text-[#24201E] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[#E9DFD2] bg-white hover:bg-[#FFF7EA] text-[#24201E] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Showcase Card */}
        <div className="relative bg-white rounded-3xl border border-[#E9DFD2] p-8 sm:p-12 shadow-sm overflow-hidden">
          <Quote className="absolute top-6 right-6 w-20 h-20 text-[#E8D5B8]/30 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl space-y-6"
            >
              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-serif text-xl sm:text-2xl text-[#24201E] leading-relaxed italic">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#E9DFD2]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#E9DFD2] shrink-0">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#24201E]">{current.name}</h4>
                  <p className="text-xs text-[#746B63]">{current.role}</p>
                  <p className="text-[11px] text-[#C83224] font-semibold mt-0.5">
                    Favorite: {current.favorite}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? "w-8 bg-[#C83224]" : "w-2 bg-[#E8D5B8]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
