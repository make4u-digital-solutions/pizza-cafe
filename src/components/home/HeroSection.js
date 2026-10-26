"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Flame, ChefHat, Award, Star } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const pizzaSpinRef = useRef(null);
  const badgeRef = useRef(null);
  const spinAnimationRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Staggered text reveal with safe fromTo so it never stays stuck at 0 opacity
      gsap.fromTo(
        ".hero-stagger",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
        }
      );

      // 2. Pizza image scale and reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            delay: 0.15,
            clearProps: "transform",
            onComplete: () => {
              // Subtle orbital float after entrance
              gsap.to(imageRef.current, {
                y: 8,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          }
        );
      }

      // 3. Continuous smooth circular rotation on the pizza disc
      if (pizzaSpinRef.current) {
        spinAnimationRef.current = gsap.to(pizzaSpinRef.current, {
          rotation: 360,
          duration: 38,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }

      // 4. Outer dashed ring slow counter-rotation
      gsap.to(".outer-dashed-ring", {
        rotation: -360,
        duration: 55,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      // 5. Badge entrance
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.45,
            ease: "back.out(1.5)",
            clearProps: "transform",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (spinAnimationRef.current) {
      gsap.to(spinAnimationRef.current, { timeScale: 0.25, duration: 0.6 });
    }
  };

  const handleMouseLeave = () => {
    if (spinAnimationRef.current) {
      gsap.to(spinAnimationRef.current, { timeScale: 1, duration: 0.6 });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-10 pb-16 sm:pb-24 lg:pt-16 lg:pb-28 bg-[#FFF7EA]"
    >
      {/* Texture pattern as an isolated background layer */}
      <div className="absolute inset-0 pattern-dots pointer-events-none -z-10" />

      {/* Warm ambient radial glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E8D5B8]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C83224]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="hero-stagger inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8D5B8]/60 border border-[#E9DFD2] text-xs font-bold uppercase tracking-wider text-[#C83224]">
              <Flame className="w-3.5 h-3.5 fill-[#C83224]" />
              <span>Authentic Flavour • Freshly Baked</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-stagger font-serif text-4xl sm:text-6xl xl:text-7xl font-black text-[#24201E] tracking-tight leading-[1.08]">
              Life Is Better <br />
              <span className="text-[#C83224] relative inline-block">
                With a Slice.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E8D5B8]"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 3 197 9"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="hero-stagger text-[#746B63] text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Hand-stretched dough fermented for 48 hours, rich slow-simmered San Marzano tomatoes, bubbling fior di latte, and bold flavours baked fresh in our 450°C stone oven.
            </p>

            {/* CTA Buttons */}
            <div className="hero-stagger flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C83224] hover:bg-[#9F251C] text-[#FFF7EA] text-base font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF7EA] text-[#24201E] text-base font-bold px-7 py-4 rounded-full border border-[#E9DFD2] transition-colors shadow-xs"
              >
                <ChefHat className="w-4 h-4 text-[#746B63]" />
                <span>Discover Our Story</span>
              </Link>
            </div>

            {/* Quality Badges Row */}
            <div className="hero-stagger pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-[#E9DFD2] text-xs text-[#746B63]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4D6B42]" />
                <span className="font-semibold text-[#24201E]">48h Slow Fermentation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C83224]" />
                <span className="font-semibold text-[#24201E]">450°C Stone Hearth</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9F251C]" />
                <span className="font-semibold text-[#24201E]">San Marzano D.O.P.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Pizza Showcase Composition with Circular Movement */}
          <div
            className="lg:col-span-5 relative flex items-center justify-center cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Outer decorative dashed ring with gentle counter-rotation */}
            <div className="outer-dashed-ring absolute w-[330px] h-[330px] sm:w-[430px] sm:h-[430px] rounded-full border-2 border-dashed border-[#C83224]/30 pointer-events-none" />

            {/* Main Pizza Image Wrapper with subtle float */}
            <div
              ref={imageRef}
              className="relative w-72 h-72 sm:w-96 sm:h-96 xl:w-[440px] xl:h-[440px] rounded-full overflow-hidden shadow-2xl border-4 border-white bg-[#E8D5B8] transition-shadow duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(200,50,36,0.3)]"
            >
              {/* Rotating inner container containing the pizza */}
              <div
                ref={pizzaSpinRef}
                className="relative w-full h-full will-change-transform"
              >
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85"
                  alt="Artisan Stone-Baked Pizza at FORNO - Rotating Showcase"
                  fill
                  priority
                  className="object-cover scale-105"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 440px"
                />
              </div>
            </div>

            {/* Bestseller Floating Badge (Stays stable and readable) */}
            <div
              ref={badgeRef}
              className="absolute -top-3 -right-2 sm:top-4 sm:right-0 bg-white text-[#24201E] p-3 sm:p-4 rounded-2xl shadow-xl border border-[#E9DFD2] flex items-center gap-3 backdrop-blur-xs z-20 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 rounded-full bg-[#C83224] text-white flex items-center justify-center font-bold shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#746B63] uppercase tracking-wider">
                  Chef Choice
                </p>
                <p className="font-serif text-sm font-bold text-[#24201E]">
                  Burrata Signature
                </p>
                <p className="text-[11px] text-[#4D6B42] font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#4D6B42]" />
                  <span>5.0 (620+ reviews)</span>
                </p>
              </div>
            </div>

            {/* Oven Temperature Tag (Stays stable and readable) */}
            <div className="absolute -bottom-4 -left-2 sm:bottom-4 sm:left-0 bg-[#24201E] text-white py-2.5 px-4 rounded-2xl shadow-xl flex items-center gap-2.5 z-20 transition-transform duration-300 hover:scale-105">
              <span className="p-1 rounded-full bg-[#C83224] text-white">
                <Flame className="w-4 h-4 fill-current" />
              </span>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-[#E8D5B8] tracking-wider">
                  Stone Oven
                </p>
                <p className="text-xs font-bold text-white">
                  Baked at 450°C in 90s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
