"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PIZZAS, SIDES_AND_DRINKS } from "@/data/pizzaData";
import { useCart } from "@/context/CartContext";
import PizzaCustomizer from "@/components/menu/PizzaCustomizer";
import {
  Search,
  X,
  SlidersHorizontal,
  Flame,
  Sparkles,
  Star,
  Plus,
  Eye,
  RotateCcw,
  Pizza,
  UtensilsCrossed,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuClient() {
  const { setQuickViewProduct, addItem } = useCart();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all"); // 'all' | 'veg' | 'non-veg'
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [sortBy, setSortBy] = useState("recommended"); // 'recommended' | 'price-asc' | 'price-desc' | 'name'
  const [viewMode, setViewMode] = useState("pizzas"); // 'pizzas' | 'customizer' | 'sides'

  // Combine items
  const allItems = useMemo(() => {
    return [
      ...PIZZAS.map((p) => ({ ...p, isPizza: true })),
      ...SIDES_AND_DRINKS.map((s) => ({ ...s, isPizza: false, rating: 4.8, reviewsCount: 95 })),
    ];
  }, []);

  // Filter logic
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Category Tab filter
      if (activeTab === "classics" && item.category !== "classics") return false;
      if (activeTab === "vegetarian" && (item.category !== "vegetarian" && item.diet !== "veg")) return false;
      if (activeTab === "non-vegetarian" && (item.category !== "non-vegetarian" && item.diet !== "non-veg")) return false;
      if (activeTab === "signature" && item.category !== "signature") return false;
      if (activeTab === "spicy" && !item.spicy) return false;
      if (activeTab === "sides" && item.isPizza) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category?.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients?.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesIngredients) {
          return false;
        }
      }

      // Dietary filter
      if (dietFilter === "veg" && item.diet !== "veg") return false;
      if (dietFilter === "non-veg" && item.diet !== "non-veg") return false;

      // Spicy toggle
      if (onlySpicy && !item.spicy) return false;

      // Bestseller toggle
      if (onlyBestsellers && !item.bestseller) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // recommended preserves original order
    });
  }, [allItems, activeTab, searchQuery, dietFilter, onlySpicy, onlyBestsellers, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    activeTab !== "all" ||
    dietFilter !== "all" ||
    onlySpicy ||
    onlyBestsellers ||
    sortBy !== "recommended";

  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveTab("all");
    setDietFilter("all");
    setOnlySpicy(false);
    setOnlyBestsellers(false);
    setSortBy("recommended");
  };

  const categories = [
    { id: "all", label: "All Items" },
    { id: "classics", label: "Classics" },
    { id: "signature", label: "Signature Chef's" },
    { id: "vegetarian", label: "Pure Veg" },
    { id: "non-vegetarian", label: "Artisan Meats" },
    { id: "spicy", label: "Spicy & Bold" },
    { id: "sides", label: "Sides, Drinks & Sweets" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF7EA] pb-24">
      {/* 1. Menu Page Hero */}
      <section className="bg-gradient-to-b from-[#24201E] to-[#2D2825] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#383330] relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C83224]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#E8D5B8]/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#C83224] font-semibold">Artisanal Menu</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D5B8] bg-white/10 px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C83224]" />
                Stone Hearth Fresh
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white">
                Find Your Perfect Slice.
              </h1>
              <p className="text-sm sm:text-base text-[#E8D5B8]/80 mt-2 max-w-xl leading-relaxed">
                Classic comfort, bold creations, and a little something for every craving. 48-hour slow fermented dough stone-baked at 450°C.
              </p>
            </div>

            {/* Quick Switcher: Menu vs Customizer */}
            <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/10 text-xs font-bold">
              <button
                onClick={() => setViewMode("pizzas")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                  viewMode === "pizzas"
                    ? "bg-[#C83224] text-white shadow-md"
                    : "text-[#E8D5B8] hover:text-white"
                }`}
              >
                <Pizza className="w-4 h-4" />
                <span>Browse Menu ({allItems.length})</span>
              </button>
              <button
                onClick={() => setViewMode("customizer")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                  viewMode === "customizer"
                    ? "bg-[#C83224] text-white shadow-md"
                    : "text-[#E8D5B8] hover:text-white"
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Build-Your-Own Atelier</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* View Mode: Customizer Atelier */}
      {viewMode === "customizer" ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setViewMode("pizzas")}
              className="text-xs font-bold text-[#C83224] hover:underline flex items-center gap-1 cursor-pointer"
            >
              ← Back to Full Menu
            </button>
          </div>
          <PizzaCustomizer />
        </div>
      ) : (
        /* View Mode: Regular Interactive Menu */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Controls Bar: Search + Category Tabs + Filter Pills + Sorting */}
          <div className="bg-white rounded-3xl p-5 border border-[#E9DFD2] shadow-sm mb-10 space-y-5">
            {/* Top row: Search input + Sorting selector */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#746B63]" />
                <input
                  type="text"
                  placeholder="Search pizzas, ingredients (e.g. burrata, mushrooms, truffle)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-[#FFF7EA] border border-[#E9DFD2] rounded-2xl focus:outline-hidden focus:border-[#C83224] text-[#24201E]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#746B63] hover:text-[#C83224]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-[#746B63] font-semibold hidden md:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FFF7EA] border border-[#E9DFD2] text-[#24201E] text-xs font-bold py-2.5 px-3.5 rounded-2xl focus:outline-hidden focus:border-[#C83224] cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Middle row: Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#C83224] text-white shadow-xs"
                        : "bg-[#FFF7EA] text-[#24201E] hover:bg-[#E8D5B8]/40 border border-[#E9DFD2]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Bottom row: Dietary filter pills & Reset control */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E9DFD2]/60 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#746B63] font-semibold text-[11px] uppercase tracking-wider mr-1">
                  Filters:
                </span>

                {/* Veg filter */}
                <button
                  onClick={() => setDietFilter(dietFilter === "veg" ? "all" : "veg")}
                  className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer font-semibold ${
                    dietFilter === "veg"
                      ? "bg-[#4D6B42] text-white border-[#4D6B42]"
                      : "bg-[#FFF7EA] text-[#24201E] border-[#E9DFD2] hover:border-[#4D6B42]"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#4D6B42]" />
                  <span>Pure Veg</span>
                </button>

                {/* Non-veg filter */}
                <button
                  onClick={() => setDietFilter(dietFilter === "non-veg" ? "all" : "non-veg")}
                  className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer font-semibold ${
                    dietFilter === "non-veg"
                      ? "bg-[#9F251C] text-white border-[#9F251C]"
                      : "bg-[#FFF7EA] text-[#24201E] border-[#E9DFD2] hover:border-[#9F251C]"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#9F251C]" />
                  <span>Non-Veg</span>
                </button>

                {/* Spicy filter */}
                <button
                  onClick={() => setOnlySpicy(!onlySpicy)}
                  className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer font-semibold ${
                    onlySpicy
                      ? "bg-[#C83224] text-white border-[#C83224]"
                      : "bg-[#FFF7EA] text-[#24201E] border-[#E9DFD2] hover:border-[#C83224]"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>Spicy Only</span>
                </button>

                {/* Bestseller filter */}
                <button
                  onClick={() => setOnlyBestsellers(!onlyBestsellers)}
                  className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer font-semibold ${
                    onlyBestsellers
                      ? "bg-[#24201E] text-[#FFF7EA] border-[#24201E]"
                      : "bg-[#FFF7EA] text-[#24201E] border-[#E9DFD2] hover:border-[#24201E]"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>Bestsellers</span>
                </button>
              </div>

              {/* Reset filters */}
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-[#C83224] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between mb-6 text-xs text-[#746B63]">
            <p>
              Showing <strong className="text-[#24201E]">{filteredItems.length}</strong> creations
              {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
            </p>
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E9DFD2] p-12 text-center max-w-lg mx-auto my-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFF7EA] text-[#746B63] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#24201E]">
                No matching slices found
              </h3>
              <p className="text-xs text-[#746B63] leading-relaxed">
                We couldn&apos;t find any items matching your active search or filters. Try adjusting your query or resetting all filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="bg-[#C83224] hover:bg-[#9F251C] text-white text-xs font-bold px-6 py-3 rounded-full transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            /* Varied Menu Grid with Signature Editorial Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, idx) => {
                const isSignatureHero = item.id === "forno-signature" || (idx === 0 && activeTab === "all" && !searchQuery);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`bg-white rounded-3xl border border-[#E9DFD2] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group ${
                      isSignatureHero ? "ring-2 ring-[#C83224]/30" : ""
                    }`}
                  >
                    {/* Image Area */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#24201E]/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs ${
                            item.diet === "veg"
                              ? "bg-[#4D6B42] text-white"
                              : "bg-[#9F251C] text-white"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          {item.diet === "veg" ? "Pure Veg" : "Non-Veg"}
                        </span>

                        {item.spicy && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-[#C83224] text-white shadow-xs">
                            <Flame className="w-3 h-3 fill-current" />
                            Spicy
                          </span>
                        )}
                      </div>

                      {/* Bestseller or Special Badge */}
                      {item.bestseller && (
                        <div className="absolute top-3 right-3 bg-[#FFF7EA] text-[#24201E] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-[#E9DFD2] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C83224]" />
                          Bestseller
                        </div>
                      )}

                      {/* Quick View Button */}
                      <button
                        onClick={() => setQuickViewProduct(item)}
                        className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-[#24201E] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer opacity-90 hover:opacity-100"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#746B63] mb-1.5">
                          <span className="capitalize font-semibold text-[#C83224]">
                            {item.category}
                          </span>
                          {item.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                              <span className="font-bold text-[#24201E]">{item.rating}</span>
                              <span className="text-[11px]">({item.reviewsCount})</span>
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#24201E] group-hover:text-[#C83224] transition-colors">
                          {item.name}
                        </h3>

                        <p className="text-xs text-[#746B63] mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Price & Actions */}
                      <div className="pt-5 mt-5 border-t border-[#E9DFD2] flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-[#746B63] block">
                            {item.isPizza ? "Starting at" : "Price"}
                          </span>
                          <span className="font-serif text-2xl font-black text-[#24201E]">
                            ₹{item.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.isPizza ? (
                            <button
                              onClick={() => setQuickViewProduct(item)}
                              className="px-3 py-2 rounded-xl border border-[#E9DFD2] text-[#24201E] hover:bg-[#FFF7EA] hover:border-[#C83224] transition-colors text-xs font-bold cursor-pointer"
                            >
                              Customize
                            </button>
                          ) : null}

                          <button
                            onClick={() => addItem(item)}
                            className="bg-[#C83224] hover:bg-[#9F251C] text-white px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 font-bold text-xs cursor-pointer"
                          >
                            <Plus className="w-4 h-4 stroke-[3]" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
