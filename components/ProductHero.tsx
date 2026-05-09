"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

type ProductHeroProps = {
  title: string;
  description: string;
  video?: string;
};

export default function ProductHero({
  title,
  description,
  video,
}: ProductHeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
      <div className="container grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase tracking-widest text-white/70 mb-4">
            BRIT SOAP MACHINERY
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 capitalize">
            {title}
          </h1>

          <p className="text-white/80 text-lg mb-8 max-w-xl">{description}</p>

          <div className="flex gap-4">
            <Link
              href="/en/contact"
              className="bg-accent text-white px-4 py-4 rounded-xl shadow-md 
                   flex items-center justify-center
                   hover:bg-accent/90 transition-all duration-300"
            >
              <span className="font-semibold tracking-wide text-sm">
                Speak With An Engineer
              </span>
            </Link>

            {/* <button
              onClick={() => {
                document
                  .getElementById("product-video")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition"
            >
              Watch Demo
            </button> */}
          </div>
        </div>

        <div className="relative w-full h-full">
          {video && (video.endsWith(".mp4") || video.endsWith(".mov") || video.endsWith(".webm")) ? (
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
            <Image
              src={video || "/placeholder.png"}
              alt={title}
              width={960}
              height={540}
              className="rounded-2xl shadow-2xl w-full h-full object-cover aspect-video"
            />
          )}
          <div className="absolute inset-0 -z-10 blur-3xl bg-white/20 rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}
