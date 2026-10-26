import Link from "next/link";
import { Flame, ArrowRight, Pizza } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#FFF7EA] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#E9DFD2] shadow-xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#C83224]/10 text-[#C83224] flex items-center justify-center mx-auto">
          <Pizza className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#C83224] bg-[#C83224]/10 px-3 py-1 rounded-full">
            404 Error • Page Missing
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#24201E] mt-3">
            Looks Like That Slice Vanished!
          </h1>
          <p className="text-xs sm:text-sm text-[#746B63] mt-2 leading-relaxed">
            The page you are looking for has either been moved or eaten straight from the oven. Let&apos;s get you back to the fresh pizza!
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 bg-[#C83224] hover:bg-[#9F251C] text-white font-bold text-xs px-6 py-3.5 rounded-full transition-colors"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#FFF7EA] hover:bg-[#E8D5B8]/40 text-[#24201E] border border-[#E9DFD2] font-bold text-xs px-6 py-3.5 rounded-full transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
