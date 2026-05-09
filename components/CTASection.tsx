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
  showSecondaryButton = true,
}: CTASectionProps & { showSecondaryButton?: boolean }) {
  return (
    <section className="py-20 bg-primary text-white text-center">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight capitalize">
          {title}
        </h2>

        <p className="text-white/80 text-lg mb-10 leading-relaxed">
          {description}
        </p>

        <div className="flex justify-center gap-4">
          {buttonLink ? (
            <Link
              href={buttonLink}
              className="bg-accent text-white px-4 py-4 rounded-xl shadow-md 
                   flex items-center justify-center
                   hover:bg-accent/90 transition-all duration-300"
            >
              <span className="font-semibold tracking-wide text-sm">
                {buttonText}
              </span>
            </Link>
          ) : (
            <button
              className="bg-accent text-white px-4 py-4 rounded-xl shadow-md 
                   flex items-center justify-center
                   hover:bg-accent/90 transition-all duration-300"
            >
              <span className="font-semibold tracking-wide text-sm">
                {buttonText}
              </span>
            </button>
          )}
          {showSecondaryButton && (
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-6 py-4 rounded-xl shadow-md flex items-center justify-center hover:bg-[#1ebd5b] transition-all duration-300"
            >
              <span className="font-semibold tracking-wide text-sm">
                Connect With Engineer
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
