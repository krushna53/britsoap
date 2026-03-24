import React from "react";
import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
};

export default function CTASection({
  title,
  description,
  buttonText,
  buttonLink,
}: CTASectionProps) {
  return (
    <section className="py-20 bg-primary text-white text-center">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h2>

        <p className="text-white/80 text-lg mb-10 leading-relaxed">
          {description}
        </p>

        <div className="flex justify-center gap-4">
          {buttonLink ? (
            <Link
              href={buttonLink}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
            >
              {buttonText}
            </Link>
          ) : (
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold shadow hover:scale-105 transition">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
