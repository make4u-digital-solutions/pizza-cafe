"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/data/pizzaData";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ArrowRight,
  Phone,
} from "lucide-react";

export default function ReservationsClient() {
  const [todayStr, setTodayStr] = useState("2026-10-26");

  useEffect(() => {
    setTodayStr(new Date().toISOString().split("T")[0]);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "2026-10-26",
    time: "19:30",
    guests: "2",
    seating: "indoor", // 'indoor' | 'patio'
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const timeSlots = [
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please provide your full name.";
    if (!form.email.trim() || !form.email.includes("@")) {
      newErrors.email = "Please provide a valid email.";
    }
    if (!form.phone.trim() || form.phone.length < 10) {
      newErrors.phone = "Please enter a 10-digit phone number.";
    }
    if (!form.date) {
      newErrors.date = "Please select a reservation date.";
    } else if (form.date < todayStr) {
      newErrors.date = "Past dates cannot be selected.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setBookingRef(`RES-${Math.floor(10000 + Math.random() * 90000)}`);
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FFF7EA] pb-24">
      {/* Header */}
      <section className="bg-[#24201E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#383330]">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[#E8D5B8]/80 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#C83224] font-semibold">Table Reservations</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D5B8] bg-white/10 px-3 py-1 rounded-full mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#C83224]" />
            Dine-In Hearth Experience
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white">
            Reserve Your Table
          </h1>
          <p className="text-sm sm:text-base text-[#E8D5B8]/80 mt-2 max-w-xl">
            Book a spot near the glowing stone hearth or relax on our quiet outdoor garden patio.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {confirmed ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9DFD2] shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#4D6B42]/10 text-[#4D6B42] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#4D6B42] bg-[#4D6B42]/10 px-3 py-1 rounded-full">
                Demo Booking Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#24201E] mt-3">
                A Table is Waiting for You, {form.name}!
              </h2>
              <p className="text-sm text-[#746B63] mt-2">
                We have recorded your demo table reservation for {form.guests} guests.
              </p>
            </div>

            <div className="bg-[#FFF7EA] p-6 rounded-2xl border border-[#E9DFD2] max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#746B63]">Booking ID</span>
                <span className="font-mono font-bold text-[#C83224]">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#746B63]">Date & Time</span>
                <span className="font-bold text-[#24201E]">
                  {form.date} at {form.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#746B63]">Party Size</span>
                <span className="font-bold text-[#24201E]">{form.guests} People</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#746B63]">Seating Preference</span>
                <span className="font-bold text-[#24201E] capitalize">{form.seating} Area</span>
              </div>
            </div>

            <div className="bg-[#FFF7EA] p-4 rounded-xl border border-[#E9DFD2] text-xs text-[#746B63] flex items-start gap-2 max-w-md mx-auto text-left">
              <ShieldCheck className="w-4 h-4 text-[#4D6B42] shrink-0 mt-0.5" />
              <p>
                <strong>Notice:</strong> This is a frontend demo. No actual table has been locked with a backend booking system.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/menu"
                className="bg-[#C83224] hover:bg-[#9F251C] text-white font-bold text-xs px-6 py-3.5 rounded-full transition-colors"
              >
                Browse Menu in Advance
              </Link>
              <button
                onClick={() => {
                  setConfirmed(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    date: todayStr,
                    time: "19:30",
                    guests: "2",
                    seating: "indoor",
                    notes: "",
                  });
                }}
                className="bg-[#FFF7EA] hover:bg-[#E8D5B8]/40 text-[#24201E] border border-[#E9DFD2] font-bold text-xs px-6 py-3.5 rounded-full transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DFD2] shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#24201E]">
              Table Details & Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-[#746B63] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leonardo Bruno"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                />
                {errors.phone && (
                  <p className="text-[11px] text-[#C83224] mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold text-[#746B63] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="leonardo@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                />
                {errors.email && (
                  <p className="text-[11px] text-[#C83224] mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-[#746B63] block mb-1">
                  Reservation Date *
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                />
                {errors.date && (
                  <p className="text-[11px] text-[#C83224] mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-[#746B63] block mb-1">
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224] cursor-pointer"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests (Table for Two)</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6+ Guests (Family Table)</option>
                </select>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="text-xs font-bold text-[#746B63] block mb-2">
                Preferred Seating Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = form.time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setForm({ ...form, time: slot })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#C83224] text-white shadow-xs"
                          : "bg-[#FFF7EA] border border-[#E9DFD2] text-[#24201E] hover:border-[#C83224]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seating preference */}
            <div>
              <label className="text-xs font-bold text-[#746B63] block mb-2">
                Seating Atmosphere
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E9DFD2] cursor-pointer hover:bg-[#FFF7EA]">
                  <input
                    type="radio"
                    name="seating"
                    checked={form.seating === "indoor"}
                    onChange={() => setForm({ ...form, seating: "indoor" })}
                    className="accent-[#C83224]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#24201E]">Hearthside Main Dining</p>
                    <p className="text-[11px] text-[#746B63]">Cozy, lively stone-oven view</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E9DFD2] cursor-pointer hover:bg-[#FFF7EA]">
                  <input
                    type="radio"
                    name="seating"
                    checked={form.seating === "patio"}
                    onChange={() => setForm({ ...form, seating: "patio" })}
                    className="accent-[#C83224]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#24201E]">Garden Terrace Patio</p>
                    <p className="text-[11px] text-[#746B63]">Open air, candlelit greenery</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#746B63] block mb-1">
                Special Requests or Dietary Notes
              </label>
              <textarea
                rows={3}
                placeholder="Anniversary celebration, high chair needed, etc."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C83224] hover:bg-[#9F251C] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Table Reservation (Demo)</span>
            </button>

            <p className="text-[11px] text-center text-[#746B63]">
              *Tables are held for 15 minutes past reservation time. Demo flow.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
