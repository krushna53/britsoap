"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { categories, getLocalCategoryWithProducts } from "@/data/categories";

const rootSlugs = [
  "av-pneumatic-soap-cutter-machine",
  "double-arm-sigma-mixer-soap-manufacturing",
  "duplex-vacuum-soap-plodder-machine",
  "high-speed-soap-cutter-machine",
  "simplex-refiner-plodder",
  "triple-roll-mill-soap-refining-machine",
  "soap-cutters",
];

const tabLabels: Record<string, string> = {
  "soap-stampers": "Soap Stampers",
  "saponification": "Saponification",
  "refining-and-plodding": "Refining & Plodding",
  "finishing-line": "Finishing Line",
  "drying-line": "Drying Line",
};

export default function AllProductsPage() {
  const [activeTab, setActiveTab] = useState(categories[0].slug);

  const categoryData = getLocalCategoryWithProducts(activeTab);
  const products = (categoryData?.products || []) as any[];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 pb-8 bg-background">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Our Products
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            Industrial soap manufacturing machinery — engineered for performance, precision, and reliability.
          </p>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div className="sticky top-16 z-40 bg-background border-b border-border shadow-sm">
        <div className="container">
          <div className="flex overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const isActive = activeTab === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveTab(cat.slug)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                    isActive
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-primary hover:border-muted"
                  }`}
                >
                  {tabLabels[cat.slug]}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      isActive
                        ? "bg-accent text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.products.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container">
          {categoryData?.description && (
            <p className="text-muted-foreground mb-10 max-w-3xl text-base">
              {categoryData.description}
            </p>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`grid gap-8 justify-items-center ${
                products.length <= 1
                  ? "grid-cols-1 max-w-95 mx-auto"
                  : products.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-200 mx-auto"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {products.map((product: any, i: number) => {
                const productLink = rootSlugs.includes(product.slug)
                  ? `/${product.slug}`
                  : `/products/${activeTab}/${product.slug}`;

                const productImg =
                  product.detailSection?.images?.[0] ||
                  product.applicationImage ||
                  product.importanceImage ||
                  product.steps?.[0]?.image ||
                  null;

                return (
                  <Link
                    key={`${product.slug}-${i}`}
                    href={productLink}
                    className="group bg-primary rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full max-w-95 h-101.25"
                  >
                    <div className="bg-white m-4 mb-0 overflow-hidden border border-border">
                      {productImg ? (
                        <Image
                          src={productImg}
                          alt={product.title}
                          width={500}
                          height={300}
                          className="w-full h-52 object-contain p-3"
                        />
                      ) : (
                        <div className="w-full h-52 bg-muted flex items-center justify-center text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="px-5 py-5 text-primary-foreground">
                      <h3 className="text-[17px] font-bold mb-2 leading-snug uppercase border-b border-accent line-clamp-2 pb-2">
                        {product.title}
                      </h3>
                      <p className="text-[13px] text-primary-foreground/75 leading-relaxed line-clamp-4 mt-2">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}
