"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Flame, ChevronRight, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Offers", href: "/offers" },
    { name: "Our Story", href: "/about" },
    { name: "Reservations", href: "/reservations" },
    { name: "Visit Us", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#FFF7EA]/95 backdrop-blur-md shadow-sm border-b border-[#E9DFD2]"
          : "bg-[#FFF7EA] border-b border-[#E9DFD2]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Typographic Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-[#C83224] text-[#FFF7EA] flex items-center justify-center font-serif text-xl font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="relative flex items-center justify-center">
                F
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E8D5B8] rounded-full border border-[#C83224]" />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tight text-[#24201E] group-hover:text-[#C83224] transition-colors leading-none">
                FORNO
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#746B63] mt-1">
                Pizza Napoletana
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors relative ${
                    isActive
                      ? "text-[#C83224]"
                      : "text-[#24201E] hover:text-[#C83224] hover:bg-[#E8D5B8]/30"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#C83224] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative p-2.5 rounded-full text-[#24201E] hover:text-[#C83224] hover:bg-[#E8D5B8]/40 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#C83224] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FFF7EA]"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Desktop Order Now Button */}
            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-[#FFF7EA] text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Order Now</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 rounded-lg text-[#24201E] hover:bg-[#E8D5B8]/30 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#FFF7EA] border-l border-[#E9DFD2] z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#E9DFD2]">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#C83224] text-white flex items-center justify-center font-serif text-lg font-bold">
                      F
                    </div>
                    <span className="font-serif text-xl font-bold text-[#24201E]">
                      FORNO
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-full hover:bg-[#E8D5B8]/50 text-[#746B63]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center justify-between p-3 rounded-xl font-semibold text-base transition-colors ${
                          isActive
                            ? "bg-[#C83224] text-white"
                            : "text-[#24201E] hover:bg-[#E8D5B8]/30"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-[#746B63]"}`} />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-[#E9DFD2] space-y-3">
                <Link
                  href="/menu"
                  className="w-full flex items-center justify-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white font-bold py-3 px-4 rounded-xl shadow-sm text-center transition-colors"
                >
                  <Flame className="w-4 h-4 fill-current" />
                  <span>Explore Menu & Order</span>
                </Link>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#E8D5B8]/30 text-xs text-[#746B63]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <PhoneCall className="w-3.5 h-3.5 text-[#C83224]" />
                    Orders: +91 98765 43210
                  </span>
                  <span className="text-[#4D6B42] font-semibold">Open Now</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
