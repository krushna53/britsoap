"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Settings, Globe, Shield, Wrench } from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

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

export default function HomeAbout({ data }: Props) {
  const imageUrl = data?.aboutImage?.fields?.file?.url
    ? `https:${data.aboutImage.fields.file.url}`
    : "/images/about-factory.jpg";

  return (
    <section className="py-20 bg-surface">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Image
            src={imageUrl}
            alt="About"
            width={800}
            height={500}
            className="rounded-lg w-full h-96 object-cover"
          />
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {/* STATIC LABEL */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-[2px] bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              About BritSoap
            </span>
          </motion.div>

          {/* DYNAMIC TITLE */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-primary mb-6 uppercase"
          >
            {data?.aboutTitle || "Engineering Excellence"}
          </motion.h2>

          {/* DYNAMIC DESCRIPTION */}
          <motion.div
            variants={fadeUp}
            className="text-foreground leading-relaxed mb-6 text-lg"
          >
            {data?.aboutDescription?.nodeType
              ? documentToReactComponents(data.aboutDescription)
              : data?.aboutDescription ||
                "BritSoap is a joint venture between Britannia Soap Machinery Ltd of England and Orum Engineering Pvt Ltd of India."}
          </motion.div>

          {/* STATIC FEATURES */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-5"
          >
            {[
              { icon: Settings, text: "Tailor-made Plants" },
              { icon: Globe, text: "Global Service" },
              { icon: Shield, text: "Best Quality" },
              { icon: Wrench, text: "Full Support" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon size={18} className="text-primary shrink-0" />
                <span className="text-sm text-foreground">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* BUTTON */}
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
  );
}