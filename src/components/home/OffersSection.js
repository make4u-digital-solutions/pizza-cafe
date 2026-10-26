"use client";

import Image from "next/image";
import Link from "next/link";
import { OFFERS, PIZZAS, SIDES_AND_DRINKS } from "@/data/pizzaData";
import { useCart } from "@/context/CartContext";
import { Tag, Sparkles, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function OffersSection() {
  const { addItem, applyCoupon, setIsCartOpen } = useCart();

  const handleClaimOffer = (offer) => {
    // If it has coupon code, apply it
    if (offer.code) {
      applyCoupon(offer.code);
    }

    // If it has included items, add the first item to cart
    if (offer.includedItemIds && offer.includedItemIds.length > 0) {
      const allItems = [...PIZZAS, ...SIDES_AND_DRINKS];
      const firstItem = allItems.find((i) => i.id === offer.includedItemIds[0]);
      if (firstItem) {
        addItem(firstItem, {
          notes: `Included in deal: ${offer.title}`,
        });
      }
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <section className="py-20 bg-white border-y border-[#E9DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full mb-3">
            <Tag className="w-3.5 h-3.5" />
            Limited-Time Feasts & Bundles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#24201E] tracking-tight">
            Curated Combos & Specials
          </h2>
          <p className="text-sm sm:text-base text-[#746B63] mt-2">
            Designed for solo indulgences, cozy date nights, and grand weekend celebrations.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ y: -4 }}
              className="bg-[#FFF7EA] rounded-3xl border border-[#E9DFD2] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col sm:flex-row group"
            >
              {/* Image */}
              <div className="relative w-full sm:w-5/12 h-56 sm:h-auto shrink-0 overflow-hidden bg-[#24201E]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                <div className="absolute top-3 left-3 bg-[#C83224] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                  {offer.discountBadge}
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#746B63] mb-1">
                    <span className="font-bold text-[#C83224] uppercase tracking-wider text-[10px]">
                      Deal Code: {offer.code}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#24201E]">
                    {offer.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#4D6B42] mt-1">
                    {offer.tagline}
                  </p>

                  <p className="text-xs text-[#746B63] mt-2 leading-relaxed">
                    {offer.description}
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
                    className="inline-flex items-center gap-1.5 bg-[#C83224] hover:bg-[#9F251C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Claim Offer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link to Offers Page */}
        <div className="mt-10 text-center">
          <Link
            href="/offers"
            className="text-xs font-bold text-[#C83224] hover:underline uppercase tracking-wider inline-flex items-center gap-1"
          >
            <span>View All Promo Codes & Happy Hour Specials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
