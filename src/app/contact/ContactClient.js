"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/data/pizzaData";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.email.trim() || !form.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim() || form.message.length < 5) {
      newErrors.message = "Please write a message (at least 5 characters).";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFF7EA] pb-24">
      {/* Header */}
      <section className="bg-[#24201E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#383330]">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[#E8D5B8]/80 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#C83224] font-semibold">Contact & Location</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white">
            Visit Us or Say Ciao
          </h1>
          <p className="text-sm sm:text-base text-[#E8D5B8]/80 mt-2 max-w-xl">
            We love hearing from fellow pizza enthusiasts, private event hosts, and hungry guests. Reach out or drop by the pizzeria.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details, hours, WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFD2] shadow-xs space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#24201E]">
                Pizzeria Information
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#746B63]">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF7EA] border border-[#E9DFD2] text-[#C83224] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#24201E]">Café Address</h4>
                    <p className="mt-0.5 leading-relaxed">{BRAND.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF7EA] border border-[#E9DFD2] text-[#C83224] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#24201E]">Baking & Dining Hours</h4>
                    <p className="mt-0.5">Weekdays: {BRAND.hours.weekdays}</p>
                    <p>Weekends: {BRAND.hours.weekends}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF7EA] border border-[#E9DFD2] text-[#C83224] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#24201E]">Phone Call</h4>
                    <p className="mt-0.5">{BRAND.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF7EA] border border-[#E9DFD2] text-[#C83224] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#24201E]">Email Inquiries</h4>
                    <p className="mt-0.5">{BRAND.email}</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-[#E9DFD2]">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=Ciao%20FORNO!%20I%20have%20a%20question%20about%20your%20menu.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#4D6B42] hover:bg-[#3D5634] text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-xs text-xs sm:text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant Message on WhatsApp</span>
                </a>
              </div>

              {/* Social Channels with clean SVGs */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[#746B63]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#FFF7EA] hover:bg-[#C83224] hover:text-white border border-[#E9DFD2] flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#FFF7EA] hover:bg-[#C83224] hover:text-white border border-[#E9DFD2] flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.582 9 4.615V8z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full bg-[#FFF7EA] hover:bg-[#C83224] hover:text-white border border-[#E9DFD2] flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFD2] shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-[#24201E] mb-2">
                Send a Message
              </h2>
              <p className="text-xs text-[#746B63] mb-6">
                Have questions regarding dietary restrictions, catering, or private bookings? Send us a message below.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-[#FFF7EA] rounded-2xl border border-[#E9DFD2] space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#4D6B42]/10 text-[#4D6B42] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#24201E]">
                    Message Received!
                  </h3>
                  <p className="text-xs text-[#746B63] max-w-sm mx-auto">
                    Grazie, {form.name}. Our café team has recorded your demo message and will respond shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
                    }}
                    className="text-xs font-bold text-[#C83224] hover:underline pt-2 inline-block cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#746B63] block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sofia Loren"
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
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="sofia@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-[#C83224] mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#746B63] block mb-1">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224] cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Event & Catering">Private Event & Catering</option>
                      <option value="Dietary & Allergen Question">Dietary & Allergen Question</option>
                      <option value="Feedback on Slices">Feedback on Slices</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#746B63] block mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="How can we help make your pizza experience unforgettable?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FFF7EA] border border-[#E9DFD2] rounded-xl focus:outline-hidden focus:border-[#C83224]"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-[#C83224] mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C83224] hover:bg-[#9F251C] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>

                  <p className="text-[11px] text-center text-[#746B63]">
                    *Simulated contact submission for frontend showcase.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
