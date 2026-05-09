"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export type FeaturedProduct = {
  name: string;
  slug: string;
  imageUrl: string; // ✅ required
};

type FeaturedProductsProps = {
  products: FeaturedProduct[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section id="featured" className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <div className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Our Products
            </span>
            <div className="w-8 h-0.5 bg-accent" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-primary capitalize"
          >
            Precision Machinery
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={`${product.slug}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <Link href={`/products`} className="group block">
                <div className="overflow-hidden rounded border border-border">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-accent" />
                  <h3 className="text-base font-semibold text-primary group-hover:text-indigo-light transition-colors capitalize">
                    {product.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-indigo-light transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}