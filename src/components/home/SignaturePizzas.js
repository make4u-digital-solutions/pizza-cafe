"use client";

import Image from "next/image";
import Link from "next/link";
import { PIZZAS } from "@/data/pizzaData";
import { useCart } from "@/context/CartContext";
import { Flame, Sparkles, Star, Plus, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SignaturePizzas() {
  const { setQuickViewProduct, addItem } = useCart();
  const featuredPizzas = PIZZAS.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-20 bg-[#FFF7EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Stone Oven Classics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#24201E] tracking-tight">
              Our Signature Pizzas
            </h2>
            <p className="text-sm sm:text-base text-[#746B63] mt-2 max-w-xl">
              Each pizza is hand-stretched to order, baked directly on stone at 450°C, and crowned with premium authentic ingredients.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C83224] hover:text-[#9F251C] transition-colors group self-start md:self-auto"
          >
            <span>View Complete Menu ({PIZZAS.length} Pizzas)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPizzas.map((pizza) => (
            <motion.div
              key={pizza.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl border border-[#E9DFD2] overflow-hidden shadow-xs hover:shadow-xl transition-shadow flex flex-col justify-between group"
            >
              {/* Image Container with Badges */}
              <div className="relative h-60 w-full overflow-hidden bg-[#24201E]/5">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Dietary badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs ${
                      pizza.diet === "veg"
                        ? "bg-[#4D6B42] text-white"
                        : "bg-[#9F251C] text-white"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    {pizza.diet === "veg" ? "Pure Veg" : "Non-Veg"}
                  </span>

                  {pizza.spicy && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-[#C83224] text-white shadow-xs">
                      <Flame className="w-3 h-3 fill-current" />
                      Spicy
                    </span>
                  )}
                </div>

                {/* Bestseller badge */}
                {pizza.bestseller && (
                  <div className="absolute top-3 right-3 bg-[#FFF7EA] text-[#24201E] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-[#E9DFD2] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C83224]" />
                    Bestseller
                  </div>
                )}

                {/* Quick View Button overlay on hover */}
                <button
                  onClick={() => setQuickViewProduct(pizza)}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#24201E] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 opacity-90 hover:opacity-100 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quick View</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#746B63] mb-1.5">
                    <span className="capitalize font-semibold text-[#C83224]">
                      {pizza.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                      <span className="font-bold text-[#24201E]">{pizza.rating}</span>
                      <span className="text-[11px]">({pizza.reviewsCount})</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#24201E] group-hover:text-[#C83224] transition-colors">
                    {pizza.name}
                  </h3>

                  <p className="text-xs text-[#746B63] mt-2 line-clamp-2 leading-relaxed">
                    {pizza.description}
                  </p>
                </div>

                {/* Card Footer: Price & Add to Cart */}
                <div className="pt-5 mt-5 border-t border-[#E9DFD2] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#746B63] block">Starting at</span>
                    <span className="font-serif text-2xl font-black text-[#24201E]">
                      ₹{pizza.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuickViewProduct(pizza)}
                      className="p-2.5 rounded-xl border border-[#E9DFD2] text-[#24201E] hover:bg-[#FFF7EA] hover:border-[#C83224] transition-colors"
                      title="Customize Size & Crust"
                    >
                      <span className="text-xs font-bold px-1">Customize</span>
                    </button>

                    <button
                      onClick={() => addItem(pizza)}
                      className="bg-[#C83224] hover:bg-[#9F251C] text-white p-2.5 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 font-bold text-xs cursor-pointer"
                      title="Add Regular size to cart"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Menu Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 bg-[#24201E] hover:bg-[#383330] text-[#FFF7EA] text-sm font-bold px-8 py-4 rounded-full transition-all shadow-md hover:scale-105"
          >
            <span>Explore All 12+ Signature Pizzas & Sides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
