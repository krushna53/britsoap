"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type Props = {
  data: any;
};

export default function HomeCTA({ data }: Props) {
  return (
    <section className="py-20 bg-primary">
      <div className="container text-center">

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-primary-foreground mb-4"
        >
          {data?.ctaTitle || "Ready to Build Your Soap Plant?"}
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-sm"
        >
          {data?.ctaText ||
            "Get in touch with our team for a custom proposal."}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm"
          >
            Get a Free Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}