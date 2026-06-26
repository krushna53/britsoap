"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

type ProductHeroProps = {
  title: string;
  description: string;
  video?: string;
  slug?: string;
};

export default function ProductHero({
  title,
  description,
  video,
  slug,
}: ProductHeroProps) {
  return (
    <section className="product-hero bg-gradient-to-br from-primary to-primary/80 text-white py-20">
      <div className="container grid md:grid-cols-[3fr_2fr] gap-16 items-center">
        <div>
          <p className="uppercase tracking-widest text-white/70 mb-4">
            BRIT SOAP MACHINERY
          </p>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 capitalize">
            {title}
          </h1>

          <p className="text-white/80 text-base mb-8 max-w-xl">{description}</p>

          <div className="flex gap-4">
            <Link
              href="/contact"
              className="bg-accent text-white px-4 py-4 rounded-xl shadow-md 
                   flex items-center justify-center
                   hover:bg-accent/90 transition-all duration-300"
            >
              <span className="font-semibold tracking-wide text-sm">
                Speak With An Engineer
              </span>
            </Link>
          </div>
        </div>

        <div className="relative w-full h-full flex justify-center m-auto">
          {video &&
          (video.endsWith(".mp4") ||
            video.endsWith(".mov") ||
            video.endsWith(".webm")) ? (
            <video
              id="product-video"
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl shadow-2xl w-full h-full object-cover aspect-video"
            />
          ) : (
            slug !== "vacuum-drying-system" && (
              <div className="relative flex items-center justify-center h-100 w-100 overflow-hidden">
                <Image
                  src={video || "/placeholder.png"}
                  alt={title}
                  width={800}
                  height={800}
                  className="max-h-full max-w-full object-contain rounded-2xl"
                />
              </div>
            )
          )}
          <div className="absolute inset-0 -z-10 blur-3xl bg-white/20 rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}