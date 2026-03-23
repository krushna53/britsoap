import React from "react";

type ProductHeroProps = {
  title: string;
  description: string;
  video: string;
};

export default function ProductHero({
  title,
  description,
  video,
}: ProductHeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-28">
      <div className="container grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT */}
        <div>
          <p className="uppercase tracking-widest text-white/70 mb-4">
            BRIT SOAP MACHINERY
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            {title}
          </h1>

          <p className="text-white/80 text-lg mb-8 max-w-xl">
            {description}
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition">
              Request Details
            </button>

            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition">
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl shadow-2xl w-full"
          />

          {/* Glow effect */}
          <div className="absolute -z-10 inset-0 blur-3xl bg-white/20 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}