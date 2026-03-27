"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

type Props = {
  text: string;
  href?: string;
};

export default function FloatingCTA({ text, href = "#" }: Props) {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 group">
      <Link
        href={href}
        className="bg-accent text-white rounded-l-xl shadow-xl
                   flex items-center justify-end gap-3
                   pl-0 pr-3 py-3 group-hover:pl-5
                   hover:bg-accent/90 transition-all duration-500 ease-in-out h-12 group-hover:h-auto"
      >
        {/* Text — hidden by default, revealed on hover */}
        <span
          className="font-semibold tracking-wide text-sm whitespace-nowrap
                     max-w-0 group-hover:max-w-[200px]
                     overflow-hidden
                     transition-all duration-500 ease-in-out"
        >
          {text}
        </span>

        {/* Icon — always visible */}
        <span className="flex-shrink-0 w-6 flex items-center justify-center">
          <Phone size={18} strokeWidth={2.5} />
        </span>
      </Link>
    </div>
  );
}