"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

const PHONE = "tel:+919769466349";

export default function FloatingCTA() {
  return (
    <>
      {/* Desktop: side pill that expands on hover */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 group">
        <Link
          href="/contact"
          className="bg-accent border border-white text-white rounded-l-xl shadow-xl
                     flex items-center justify-end gap-3
                     pl-0 pr-3 py-3 group-hover:pl-5
                     hover:bg-accent/90 transition-all duration-500 ease-in-out h-12 group-hover:h-auto"
        >
          <span
            className="font-semibold tracking-wide text-sm whitespace-nowrap
                       max-w-0 group-hover:max-w-50
                       overflow-hidden
                       transition-all duration-500 ease-in-out"
          >
            Speak With An Engineer
          </span>
          <span className="shrink-0 w-6 flex items-center justify-center">
            <Phone size={18} strokeWidth={2.5} />
          </span>
        </Link>
      </div>

      {/* Mobile: circular button bottom-right that calls directly */}
      <a
        href={PHONE}
        className="md:hidden fixed bottom-6 right-4 z-50 bg-accent text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
        aria-label="Call us"
      >
        <Phone size={22} strokeWidth={2.5} />
      </a>
    </>
  );
}
