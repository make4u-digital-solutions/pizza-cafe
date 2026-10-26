"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { SIZES, CRUSTS, TOPPINGS_AVAILABLE, EXTRAS } from "@/data/pizzaData";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Flame,
  Plus,
  Minus,
  Sparkles,
  Check,
  ShieldAlert,
  Clock,
  Star,
  ShoppingBag,
} from "lucide-react";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedCrust, setSelectedCrust] = useState(CRUSTS[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Reset state when a new product is selected
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(SIZES[0]);
      setSelectedCrust(CRUSTS[0]);
      setSelectedToppings([]);
      setSelectedExtras([]);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setQuickViewProduct(null);
      }
    };
    if (quickViewProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  // Calculate live total unit price
  const basePrice = quickViewProduct.price || 349;
  const sizePrice = selectedSize?.priceAdd || 0;
  const crustPrice = selectedCrust?.price || 0;
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);

  const unitPrice = basePrice + sizePrice + crustPrice + toppingsPrice + extrasPrice;
  const totalPrice = unitPrice * quantity;

  const toggleTopping = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const toggleExtra = (extra) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleAddToCart = () => {
    addItem(quickViewProduct, {
      size: selectedSize,
      crust: selectedCrust,
      toppings: selectedToppings,
      extras: selectedExtras,
      quantity,
      unitPrice,
    });
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-[#FFF7EA] rounded-3xl shadow-2xl border border-[#E9DFD2] overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#24201E] flex items-center justify-center shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image and Badges */}
          <div className="relative md:w-5/12 h-64 md:h-auto bg-[#24201E] shrink-0">
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs ${
                  quickViewProduct.diet === "veg"
                    ? "bg-[#4D6B42] text-white"
                    : "bg-[#9F251C] text-white"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                {quickViewProduct.diet === "veg" ? "Pure Veg" : "Artisan Non-Veg"}
              </span>

              {quickViewProduct.spicy && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#C83224] text-white shadow-xs">
                  <Flame className="w-3 h-3 fill-current" />
                  Spicy
                </span>
              )}

              {quickViewProduct.bestseller && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E8D5B8] text-[#24201E] shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#C83224]" />
                  Bestseller
                </span>
              )}
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-3 text-xs text-white/90">
                {quickViewProduct.rating && (
                  <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                    <span className="font-bold">{quickViewProduct.rating}</span>
                    <span className="text-white/60">({quickViewProduct.reviewsCount})</span>
                  </span>
                )}
                {quickViewProduct.prepTime && (
                  <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <Clock className="w-3.5 h-3.5 text-[#E8D5B8]" />
                    {quickViewProduct.prepTime}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Add to Cart */}
          <div className="flex-1 p-6 md:p-7 overflow-y-auto space-y-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#24201E]">
                {quickViewProduct.name}
              </h3>
              <p className="text-sm text-[#746B63] mt-1.5 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Ingredients & Allergens info */}
            {quickViewProduct.ingredients && (
              <div className="p-3 rounded-xl bg-white border border-[#E9DFD2] space-y-1.5 text-xs">
                <p className="font-semibold text-[#24201E]">Key Ingredients:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="bg-[#FFF7EA] text-[#746B63] px-2 py-0.5 rounded-md border border-[#E9DFD2]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
                {quickViewProduct.allergens && (
                  <p className="text-[11px] text-[#746B63] flex items-center gap-1 pt-1 text-[#9F251C]">
                    <ShieldAlert className="w-3 h-3 text-[#9F251C] shrink-0" />
                    {quickViewProduct.allergens}
                  </p>
                )}
              </div>
            )}

            {/* Size Selection (if it's a pizza) */}
            {quickViewProduct.category !== "sides" && quickViewProduct.category !== "drinks" && quickViewProduct.category !== "desserts" && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#746B63]">
                  1. Select Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((size) => {
                    const isSelected = selectedSize.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#C83224] text-white border-[#C83224] shadow-xs"
                            : "bg-white text-[#24201E] border-[#E9DFD2] hover:border-[#C83224]"
                        }`}
                      >
                        <p className="text-xs font-bold">{size.name}</p>
                        <p className={`text-[11px] mt-0.5 ${isSelected ? "text-white/80" : "text-[#746B63]"}`}>
                          {size.serves}
                        </p>
                        <p className={`text-xs font-semibold mt-1 ${isSelected ? "text-white" : "text-[#C83224]"}`}>
                          {size.priceAdd === 0 ? "Standard" : `+₹${size.priceAdd}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Crust Selection */}
            {quickViewProduct.category !== "sides" && quickViewProduct.category !== "drinks" && quickViewProduct.category !== "desserts" && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#746B63]">
                  2. Choose Crust
                </label>
                <div className="space-y-2">
                  {CRUSTS.map((crust) => {
                    const isSelected = selectedCrust.id === crust.id;
                    return (
                      <button
                        key={crust.id}
                        type="button"
                        onClick={() => setSelectedCrust(crust)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FFF7EA] border-[#C83224] text-[#24201E]"
                            : "bg-white border-[#E9DFD2] hover:border-[#C83224]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-[#C83224] bg-[#C83224] text-white"
                                : "border-[#746B63]"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#24201E]">{crust.name}</span>
                            <p className="text-[11px] text-[#746B63]">{crust.description}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#C83224]">
                          {crust.price === 0 ? "Included" : `+₹${crust.price}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extra Toppings */}
            {quickViewProduct.category !== "sides" && quickViewProduct.category !== "drinks" && quickViewProduct.category !== "desserts" && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#746B63]">
                  3. Extra Toppings (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TOPPINGS_AVAILABLE.slice(0, 6).map((topping) => {
                    const isSelected = selectedToppings.some((t) => t.id === topping.id);
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        onClick={() => toggleTopping(topping)}
                        className={`flex items-center justify-between p-2 rounded-xl border text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#C83224]/10 border-[#C83224] text-[#24201E]"
                            : "bg-white border-[#E9DFD2] text-[#746B63] hover:border-[#C83224]"
                        }`}
                      >
                        <span className="truncate pr-1">{topping.name}</span>
                        <span className="font-semibold text-[#C83224] shrink-0">
                          {isSelected ? "✓" : `+₹${topping.price}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extras */}
            {quickViewProduct.category !== "sides" && quickViewProduct.category !== "drinks" && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#746B63]">
                  4. Gourmet Crust & Finish
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EXTRAS.map((extra) => {
                    const isSelected = selectedExtras.some((e) => e.id === extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra)}
                        className={`flex items-center justify-between p-2 rounded-xl border text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#4D6B42]/10 border-[#4D6B42] text-[#24201E]"
                            : "bg-white border-[#E9DFD2] text-[#746B63] hover:border-[#4D6B42]"
                        }`}
                      >
                        <span className="truncate pr-1">{extra.name}</span>
                        <span className="font-semibold text-[#4D6B42] shrink-0">
                          +₹{extra.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Modal Footer: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-[#E9DFD2] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-white border border-[#E9DFD2] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#24201E] hover:bg-[#E8D5B8]/40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-sm text-[#24201E]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#24201E] hover:bg-[#E8D5B8]/40"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-between bg-[#C83224] hover:bg-[#9F251C] text-white font-bold py-3.5 px-5 rounded-2xl shadow-md transition-all hover:scale-[1.01] active:scale-100 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order</span>
                </span>
                <span className="font-serif text-lg">₹{totalPrice}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
