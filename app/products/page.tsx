"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";

import saponificationImg from "@/assets/product-saponification.jpg";
import dryingImg from "@/assets/product-drying.jpg";
import finishingImg from "@/assets/product-finishing.jpg";
import transportImg from "@/assets/product-transport.jpg";
import wrappingImg from "@/assets/product-wrapping.jpg";
import detergentImg from "@/assets/product-detergent.jpg";

const products = [
  {
    category: "Saponification",
    categorySlug: "saponification",
    slug: "crutcher",
    name: "Crutcher",
    desc: "A crutcher is the main reaction vessel in the semi-boiled saponification process. It is used for mixing soap ingredients and additives to produce uniform quality soap.",
    image: saponificationImg,
    features: [
      "Heavy Duty Construction",
      "High Efficiency Mixing",
      "Custom Capacity",
      "Industrial Grade Motor",
    ],
  },
  {
    category: "Drying",
    categorySlug: "drying",
    slug: "condenser",
    name: "Condenser",
    desc: "The water-cooled gas condenser efficiently handles hot gases from the drying process, reducing vacuum pump load and improving energy efficiency.",
    image: dryingImg,
    features: [
      "Energy Efficient",
      "Water Cooled",
      "Vacuum Compatible",
      "Low Maintenance",
    ],
  },
  {
    category: "Finishing",
    categorySlug: "finishing",
    slug: "mixer",
    name: "Mixer",
    desc: "Industrial soap mixers combine liquid, powder, or solid constituents with speed and efficiency. Available in tilting and bottom-discharge types.",
    image: finishingImg,
    features: [
      "Multiple Blade Designs",
      "Bottom Discharge",
      "Tilting Type",
      "Heavy Duty Gearbox",
    ],
  },
  {
    category: "Transport",
    categorySlug: "transport",
    slug: "pneumatic-transport",
    name: "Pneumatic Transport",
    desc: "Efficient pneumatic conveying systems for moving soap noodles, powder, and granules between production stages.",
    image: transportImg,
    features: [
      "Dust-Free Operation",
      "Flexible Routing",
      "Low Energy Consumption",
      "Easy Maintenance",
    ],
  },
  {
    category: "Packaging",
    categorySlug: "packaging",
    slug: "wrapping-machine",
    name: "Wrapping & Packaging",
    desc: "High-speed wrapping and packaging machines designed for attractive presentation and reliable product protection.",
    image: wrappingImg,
    features: [
      "High Speed Operation",
      "Multiple Formats",
      "Quick Changeover",
      "Precision Wrapping",
    ],
  },
  {
    category: "Detergent",
    categorySlug: "detergent",
    slug: "detergent-plant",
    name: "Detergent Plant",
    desc: "Complete detergent manufacturing plants for powder and liquid products, including mixing, drying, and packaging systems.",
    image: detergentImg,
    features: [
      "Powder & Liquid Lines",
      "Spray Drying",
      "Automated Dosing",
      "Integrated Packaging",
    ],
  },
];


const Products = () => (
  <Layout>
    {/* Hero Section */}
    <section className="py-20 bg-primary">
      <div className="container text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-8 h-0.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">
            Our Products
          </span>
          <div className="w-8 h-0.5 bg-accent" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-primary-foreground"
        >
          Industrial Machinery
        </motion.h1>
      </div>
    </section>

    {/* Products */}
    <section className="py-24 bg-background">
      <div className="container space-y-24">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="rounded w-full h-72 lg:h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent" />
              </div>
            </div>

            {/* Content */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-0.5 bg-accent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Product
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {product.name}
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                {product.desc}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-xs text-foreground">{f}</span>
                  </div>
                ))}
              </div>

              {/* FIXED LINK */}
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-2.5 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-indigo-light transition-colors uppercase tracking-wider"
              >
                Enquire Now
              </Link>
            <Link href={`/products/${product.categorySlug}/${product.slug}`}>
  View Details
</Link>


            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-primary">
      <div className="container text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">
          Can&apos;t Find What You Need?
        </h2>
        <p className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-sm">
          We design custom machinery solutions. Contact us to discuss your
          requirements.
        </p>

        {/* FIXED LINK */}
        <Link
          href="/contact"
          className="inline-flex px-10 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  </Layout>
);

export default Products;
