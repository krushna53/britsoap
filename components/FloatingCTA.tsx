"use client";

import Link from "next/link";

type Props = {
  text: string;
  href?: string;
};

export default function FloatingCTA({ text, href = "#" }: Props) {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <Link
        href={href}
        className="bg-accent text-white px-4 py-4 rounded-l-xl shadow-lg 
                   flex items-center justify-center
                   hover:bg-accent/90 transition-all duration-300"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        <span className="font-semibold tracking-wide text-sm">
          {text}
        </span>
      </Link>
    </div>
  );
}