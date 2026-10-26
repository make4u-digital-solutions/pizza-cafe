"use client";

import Link from "next/link";
import { BRAND } from "@/data/pizzaData";
import { MapPin, Clock, Phone, MessageSquare, Navigation, Calendar, ArrowUpRight } from "lucide-react";

export default function VisitSection() {
  return (
    <section className="py-20 bg-white border-t border-[#E9DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full">
              Dine-In & Takeaway
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#24201E] tracking-tight">
              Visit the Pizzeria
            </h2>

            <p className="text-[#746B63] text-sm sm:text-base leading-relaxed">
              Step into our cozy artisan bakery café filled with the intoxicating aroma of blistered sourdough and bubbling fior di latte. Watch our pizzaiolos stretch dough at the hearth.
            </p>

            <div className="space-y-4 pt-2">
              {/* Address */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFF7EA] border border-[#E9DFD2]">
                <MapPin className="w-5 h-5 text-[#C83224] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#24201E]">Our Location</h4>
                  <p className="text-xs text-[#746B63] mt-0.5">{BRAND.address}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFF7EA] border border-[#E9DFD2]">
                <Clock className="w-5 h-5 text-[#C83224] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#24201E]">Baking & Dining Hours</h4>
                  <p className="text-xs text-[#746B63] mt-0.5">
                    Monday – Friday: {BRAND.hours.weekdays} <br />
                    Saturday – Sunday: {BRAND.hours.weekends}
                  </p>
                </div>
              </div>

              {/* Phone & Direct Contact */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFF7EA] border border-[#E9DFD2]">
                <Phone className="w-5 h-5 text-[#C83224] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#24201E]">Direct Inquiries & Bookings</h4>
                  <p className="text-xs text-[#746B63] mt-0.5">{BRAND.phone}</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=Ciao%20FORNO!%20I%20would%20like%20to%20inquire%20about%20a%20table%20or%20special%20order.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#4D6B42] hover:bg-[#3D5634] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-full transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-full transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </Link>
            </div>
          </div>

          {/* Map Preview & Location Stylized Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFF7EA] p-6 sm:p-8 rounded-3xl border border-[#E9DFD2] shadow-lg relative overflow-hidden">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-[#E8D5B8]/50 border border-[#E9DFD2] flex flex-col items-center justify-center p-6 text-center">
                {/* Visual grid / mock map styling */}
                <div className="absolute inset-0 pattern-dots opacity-40" />

                {/* Map Pin Pulse */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#C83224] text-white flex items-center justify-center shadow-2xl animate-bounce">
                  <MapPin className="w-8 h-8" />
                </div>

                <div className="relative z-10 mt-4 bg-white/90 backdrop-blur-xs p-4 rounded-xl shadow-md border border-[#E9DFD2] max-w-xs">
                  <p className="font-serif font-bold text-sm text-[#24201E]">
                    FORNO Pizzeria & Café
                  </p>
                  <p className="text-[11px] text-[#746B63] mt-0.5">
                    Indiranagar 100ft Road, Bengaluru
                  </p>
                  <span className="inline-block mt-2 text-[10px] bg-[#4D6B42]/10 text-[#4D6B42] font-bold px-2 py-0.5 rounded-full">
                    Free Valet Parking Available
                  </span>
                </div>

                {/* Directions Button overlay */}
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 mt-4 inline-flex items-center gap-1.5 bg-[#24201E] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#C83224] transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#746B63]">
                <span>*Configurable map placeholder for local demonstration.</span>
                <Link href="/contact" className="font-bold text-[#C83224] hover:underline">
                  More Contact Info →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
