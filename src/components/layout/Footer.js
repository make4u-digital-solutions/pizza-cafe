"use client";

import Link from "next/link";
import { BRAND } from "@/data/pizzaData";
import { Flame, Clock, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#24201E] text-[#FFF7EA] pt-16 pb-12 border-t border-[#383330]">
      {/* Pre-footer Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#9F251C] to-[#C83224] p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8D5B8] bg-black/20 px-3 py-1 rounded-full mb-3">
                <Flame className="w-3.5 h-3.5 fill-current text-[#FFF7EA]" />
                Fresh Out of the Wood-Fired Oven
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Your Next Favourite Slice Is Waiting.
              </h2>
              <p className="mt-2 text-white/90 text-sm sm:text-base leading-relaxed">
                Handcrafted dough fermented for 48 hours, stone-baked with Italian San Marzano sauce and authentic fior di latte.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 bg-[#FFF7EA] text-[#C83224] hover:bg-white text-base font-bold px-7 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-100"
              >
                <span>Order Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/reservations"
                className="inline-flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 text-white text-base font-semibold px-6 py-3.5 rounded-full border border-white/20 transition-all"
              >
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#383330]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C83224] text-[#FFF7EA] flex items-center justify-center font-serif text-lg font-bold">
                F
              </div>
              <span className="font-serif text-2xl font-black tracking-tight text-white">
                FORNO
              </span>
            </Link>
            <p className="text-[#E8D5B8]/80 text-sm leading-relaxed max-w-sm">
              Authentic Italian pizzeria crafting artisan stone-baked pizzas with fermented sourdough, heritage San Marzano tomatoes, and artisanal local cheeses.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#383330] hover:bg-[#C83224] text-[#FFF7EA] flex items-center justify-center transition-colors"
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
                className="w-9 h-9 rounded-full bg-[#383330] hover:bg-[#C83224] text-[#FFF7EA] flex items-center justify-center transition-colors"
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
                className="w-9 h-9 rounded-full bg-[#383330] hover:bg-[#C83224] text-[#FFF7EA] flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-white tracking-wide uppercase text-xs">
              Explore FORNO
            </h3>
            <ul className="space-y-2 text-sm text-[#E8D5B8]/80">
              <li>
                <Link href="/" className="hover:text-[#C83224] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#C83224] transition-colors">
                  Interactive Menu
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#C83224] transition-colors">
                  Offers & Bundles
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C83224] transition-colors">
                  Our Story & Craft
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-[#C83224] transition-colors">
                  Table Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-white tracking-wide uppercase text-xs">
              Menu Highlights
            </h3>
            <ul className="space-y-2 text-sm text-[#E8D5B8]/80">
              <li>
                <Link href="/menu?category=classics" className="hover:text-[#C83224] transition-colors">
                  Classics Napoletana
                </Link>
              </li>
              <li>
                <Link href="/menu?category=signature" className="hover:text-[#C83224] transition-colors">
                  Chef&apos;s Signature
                </Link>
              </li>
              <li>
                <Link href="/menu?category=vegetarian" className="hover:text-[#C83224] transition-colors">
                  Garden Vegetarian
                </Link>
              </li>
              <li>
                <Link href="/menu?category=non-vegetarian" className="hover:text-[#C83224] transition-colors">
                  Artisanal Cured Meats
                </Link>
              </li>
              <li>
                <Link href="/menu?category=sides" className="hover:text-[#C83224] transition-colors">
                  Sides & Desserts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-white tracking-wide uppercase text-xs">
              Visit & Contact
            </h3>
            <div className="space-y-2.5 text-xs text-[#E8D5B8]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C83224] shrink-0 mt-0.5" />
                <span>{BRAND.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C83224] shrink-0" />
                <span>{BRAND.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C83224] shrink-0" />
                <span>{BRAND.email}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-[#383330]">
                <Clock className="w-4 h-4 text-[#C83224] shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Fri: {BRAND.hours.weekdays}</p>
                  <p>Sat - Sun: {BRAND.hours.weekends}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#746B63] gap-4">
          <p>
            © 2026 FORNO Pizzeria. All rights reserved. Built as a high-fidelity frontend showcase.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#E8D5B8] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#E8D5B8] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="text-[#4D6B42]">100% Stone-Fired Craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
