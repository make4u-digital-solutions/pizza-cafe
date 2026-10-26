"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OFFERS, COUPONS, PIZZAS, SIDES_AND_DRINKS } from "@/data/pizzaData";
import { useCart } from "@/context/CartContext";
import { Tag, Sparkles, Copy, Check, ArrowRight, ShieldCheck, Clock, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function OffersClient() {
  const { addItem, applyCoupon, setIsCartOpen, showToast } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const handleClaimOffer = (offer) => {
    if (offer.code) {
      applyCoupon(offer.code);
    }

    if (offer.includedItemIds && offer.includedItemIds.length > 0) {
      const allItems = [...PIZZAS, ...SIDES_AND_DRINKS];
      offer.includedItemIds.forEach((id) => {
        const item = allItems.find((i) => i.id === id);
        if (item) {
          addItem(item, { notes: `Deal Bundle: ${offer.title}` });
        }
      });
    } else {
      setIsCartOpen(true);
    }
  };

  const couponList = Object.values(COUPONS);

  return (
    <div className="min-h-screen bg-[#FFF7EA] pb-24">
      {/* Header Banner */}
      <section className="bg-[#24201E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#383330] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs text-[#E8D5B8]/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#C83224] font-semibold">Special Offers</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D5B8] bg-white/10 px-3 py-1 rounded-full mb-3">
            <Tag className="w-3.5 h-3.5 text-[#C83224]" />
            Feast for Less
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Exclusive Deals & Feast Combos
          </h1>
          <p className="text-sm sm:text-base text-[#E8D5B8]/80 mt-2 max-w-xl">
            Save on artisan sourdough pizzas, family feasts, and craft beverages. Copy coupon codes or add curated combos directly to your cart.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Active Promo Codes Strip */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#24201E] mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C83224]" />
            Active Promo Codes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {couponList.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white rounded-2xl p-5 border-2 border-dashed border-[#E9DFD2] shadow-xs hover:border-[#C83224] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4D6B42] bg-[#4D6B42]/10 px-2.5 py-0.5 rounded-full">
                      Valid Today
                    </span>
                    <span className="text-xs text-[#746B63]">
                      Min: ₹{coupon.minOrder}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#24201E] mt-1">
                    {coupon.description}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E9DFD2] flex items-center justify-between gap-3">
                  <div className="bg-[#FFF7EA] border border-[#E9DFD2] px-3 py-1.5 rounded-xl font-mono text-sm font-bold text-[#C83224]">
                    {coupon.code}
                  </div>

                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className="inline-flex items-center gap-1.5 bg-[#24201E] hover:bg-[#C83224] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#4D6B42]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Combos Grid */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#24201E] mb-6">
            Curated Feast Combos
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {OFFERS.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border border-[#E9DFD2] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-5/12 h-60 sm:h-auto shrink-0 bg-[#24201E]">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 300px"
                  />
                  <div className="absolute top-4 left-4 bg-[#C83224] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                    {offer.discountBadge}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#C83224] uppercase tracking-wider block mb-1">
                      Promo Code: {offer.code}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#24201E]">
                      {offer.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#4D6B42] mt-1">
                      {offer.tagline}
                    </p>
                    <p className="text-xs text-[#746B63] mt-2 leading-relaxed">
                      {offer.description}
                    </p>
                    <p className="text-[11px] text-[#746B63]/70 italic mt-2">
                      Terms: {offer.terms}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#E9DFD2] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#746B63] line-through block">
                        ₹{offer.originalPrice}
                      </span>
                      <span className="font-serif text-2xl font-black text-[#24201E]">
                        ₹{offer.offerPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => handleClaimOffer(offer)}
                      className="inline-flex items-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>Add Offer to Cart</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demo Disclaimer Box */}
        <div className="p-6 rounded-2xl bg-white border border-[#E9DFD2] text-xs text-[#746B63] space-y-2">
          <div className="flex items-center gap-2 text-[#24201E] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#4D6B42]" />
            <span>Fictional Demonstration Notice</span>
          </div>
          <p>
            All offers, discount codes, and prices shown are sample data designed to illustrate the interactive purchasing and coupon deduction workflow for the FORNO website demonstration.
          </p>
        </div>
      </div>
    </div>
  );
}
