import Image from "next/image";
import Link from "next/link";
import { Sparkles, Flame, Wheat, Heart, Clock, ArrowRight, Award } from "lucide-react";

export const metadata = {
  title: "Our Story & Craft | FORNO Pizza Napoletana",
  description:
    "Learn about FORNO's craft: 48-hour fermented wild sourdough, volcanic San Marzano tomatoes, and 450°C stone-hearth baking.",
};

export default function AboutPage() {
  const steps = [
    {
      num: "01",
      title: "Wild Sourdough Starter",
      desc: "Our dough begins with a live mother culture fed daily with spring water and non-GMO stoneground Italian wheat.",
    },
    {
      num: "02",
      title: "48-Hour Cold Fermentation",
      desc: "Slow proofing in controlled chill allows complex enzymatic development, resulting in fragrant, light, and airy crusts.",
    },
    {
      num: "03",
      title: "Gentle Hand-Stretching",
      desc: "Never touched by rolling pins or mechanical presses. Hand-stretching preserves the delicate air pockets (alveoli).",
    },
    {
      num: "04",
      title: "450°C Stone Hearth Bake",
      desc: "Baked on refractory stone for 90 seconds, producing crisp leopard-spotted cornicione and bubbling molten cheese.",
    },
  ];

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
      caption: "Hand-kneading our sourdough in small daily batches",
    },
    {
      src: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=700&q=80",
      caption: "Our custom 450°C Italian refractory stone oven",
    },
    {
      src: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
      caption: "Crowning the pizza with fresh whole burrata and basil oil",
    },
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80",
      caption: "Warm, ambient dining atmosphere at the café",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF7EA] pb-24">
      {/* Hero Banner */}
      <section className="bg-[#24201E] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#383330] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D5B8] bg-white/10 px-3 py-1 rounded-full mb-3">
            <Flame className="w-3.5 h-3.5 text-[#C83224]" />
            The FORNO Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight">
            Craft, Patience, and Stone-Baked Passion.
          </h1>
          <p className="text-sm sm:text-base text-[#E8D5B8]/80 mt-4 leading-relaxed">
            Founded on the reverence of ancient Neapolitan traditions, FORNO brings the soul of stone-oven pizza to life with modern artisanal touches.
          </p>
        </div>
      </section>

      {/* Brand Story Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full inline-block">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#24201E] tracking-tight">
              From a Passion for the Hearth to Every Single Plate.
            </h2>
            <p className="text-[#746B63] text-sm sm:text-base leading-relaxed">
              FORNO began as a simple quest: why settle for dry, cardboard crusts and artificial sauces when pizza can be an extraordinary culinary experience? We travelled through Campania to learn from master pizzaiolos who have guarded wood-fired ovens for generations.
            </p>
            <p className="text-[#746B63] text-sm sm:text-base leading-relaxed">
              Every pie that leaves our oven is made with heritage San Marzano tomatoes harvested from the foothills of Mount Vesuvius, fresh fior di latte mozzarella, and cold-pressed extra virgin olive oil.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <div>
                <p className="font-serif text-3xl font-black text-[#C83224]">48 hrs</p>
                <p className="text-xs text-[#746B63] mt-0.5">Slow Fermentation</p>
              </div>
              <div className="w-px h-10 bg-[#E9DFD2]" />
              <div>
                <p className="font-serif text-3xl font-black text-[#C83224]">450°C</p>
                <p className="text-xs text-[#746B63] mt-0.5">Hearth Temperature</p>
              </div>
              <div className="w-px h-10 bg-[#E9DFD2]" />
              <div>
                <p className="font-serif text-3xl font-black text-[#C83224]">100%</p>
                <p className="text-xs text-[#746B63] mt-0.5">Pure Natural Dough</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3">
              <Image
                src="https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=900&q=80"
                alt="Baking pizza at FORNO"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Dough & Baking Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full mb-3 inline-block">
            Our Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#24201E] tracking-tight">
            The Craft of Pure Pizza
          </h2>
          <p className="text-sm text-[#746B63] mt-2">
            No shortcuts, no dough conditioners, no premade frozen bases.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-white rounded-3xl p-6 border border-[#E9DFD2] shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl font-black text-[#C83224]">
                  {st.num}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#24201E] mt-3">
                  {st.title}
                </h3>
                <p className="text-xs text-[#746B63] mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Photography Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <h2 className="font-serif text-3xl font-bold text-[#24201E] mb-8 text-center sm:text-left">
          Inside the FORNO Kitchen & Café
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#E9DFD2] shadow-xs group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-[#746B63] font-medium leading-relaxed">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Menu Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-[#24201E] text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-serif text-3xl font-bold text-white">
            Taste the Craft for Yourself
          </h3>
          <p className="text-sm text-[#E8D5B8]/80 max-w-lg mx-auto">
            Experience the difference of authentic dough and stone-hearth baking today.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md hover:scale-105 cursor-pointer text-sm"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
