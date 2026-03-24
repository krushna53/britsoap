"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Eye,
  Shield,
  Lightbulb,
  Globe,
  Award,
} from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function AboutClient({ data }: any) {
  const imageUrl = data.image?.fields?.file?.url
    ? `https:${data.image.fields.file.url}`
    : "/images/about-factory.jpg"; // fallback

  const icons = [Award, Shield, Target, Lightbulb, Globe, Eye];

  const values =
    (data.values || []).map((item: any, index: number) => ({
      title: item.fields.title,
      description: item.fields.description,
      Icon: icons[index % icons.length],
    })) || [];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-3 mb-3"
            >
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">
                About Us
              </span>
              <div className="w-8 h-0.5 bg-accent" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-primary-foreground"
            >
              Who We Are
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Image
                  src={imageUrl}
                  alt="About"
                  width={600}
                  height={400}
                  className="rounded w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent" />
              </div>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold text-primary mb-6"
              >
                {data.heroTitle}
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="text-muted-foreground text-sm leading-relaxed mb-4"
              >
                {data.introduction &&
                  (data.introduction.nodeType
                    ? documentToReactComponents(data.introduction)
                    : data.introduction)}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="py-20 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-background rounded border-l-4 border-accent"
            >
              <h3 className="text-lg font-bold text-primary mb-3">
                Our Vision
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {data.vision}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="p-10 bg-background rounded border-l-4 border-primary"
            >
              <h3 className="text-lg font-bold text-primary mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {data.mission}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">

            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Our Values
              </span>
              <div className="w-8 h-0.5 bg-accent" />
            </div>

            <h2 className="text-3xl font-bold text-primary">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(({ Icon, title, description }: any, i: number) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 rounded border border-border hover:border-primary/30 transition-colors"
              >
                <Icon size={24} className="text-accent mb-4" />
                <h3 className="text-base font-semibold text-primary mb-2">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Partner With Us
          </h2>
          <p className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-sm">
            Let's discuss how we can build your next project.
          </p>

          <Link
            href="/contact"
            className="inline-flex px-10 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}