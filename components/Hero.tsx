"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

type HeroProps = {
  hero: any;
};

export default function Hero({ hero }: HeroProps) {
  const fileUrl = hero?.heroBackground?.fields?.file?.url;
  const fullUrl = fileUrl ? "https:" + fileUrl : "";

  const isVideo =
    fullUrl?.endsWith(".mp4") ||
    fullUrl?.endsWith(".webm") ||
    fullUrl?.endsWith(".ogg");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={fullUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fullUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-primary/80" />

      <div className="relative z-10 container text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="w-10 h-0.5 bg-accent" />
            <span className="text-accent text-xs font-semibold uppercase tracking-[0.3em]">
              Engineered for Performance
            </span>
            <div className="w-10 h-0.5 bg-accent" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto"
          >
            {hero.heroTitle}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-primary-foreground/60 text-lg mt-4 max-w-lg mx-auto"
          >
            {hero.heroSubtitle}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-primary-foreground/50 text-sm mt-2"
          >
            {hero.heroTagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link
              href="/products"
              className="px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-primary-foreground/30 text-primary-foreground font-medium rounded hover:bg-primary-foreground/10 transition-colors text-sm"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <a
        href="#featured"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/50 animate-scroll-bounce"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown size={20} />
      </a>
    </section>
  );
}
