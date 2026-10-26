"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { SIZES, CRUSTS, TOPPINGS_AVAILABLE, EXTRAS } from "@/data/pizzaData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Flame,
  RotateCcw,
} from "lucide-react";

export default function PizzaCustomizer({ compact = false }) {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // Default Medium
  const [selectedCrust, setSelectedCrust] = useState(CRUSTS[0]); // Default Classic
  const [selectedToppings, setSelectedToppings] = useState([
    TOPPINGS_AVAILABLE[0], // extra-mozzarella
    TOPPINGS_AVAILABLE[2], // mushrooms
    TOPPINGS_AVAILABLE[3], // kalamata-olives
  ]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeStep, setActiveStep] = useState(1);

  const basePrice = 299; // Base craft dough & sauce
  const sizeCost = selectedSize.priceAdd;
  const crustCost = selectedCrust.price;
  const toppingsCost = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const extrasCost = selectedExtras.reduce((sum, e) => sum + e.price, 0);

  const unitPrice = basePrice + sizeCost + crustCost + toppingsCost + extrasCost;
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

  const resetSelections = () => {
    setSelectedSize(SIZES[1]);
    setSelectedCrust(CRUSTS[0]);
    setSelectedToppings([TOPPINGS_AVAILABLE[0]]);
    setSelectedExtras([]);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    const customPizzaProduct = {
      id: "custom-artisan-pizza",
      name: `Custom ${selectedSize.name.split(" ")[0]} Artisan Pizza`,
      description: `Crafted on ${selectedCrust.name} with ${selectedToppings.length} hand-picked toppings.`,
      price: basePrice,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
      diet: selectedToppings.some((t) => !t.veg) ? "non-veg" : "veg",
    };

    addItem(customPizzaProduct, {
      size: selectedSize,
      crust: selectedCrust,
      toppings: selectedToppings,
      extras: selectedExtras,
      quantity,
      unitPrice,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E9DFD2] shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="bg-[#24201E] text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D5B8]">
            <Sparkles className="w-3.5 h-3.5 text-[#C83224]" />
            Stone Oven Workshop
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            Your Crust. Your Toppings. Your Rules.
          </h3>
        </div>

        <button
          type="button"
          onClick={resetSelections}
          className="inline-flex items-center gap-1.5 text-xs text-[#E8D5B8] hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Recipe</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Interactive Builder Preview */}
        <div className="lg:col-span-5 bg-[#FFF7EA] p-6 lg:p-8 flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-[#E9DFD2]">
          <div className="w-full flex items-center justify-between text-xs text-[#746B63] mb-4">
            <span className="font-semibold uppercase tracking-wider text-[#24201E]">
              Interactive Preview
            </span>
            <span className="bg-[#E8D5B8]/40 px-2.5 py-1 rounded-full text-[#C83224] font-bold">
              {selectedSize.name}
            </span>
          </div>

          {/* Pizza Disc Graphic Composition */}
          <div className="relative my-4 flex items-center justify-center">
            {/* Wooden Peel Background */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-[#E8D5B8] bg-[#FFF0D4] p-2 shadow-inner flex items-center justify-center relative">
              {/* Pizza Base image with scale based on size */}
              <motion.div
                animate={{
                  scale: selectedSize.id === "regular" ? 0.88 : selectedSize.id === "medium" ? 0.95 : 1.02,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-[#9F251C]/20"
              >
                <Image
                  src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80"
                  alt="Custom Pizza Crafting"
                  fill
                  className="object-cover"
                  sizes="300px"
                />

                {/* Hot Stone Oven Hearth Glow Overlay */}
                <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/30 pointer-events-none" />
              </motion.div>

              {/* Floating ingredient indicators */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#24201E] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C83224] fill-current" />
                <span>{selectedCrust.name}</span>
              </div>
            </div>
          </div>

          {/* Current Selection Badges Summary */}
          <div className="w-full space-y-3 mt-6">
            <p className="text-xs font-bold text-[#746B63] uppercase tracking-wider">
              Included Toppings ({selectedToppings.length}):
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {selectedToppings.length === 0 ? (
                <span className="text-xs text-[#746B63] italic">No extra toppings selected yet</span>
              ) : (
                selectedToppings.map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center gap-1 text-[11px] bg-white border border-[#E9DFD2] text-[#24201E] px-2.5 py-1 rounded-full font-medium"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${t.veg ? "bg-[#4D6B42]" : "bg-[#9F251C]"}`} />
                    {t.name}
                  </span>
                ))
              )}
            </div>

            {selectedExtras.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E9DFD2]/60">
                {selectedExtras.map((e) => (
                  <span
                    key={e.id}
                    className="text-[11px] bg-[#4D6B42]/10 text-[#4D6B42] border border-[#4D6B42]/20 px-2.5 py-0.5 rounded-full font-semibold"
                  >
                    + {e.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Customizer Steps & Controls */}
        <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between space-y-8">
          {/* Step Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E9DFD2] pb-3 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveStep(1)}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeStep === 1
                  ? "border-[#C83224] text-[#C83224]"
                  : "border-transparent text-[#746B63] hover:text-[#24201E]"
              }`}
            >
              1. Size & Crust
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeStep === 2
                  ? "border-[#C83224] text-[#C83224]"
                  : "border-transparent text-[#746B63] hover:text-[#24201E]"
              }`}
            >
              2. Fresh Toppings ({selectedToppings.length})
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeStep === 3
                  ? "border-[#C83224] text-[#C83224]"
                  : "border-transparent text-[#746B63] hover:text-[#24201E]"
              }`}
            >
              3. Crust Glaze & Extras
            </button>
          </div>

          {/* Step 1: Size & Crust */}
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Size selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#746B63] block mb-3">
                  Step 1: Choose Your Dough Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SIZES.map((size) => {
                    const isSelected = selectedSize.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#C83224] text-white border-[#C83224] shadow-sm scale-[1.02]"
                            : "bg-[#FFF7EA] text-[#24201E] border-[#E9DFD2] hover:border-[#C83224]"
                        }`}
                      >
                        <p className="font-serif text-base font-bold">{size.name}</p>
                        <p className={`text-xs mt-0.5 ${isSelected ? "text-white/80" : "text-[#746B63]"}`}>
                          {size.serves}
                        </p>
                        <p className={`text-xs font-bold mt-2 ${isSelected ? "text-white" : "text-[#C83224]"}`}>
                          {size.priceAdd === 0 ? "Standard" : `+₹${size.priceAdd}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Crust selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#746B63] block mb-3">
                  Step 2: Choose Your Handcrafted Crust
                </label>
                <div className="space-y-2.5">
                  {CRUSTS.map((crust) => {
                    const isSelected = selectedCrust.id === crust.id;
                    return (
                      <button
                        key={crust.id}
                        type="button"
                        onClick={() => setSelectedCrust(crust)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FFF7EA] border-[#C83224] shadow-xs"
                            : "bg-white border-[#E9DFD2] hover:border-[#C83224]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-[#C83224] bg-[#C83224] text-white"
                                : "border-[#746B63]"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-[#24201E]">{crust.name}</span>
                            <p className="text-xs text-[#746B63]">{crust.description}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#C83224]">
                          {crust.price === 0 ? "Included" : `+₹${crust.price}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Toppings Selection */}
          {activeStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#746B63]">
                  Step 3: Select Artisanal Toppings
                </label>
                <span className="text-xs text-[#4D6B42] font-semibold">
                  Tap to add or remove
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {TOPPINGS_AVAILABLE.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping)}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#C83224]/10 border-[#C83224] text-[#24201E] font-medium"
                          : "bg-white border-[#E9DFD2] text-[#746B63] hover:border-[#C83224]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            topping.veg ? "bg-[#4D6B42]" : "bg-[#9F251C]"
                          }`}
                        />
                        <span className="text-xs font-semibold text-[#24201E]">
                          {topping.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#C83224]">
                        {isSelected ? "✓ Added" : `+₹${topping.price}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Extras */}
          {activeStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <label className="text-xs font-bold uppercase tracking-wider text-[#746B63] block">
                Step 4: Premium Oils, Cheese & Finishes
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRAS.map((extra) => {
                  const isSelected = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#4D6B42]/10 border-[#4D6B42] text-[#24201E]"
                          : "bg-white border-[#E9DFD2] hover:border-[#4D6B42]"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-[#24201E]">{extra.name}</span>
                        <span className="text-xs font-bold text-[#4D6B42]">+₹{extra.price}</span>
                      </div>
                      <p className="text-[11px] text-[#746B63] mt-1">
                        {isSelected ? "Added to your pizza" : "Tap to add"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Live Order Summary & CTA */}
          <div className="pt-6 border-t border-[#E9DFD2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              {/* Quantity */}
              <div className="flex items-center bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#24201E] hover:bg-[#E8D5B8]/50"
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
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#24201E] hover:bg-[#E8D5B8]/50"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Price */}
              <div>
                <span className="text-xs text-[#746B63] block">Total Price:</span>
                <span className="font-serif text-2xl font-black text-[#C83224]">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="w-full sm:w-auto bg-[#24201E] hover:bg-[#383330] text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-colors cursor-pointer"
                >
                  Next Step ({activeStep}/3)
                </button>
              ) : null}

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all hover:scale-105 active:scale-100 cursor-pointer text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Customized Pizza</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
