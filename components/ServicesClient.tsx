"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "@/components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  PenTool,
  Truck,
  Wrench,
  Headphones,
  Cog,
  BarChart3,
} from "lucide-react";

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

      {/* SERVICES GRID */}
      <section className="py-24 bg-background">
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

                  <h3 className="text-base font-semibold text-primary mb-2">
                    {item.title}
                  </h3>

                  <div className="text-xs text-muted-foreground leading-relaxed">
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
      <section className="py-24 bg-surface">
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
                <h3 className="text-base font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">
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
          <p className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-sm">
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