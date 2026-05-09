"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

type Props = {
  data: any;
};

export default function HomeImpact({ data }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="container text-center">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-0.5 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Our Impact
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-primary capitalize"
          >
            Trusted Globally
          </motion.h2>
        </motion.div>

        {/* COUNTERS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <Counter
            target={data?.countries || 25}
            suffix="+"
            label="Countries"
          />
          <Counter
            target={data?.plants || 150}
            suffix="+"
            label="Installed Plants"
          />
          <Counter
            target={data?.years || 40}
            suffix="+"
            label="Years Experience"
          />
          <Counter
            target={data?.clients || 500}
            suffix="+"
            label="Clients Served"
          />
        </div>
      </div>
    </section>
  );
}