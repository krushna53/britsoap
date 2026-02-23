"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Settings, Globe, Shield, Wrench } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function Counter({
  target,
  label,
  suffix = "",
}: {
  target: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <div className="w-10 h-[2px] bg-accent mx-auto mt-4 mb-3" />
      <p className="text-sm text-white/70 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

export default function HomeContent() {
  return (
    <>
      {/* ABOUT SECTION */}
      <section className="py-24 bg-surface">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/about-factory.jpg"
              alt="BritSoap Factory"
              width={800}
              height={500}
              className="rounded-lg w-full h-96 object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                About BritSoap
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-primary mb-6 uppercase"
            >
              Engineering Excellence
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-foreground leading-relaxed mb-6 text-sm"
            >
              BritSoap is a joint venture between Britannia Soap Machinery Ltd
              of England and Orum Engineering Pvt Ltd of India. We design,
              manufacture, and install complete soap plants with world-class
              precision.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-5">
              {[
                { icon: Settings, text: "Tailor-made Plants" },
                { icon: Globe, text: "Global Service" },
                { icon: Shield, text: "Quality Assurance" },
                { icon: Wrench, text: "Technical Support" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={18} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground">{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <Link
                href="/about"
                className="px-8 py-3 bg-primary text-white text-sm font-medium rounded-md hover:bg-secondary transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-24 bg-primary">
        <div className="container text-center">
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
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Our Impact
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-white uppercase"
            >
              Trusted Globally
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <Counter target={25} suffix="+" label="Countries" />
            <Counter target={150} suffix="+" label="Installed Plants" />
            <Counter target={40} suffix="+" label="Years Experience" />
            <Counter target={500} suffix="+" label="Clients Served" />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-background">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary mb-4 uppercase">
            Ready to Build Your Soap Plant?
          </h2>

          <p className="text-foreground max-w-md mx-auto mb-8 text-sm">
            Get in touch with our team for a custom proposal.
          </p>

          <Link
            href="/contact"
            className="px-10 py-3 bg-primary text-white text-sm font-medium rounded-md hover:bg-secondary transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}