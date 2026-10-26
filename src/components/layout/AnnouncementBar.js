"use client";

import Link from "next/link";
import { Sparkles, Flame, Clock } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#24201E] text-[#FFF7EA] text-xs font-medium py-2 px-4 border-b border-[#383330] relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center p-1 rounded-full bg-[#C83224]/30 text-[#C83224] animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-[#C83224]" />
          </span>
          <span className="tracking-wide">
            Fresh from the stone oven, straight to your table.
          </span>
          <span className="hidden md:inline-block text-[#E8D5B8]/60">•</span>
          <span className="hidden md:inline-block text-[#E8D5B8]">
            Free delivery on orders over ₹499
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[#E8D5B8]/80 text-xs">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C83224]" />
            Dine-in Open: 11:30 AM – 11:00 PM
          </span>
          <Link
            href="/offers"
            className="text-[#FFF7EA] underline hover:text-[#C83224] transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#E8D5B8]" />
            View Today&apos;s Offers
          </Link>
        </div>
      </div>
    </div>
  );
}
