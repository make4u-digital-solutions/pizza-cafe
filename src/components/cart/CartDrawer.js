"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { BRAND } from "@/data/pizzaData";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  Store,
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    fulfillmentType,
    setFulfillmentType,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponStatus(res);
    if (res.success) {
      setCouponInput("");
    }
  };

  const amountNeededForFreeDelivery = Math.max(0, BRAND.freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, (subtotal / BRAND.freeDeliveryThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Container */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#FFF7EA] text-[#24201E] h-full shadow-2xl flex flex-col z-10 border-l border-[#E9DFD2]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E9DFD2] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-[#C83224]/10 text-[#C83224]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#24201E]">
                    Your Order
                  </h2>
                  <p className="text-xs text-[#746B63]">
                    {items.length === 0 ? "No items added yet" : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    title="Clear entire cart"
                    className="text-xs text-[#746B63] hover:text-[#C83224] px-2 py-1 rounded transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart drawer"
                  className="p-2 rounded-full hover:bg-[#E8D5B8]/40 text-[#746B63] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Delivery/Pickup fulfillment switcher & Free Delivery Progress */}
            {items.length > 0 && (
              <div className="bg-[#FFF7EA] border-b border-[#E9DFD2] px-5 py-3 space-y-3">
                <div className="grid grid-cols-2 p-1 bg-[#E8D5B8]/40 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType("delivery")}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
                      fulfillmentType === "delivery"
                        ? "bg-[#C83224] text-white shadow-xs"
                        : "text-[#746B63] hover:text-[#24201E]"
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Door Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillmentType("pickup")}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
                      fulfillmentType === "pickup"
                        ? "bg-[#C83224] text-white shadow-xs"
                        : "text-[#746B63] hover:text-[#24201E]"
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Café Pickup</span>
                  </button>
                </div>

                {fulfillmentType === "delivery" && (
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      {amountNeededForFreeDelivery > 0 ? (
                        <span className="text-[#746B63]">
                          Add <span className="font-bold text-[#C83224]">₹{amountNeededForFreeDelivery}</span> more for <strong className="text-[#4D6B42]">FREE delivery</strong>
                        </span>
                      ) : (
                        <span className="text-[#4D6B42] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          You unlocked FREE delivery!
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-[#746B63]">₹{subtotal}/₹{BRAND.freeDeliveryThreshold}</span>
                    </div>
                    <div className="w-full bg-[#E8D5B8]/50 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#4D6B42] h-full rounded-full transition-all duration-300"
                        style={{ width: `${freeDeliveryPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#E8D5B8]/50 flex items-center justify-center text-[#746B63]">
                    <ShoppingBag className="w-10 h-10 opacity-60" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#24201E]">
                      Your order is empty
                    </h3>
                    <p className="text-sm text-[#746B63] mt-1 max-w-xs">
                      Craving hot artisan pizza? Explore our stone-baked signature pies, combos, and sides.
                    </p>
                  </div>
                  <Link
                    href="/menu"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white text-sm font-bold px-6 py-3 rounded-full transition-all shadow-sm hover:scale-105"
                  >
                    <span>Browse Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.lineId}
                    className="p-3.5 rounded-2xl bg-white border border-[#E9DFD2] shadow-2xs space-y-3"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-[#E8D5B8]/30 shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#E8D5B8] text-xs font-bold">
                            FORNO
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base font-bold text-[#24201E] truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.lineId)}
                            className="text-[#746B63] hover:text-[#C83224] p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Customization Details */}
                        <div className="text-xs text-[#746B63] space-y-0.5 mt-0.5">
                          {item.size && (
                            <p>
                              <span className="font-medium text-[#24201E]">{item.size.name}</span>
                              {item.crust && <span> • {item.crust.name}</span>}
                            </p>
                          )}

                          {item.toppings && item.toppings.length > 0 && (
                            <p className="text-[11px] text-[#746B63] line-clamp-1">
                              + {item.toppings.map((t) => t.name).join(", ")}
                            </p>
                          )}

                          {item.extras && item.extras.length > 0 && (
                            <p className="text-[11px] text-[#C83224]">
                              + {item.extras.map((e) => e.name).join(", ")}
                            </p>
                          )}
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E9DFD2]/60">
                          <span className="font-bold text-[#C83224] text-sm">
                            ₹{item.unitPrice * item.quantity}
                            {item.quantity > 1 && (
                              <span className="text-[10px] text-[#746B63] font-normal ml-1">
                                (₹{item.unitPrice} ea)
                              </span>
                            )}
                          </span>

                          <div className="flex items-center gap-1.5 bg-[#FFF7EA] border border-[#E9DFD2] rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.lineId, -1)}
                              aria-label="Decrease quantity"
                              className="w-6 h-6 rounded flex items-center justify-center text-[#24201E] hover:bg-[#E8D5B8]/50 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#24201E]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.lineId, 1)}
                              aria-label="Increase quantity"
                              className="w-6 h-6 rounded flex items-center justify-center text-[#24201E] hover:bg-[#E8D5B8]/50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary / Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#E9DFD2] bg-white space-y-4">
                {/* Coupon Input */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#4D6B42]/10 border border-[#4D6B42]/30 text-xs">
                    <div className="flex items-center gap-2 text-[#4D6B42] font-semibold">
                      <Tag className="w-4 h-4" />
                      <span>{appliedCoupon.code} applied (₹{discount} off)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#C83224] hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#746B63]" />
                        <input
                          type="text"
                          placeholder="Try FORNO150 or WELCOME20"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#24201E] hover:bg-[#C83224] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponStatus && !couponStatus.success && (
                      <p className="text-[11px] text-[#C83224] flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {couponStatus.message}
                      </p>
                    )}
                  </form>
                )}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-[#746B63]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#24201E]">₹{subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#4D6B42]">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-semibold">-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>
                      {fulfillmentType === "pickup"
                        ? "Café Pickup"
                        : deliveryFee === 0
                        ? "Delivery (Free above ₹499)"
                        : "Standard Delivery"}
                    </span>
                    <span className="font-semibold text-[#24201E]">
                      {deliveryFee === 0 ? <strong className="text-[#4D6B42]">FREE</strong> : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#24201E] pt-2 border-t border-[#E9DFD2]">
                    <span>Total Amount</span>
                    <span className="text-[#C83224] font-serif text-xl">₹{total}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/order"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm hover:scale-[1.02] active:scale-100"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
