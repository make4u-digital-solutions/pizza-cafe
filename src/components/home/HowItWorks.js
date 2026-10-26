"use client";

import { Search, Sliders, Pizza } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Find Your Favourite",
      description: "Browse 12+ artisan stone-baked pizzas, signature creations, or garden-fresh combinations.",
    },
    {
      num: "02",
      icon: Sliders,
      title: "Make It Yours",
      description: "Personalise your size, Roman thin or cheese-burst crust, and choose from 10+ gourmet toppings.",
    },
    {
      num: "03",
      icon: Pizza,
      title: "Enjoy Every Slice",
      description: "Baked at 450°C and served blistered, fragrant, and bubbling hot at your table or doorstep.",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-[#E9DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full mb-3 inline-block">
            Simple 3-Step Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#24201E] tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-[#746B63] mt-2">
            From our 450°C stone oven to your plate in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#FFF7EA] rounded-3xl p-8 border border-[#E9DFD2] flex flex-col items-center text-center group hover:border-[#C83224] transition-colors"
              >
                {/* Step badge */}
                <div className="absolute top-4 right-4 text-xs font-serif font-black text-[#E8D5B8] group-hover:text-[#C83224] transition-colors text-lg">
                  {step.num}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white border border-[#E9DFD2] flex items-center justify-center text-[#C83224] mb-5 shadow-xs group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#24201E]">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#746B63] mt-2.5 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
