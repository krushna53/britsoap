"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "@/components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { aboutData } from "@/data/aboutData";

import {
  PenTool,
  Truck,
  Wrench,
  Headphones,
  Cog,
  BarChart3,
  FlaskConical,
  Package,
  Globe,
  Cpu,
  HardHat,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  FlaskConical,
  Package,
  Globe,
  Cpu,
  HardHat,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ✅ ICONS (static, not from CMS)
const icons = [PenTool, Cog, Truck, BarChart3, Wrench, Headphones];

type Props = {
  services: any[];
};

export default function ServicesClient({ services }: Props) {
  return (
    <Layout>
      {/* HEADER */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">
              What We Offer
            </span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            Our Services
          </motion.h1>
        </div>
      </section>

      {/* ABOUT DATA SERVICES GRID */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-primary mb-6">
              {aboutData.services.heading}
            </h2>
            <div className="space-y-3 max-w-4xl mx-auto">
              {aboutData.services.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-lg text-muted-foreground leading-relaxed text-left"
                >
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-8 text-xl font-bold text-primary tracking-wide border-l-4 border-accent pl-4 inline-block">
              {aboutData.services.tagline}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.services.items.map(({ icon, title, desc }, i) => {
              const Icon = ICON_MAP[icon];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-xl p-8 border border-border hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      {Icon && <Icon size={22} className="text-accent" />}
                    </div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-primary-foreground mb-3 transition-colors">
                      {title}
                    </h3>
                    <p className="text-lg text-muted-foreground group-hover:text-primary-foreground leading-relaxed transition-colors">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES GRID */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, i) => {
              const Icon = icons[i % icons.length];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-8 rounded border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded bg-primary flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary-foreground" />
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {item.title}
                  </h3>

                  <div className="text-lg text-muted-foreground leading-relaxed">
                    {item.description &&
                      documentToReactComponents(item.description)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS (STATIC) */}
      <section className="py-20 bg-surface">
        <div className="container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Our Process
              </span>
              <div className="w-8 h-0.5 bg-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your requirements and goals." },
              { step: "02", title: "Design", desc: "Custom plant design optimized for your needs." },
              { step: "03", title: "Manufacturing", desc: "Precision manufacturing with strict QC." },
              { step: "04", title: "Delivery", desc: "Installation, commissioning, and support." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-lg">
            Our engineering team is ready to design a solution for your specific requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm"
          >
            Request a Consultation
          </Link>
        </div>
      </section>
    </Layout>
  );
}