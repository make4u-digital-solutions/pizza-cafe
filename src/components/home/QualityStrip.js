"use client";

import { Sparkles, Utensils, Flame, Clock } from "lucide-react";

export default function QualityStrip() {
  const highlights = [
    {
      icon: Clock,
      title: "Freshly Prepared",
      description: "Dough mixed daily and rested for 48 hours for light, airy crusts.",
    },
    {
      icon: Sparkles,
      title: "Quality Ingredients",
      description: "San Marzano D.O.P. tomatoes and authentic local dairy fior di latte.",
    },
    {
      icon: Flame,
      title: "Oven-Baked Goodness",
      description: "Blistered to perfection in our 450°C Italian stone hearth oven.",
    },
    {
      icon: Utensils,
      title: "Made to Order",
      description: "Customized with your preferred crust, cheeses, and artisan toppings.",
    },
  ];

  return (
    <section className="bg-white border-y border-[#E9DFD2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-[#FFF7EA]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF7EA] border border-[#E9DFD2] flex items-center justify-center text-[#C83224] shrink-0">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#24201E]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#746B63] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
