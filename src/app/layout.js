import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/menu/QuickViewModal";
import Toast from "@/components/ui/Toast";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "FORNO — Pizza, Made with Passion | Artisanal Neapolitan Pizzeria",
  description:
    "Hand-stretched dough fermented for 48 hours, stone-baked with San Marzano tomatoes and authentic fior di latte in our 450°C oven.",
  keywords: [
    "pizza",
    "neapolitan pizza",
    "artisan pizza",
    "stone baked",
    "sourdough pizza",
    "FORNO pizzeria",
    "pizza delivery",
  ],
  openGraph: {
    title: "FORNO — Pizza, Made with Passion",
    description: "Authentic stone-hearth pizza café. Explore our interactive menu.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${plusJakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF7EA] text-[#24201E]">
        <CartProvider>
          {/* Top announcement bar */}
          <AnnouncementBar />

          {/* Sticky header */}
          <Navbar />

          {/* Page contents */}
          <div className="flex-1">{children}</div>

          {/* Footer */}
          <Footer />

          {/* Shared interactive drawers & modals */}
          <CartDrawer />
          <QuickViewModal />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
