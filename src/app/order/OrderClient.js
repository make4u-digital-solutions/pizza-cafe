"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { BRAND } from "@/data/pizzaData";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  Truck,
  Store,
  Tag,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

export default function OrderClient() {
  const {
    items,
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

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cod", // 'cod' | 'upi-demo' | 'card-demo'
  });

  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderDetails, setConfirmedOrderDetails] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Please enter a 10-digit mobile number.";
    }
    if (fulfillmentType === "delivery" && !formData.address.trim()) {
      newErrors.address = "Please enter your full delivery address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg(res);
    if (res.success) setCouponCode("");
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!validateForm()) {
      return;
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }

    const orderRef = `FORNO-${Math.floor(100000 + Math.random() * 900000)}`;
    const snapshot = {
      orderRef,
      items: [...items],
      subtotal,
      discount,
      deliveryFee,
      total,
      appliedCoupon,
      formData: { ...formData },
      fulfillmentType,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConfirmedOrderDetails(snapshot);
    setOrderConfirmed(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (orderConfirmed && confirmedOrderDetails) {
    return (
      <div className="min-h-screen bg-[#FFF7EA] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E9DFD2] shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#4D6B42]/10 text-[#4D6B42] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#4D6B42] bg-[#4D6B42]/10 px-3 py-1 rounded-full">
              Demo Order Placed Successfully
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#24201E] mt-3">
              Grazie Mille, {confirmedOrderDetails.formData.name}!
            </h1>
            <p className="text-sm text-[#746B63] mt-2">
              Your order has been recorded in this frontend demonstration.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-[#FFF7EA] p-5 rounded-2xl border border-[#E9DFD2] text-left space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#746B63]">Order Reference</span>
              <span className="font-mono font-bold text-[#C83224] text-sm">
                {confirmedOrderDetails.orderRef}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#746B63]">Estimated Prep & Delivery Time</span>
              <span className="font-bold text-[#24201E] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C83224]" />
                30 – 40 mins
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#746B63]">Fulfillment Method</span>
              <span className="font-bold text-[#24201E] capitalize">
                {confirmedOrderDetails.fulfillmentType === "delivery" ? "Doorstep Delivery" : "Café Counter Pickup"}
              </span>
            </div>
            {confirmedOrderDetails.fulfillmentType === "delivery" && (
              <div className="flex justify-between items-start text-xs border-t border-[#E9DFD2]/60 pt-2">
                <span className="text-[#746B63]">Delivery Address</span>
                <span className="font-medium text-[#24201E] max-w-xs text-right">
                  {confirmedOrderDetails.formData.address}
                </span>
              </div>
            )}
          </div>

          {/* Summary Items */}
          <div className="text-left border-t border-[#E9DFD2] pt-4 space-y-2">
            <p className="text-xs font-bold text-[#746B63] uppercase tracking-wider mb-2">
              Ordered Items:
            </p>
            {confirmedOrderDetails.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs py-1">
                <span>
                  {item.quantity}x {item.name} {item.size?.name ? `(${item.size.name})` : ""}
                </span>
                <span className="font-semibold text-[#24201E]">
                  ₹{item.unitPrice * item.quantity}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-bold text-[#24201E] border-t border-[#E9DFD2] pt-3">
              <span>Total Paid (Demo)</span>
              <span className="font-serif text-lg text-[#C83224]">
                ₹{confirmedOrderDetails.total}
              </span>
            </div>
          </div>

          {/* Demonstration Notice */}
          <div className="bg-[#FFF7EA] p-4 rounded-xl border border-[#E9DFD2] text-xs text-[#746B63] flex items-start gap-2.5 text-left">
            <ShieldCheck className="w-4 h-4 text-[#4D6B42] shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> This is an interactive frontend demonstration. No payment was charged and no live delivery will occur.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              className="bg-[#C83224] hover:bg-[#9F251C] text-white font-bold text-xs px-6 py-3.5 rounded-full transition-colors"
            >
              Order More Slices
            </Link>
            <Link
              href="/"
              className="bg-[#FFF7EA] hover:bg-[#E8D5B8]/40 text-[#24201E] border border-[#E9DFD2] font-bold text-xs px-6 py-3.5 rounded-full transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7EA] pb-24">
      {/* Page Header */}
      <section className="bg-[#24201E] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#383330]">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[#E8D5B8]/80 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/menu" className="hover:text-white transition-colors">Menu</Link>
            <span>/</span>
            <span className="text-[#C83224] font-semibold">Checkout</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl font-black text-white">
            Checkout Demonstration
          </h1>
          <p className="text-xs sm:text-sm text-[#E8D5B8]/80 mt-1.5">
            Review your order, enter contact details, and test our demo order workflow.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E9DFD2] p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF7EA] text-[#746B63] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#24201E]">
              Your Cart is Empty
            </h2>
            <p className="text-xs text-[#746B63]">
              You haven&apos;t added any pizza or drinks yet. Browse our menu to build your order!
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white text-xs font-bold px-6 py-3 rounded-full transition-colors"
            >
              <span>Explore Pizza Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Customer details & Fulfillment */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Fulfillment Switcher */}
              <div className="bg-white rounded-3xl p-6 border border-[#E9DFD2] shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#24201E]">
                  1. Fulfillment Option
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType("delivery")}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      fulfillmentType === "delivery"
                        ? "bg-[#FFF7EA] border-[#C83224] text-[#24201E] ring-1 ring-[#C83224]"
                        : "bg-white border-[#E9DFD2] text-[#746B63] hover:border-[#C83224]"
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-[#C83224]/10 text-[#C83224]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#24201E]">Doorstep Delivery</p>
                      <p className="text-[11px] text-[#746B63]">30–40 mins</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillmentType("pickup")}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      fulfillmentType === "pickup"
                        ? "bg-[#FFF7EA] border-[#C83224] text-[#24201E] ring-1 ring-[#C83224]"
                        : "bg-white border-[#E9DFD2] text-[#746B63] hover:border-[#C83224]"
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-[#4D6B42]/10 text-[#4D6B42]">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#24201E]">Café Takeaway</p>
                      <p className="text-[11px] text-[#746B63]">15–20 mins</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Customer Contact Details */}
              <div className="bg-white rounded-3xl p-6 border border-[#E9DFD2] shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#24201E]">
                  2. Contact & Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#746B63] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Marco Rossi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-[#C83224] mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#746B63] block mb-1">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-[#C83224] mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#746B63] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#C83224] mt-1">{errors.email}</p>
                  )}
                </div>

                {fulfillmentType === "delivery" && (
                  <div>
                    <label className="text-xs font-bold text-[#746B63] block mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Flat/House number, Apartment/Street, Landmark"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-[#C83224] mt-1">{errors.address}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-[#746B63] block mb-1">
                    Kitchen / Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please ring bell, extra chili flakes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                  />
                </div>
              </div>

              {/* 3. Demo Payment Simulation */}
              <div className="bg-white rounded-3xl p-6 border border-[#E9DFD2] shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#24201E]">
                  3. Payment Method (Demo)
                </h3>

                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E9DFD2] cursor-pointer hover:bg-[#FFF7EA]">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === "cod"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      className="accent-[#C83224]"
                    />
                    <span className="text-xs font-semibold text-[#24201E]">
                      Pay on Delivery / Pickup (Cash or Card)
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E9DFD2] cursor-pointer hover:bg-[#FFF7EA]">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === "upi-demo"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "upi-demo" })}
                      className="accent-[#C83224]"
                    />
                    <span className="text-xs font-semibold text-[#24201E]">
                      Simulated UPI / Net Banking (Demo)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Placement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-[#E9DFD2] shadow-md space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#24201E] pb-3 border-b border-[#E9DFD2]">
                  Order Summary ({items.length})
                </h3>

                {/* Items */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.lineId} className="flex gap-3 text-xs">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#E8D5B8]/30 shrink-0">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-[#24201E] truncate">{item.name}</p>
                          <span className="font-bold text-[#C83224] ml-2">
                            ₹{item.unitPrice * item.quantity}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#746B63]">
                          {item.size?.name || "Regular"} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#4D6B42]/10 border border-[#4D6B42]/30 text-xs">
                    <span className="text-[#4D6B42] font-semibold flex items-center gap-1.5">
                      <Tag className="w-4 h-4" />
                      {appliedCoupon.code} applied (₹{discount} off)
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[#C83224] hover:underline font-bold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. FORNO150)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs uppercase bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-[#24201E] hover:bg-[#C83224] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMsg && !couponMsg.success && (
                      <p className="text-[11px] text-[#C83224] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {couponMsg.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2 pt-3 border-t border-[#E9DFD2] text-xs text-[#746B63]">
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
                        ? "Takeaway Pickup"
                        : deliveryFee === 0
                        ? "Free Delivery"
                        : "Delivery Fee"}
                    </span>
                    <span className="font-semibold text-[#24201E]">
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#24201E] pt-3 border-t border-[#E9DFD2]">
                    <span>Total Amount</span>
                    <span className="font-serif text-2xl text-[#C83224]">₹{total}</span>
                  </div>
                </div>

                {/* Order Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#C83224] hover:bg-[#9F251C] text-white font-bold py-4 px-6 rounded-2xl shadow-md transition-all hover:scale-[1.01] active:scale-100 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Place Demo Order (₹{total})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-[#746B63]">
                  🔒 Simulated checkout. No real payment charged.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
