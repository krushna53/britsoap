"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import {
  FlaskConical,
  Package,
  Globe,
  Cpu,
  HardHat,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { aboutData } from "@/data/aboutData";

const ICON_MAP: Record<string, React.ElementType> = {
  FlaskConical,
  Package,
  Globe,
  Cpu,
  HardHat,
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as any,
      delay: i * 0.1,
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

type Props = {
  data: any; // you can type later properly
};

export default function AboutClient({ data }: Props) {
  const { hero, stats, about, whyUs, globalReach, services, cta } = aboutData;

  return (
    <>
      <section className="relative overflow-hidden bg-primary min-h-[52vh] flex items-center">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -right-32 -top-32 w-[520px] h-[520px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="container relative z-10 py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-accent mb-6"
            >
              <span className="w-6 h-px bg-accent" />
              {hero.label}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-extrabold text-primary-foreground leading-[1.08] mb-6"
            >
              {hero.heading}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-primary-foreground/65 text-base leading-relaxed max-w-xl"
            >
              {hero.tagline}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-accent">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-accent-foreground/20">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="py-8 px-6 text-center"
              >
                <p className="text-3xl font-extrabold text-accent-foreground">
                  {value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground/70 mt-1">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4"
              >
                <span className="w-5 h-px bg-accent" />
                {about.label}
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="text-4xl font-extrabold text-primary leading-tight mb-6"
              >
                {about.heading}
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="space-y-4 text-sm text-muted-foreground leading-relaxed"
              >
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-8 text-sm font-bold text-accent tracking-wide"
              >
                {about.tagline}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="bg-primary rounded-2xl p-10 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, var(--color-accent) 1.5px, transparent 1.5px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10 space-y-6">
                  {about.highlights.map(({ head, sub }) => (
                    <div key={head} className="flex items-start gap-4">
                      <CheckCircle2
                        size={18}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-sm font-semibold text-primary-foreground">
                          {head}
                        </p>
                        <p className="text-xs text-primary-foreground/55">
                          {sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-accent/30 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent mb-3">
              <span className="w-5 h-px bg-accent" />
              {whyUs.label}
              <span className="w-5 h-px bg-accent" />
            </span>
            <h2 className="text-3xl font-extrabold text-primary">
              {whyUs.label}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.items.map(({ title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group bg-background rounded-xl p-7 border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-8 h-0.5 bg-accent mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="text-sm font-bold text-primary mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4"
              >
                <span className="w-5 h-px bg-accent" />
                {globalReach.label}
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="text-4xl font-extrabold text-primary-foreground leading-tight mb-6"
              >
                {globalReach.heading}
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="space-y-4 text-sm text-primary-foreground/65 leading-relaxed"
              >
                {globalReach.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full">
                {/* Stat badge overlaid on top-right of the map */}
                <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground rounded-xl px-4 py-2 text-center shadow-lg">
                  <p className="text-3xl font-extrabold leading-none">
                    {globalReach.stat.value}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mt-0.5">
                    {globalReach.stat.label}
                  </p>
                </div>

                <img
                  src="/BritWorldMap.png"
                  alt="Brit Soap Machinery global presence map"
                  className="w-full h-auto object-contain opacity-90"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent mb-3">
              <span className="w-5 h-px bg-accent" />
              {services.label}
            </span>
            <h2 className="text-4xl font-extrabold text-primary mb-4">
              {services.heading}
            </h2>
            <div className="space-y-3">
              {services.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-5 text-sm font-bold text-primary tracking-wide">
              {services.tagline}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.items.map(({ icon, title, desc }, i) => {
              const Icon = ICON_MAP[icon];
              return (
                <motion.div
                  key={title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group relative rounded-xl p-8 border border-border hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      {Icon && <Icon size={22} className="text-accent" />}
                    </div>
                    <h3 className="text-base font-bold text-primary group-hover:text-primary-foreground mb-3 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/60 leading-relaxed transition-colors">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent">
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-extrabold text-accent-foreground mb-4"
            >
              {cta.heading}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-accent-foreground/70 max-w-md mx-auto mb-10 text-sm leading-relaxed"
            >
              {cta.desc}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href={cta.buttonHref}
                className="inline-flex items-center gap-2 px-10 py-3.5 bg-accent-foreground text-accent font-bold rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                {cta.buttonText}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
