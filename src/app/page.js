import HeroSection from "@/components/home/HeroSection";
import QualityStrip from "@/components/home/QualityStrip";
import SignaturePizzas from "@/components/home/SignaturePizzas";
import PizzaCustomizer from "@/components/menu/PizzaCustomizer";
import OffersSection from "@/components/home/OffersSection";
import OurCraft from "@/components/home/OurCraft";
import HowItWorks from "@/components/home/HowItWorks";
import CustomerLove from "@/components/home/CustomerLove";
import VisitSection from "@/components/home/VisitSection";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "FORNO — Pizza, Made with Passion | Authentic Italian Pizzeria",
  description:
    "Hand-stretched dough fermented for 48 hours, stone-baked with San Marzano tomatoes and authentic fior di latte in our 450°C oven. Explore our menu and order online.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Quality Highlights Strip */}
      <QualityStrip />

      {/* 3. Signature Pizzas */}
      <SignaturePizzas />

      {/* 4. The Interactive Pizza Experience Section */}
      <section className="py-20 bg-[#FFF7EA] border-t border-[#E9DFD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Bespoke Pizza Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#24201E] tracking-tight">
              Craft Your Masterpiece
            </h2>
            <p className="text-sm sm:text-base text-[#746B63] mt-2">
              Select your dough, crust, melting cheeses, and fresh toppings. We fire it in our stone hearth to your exact craving.
            </p>
          </div>

          <PizzaCustomizer />
        </div>
      </section>

      {/* 5. Offers & Combos */}
      <OffersSection />

      {/* 6. Our Craft Story */}
      <OurCraft />

      {/* 7. How It Works */}
      <HowItWorks />

      {/* 8. Customer Love / Testimonials */}
      <CustomerLove />

      {/* 9. Visit FORNO / Location */}
      <VisitSection />
    </main>
  );
}
