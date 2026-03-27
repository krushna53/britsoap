import Layout from "@/components/Layout";
import ProductHero from "@/components/ProductHero";
import Section from "@/components/Section";
import Grid from "@/components/Grid";
import Image from "next/image";
import { productPages } from "@/data/productPages";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import RefinerIntro from "@/components/RefinerIntro";
import ImportanceGrid from "@/components/ImportanceGrid";
import ConfigSelector from "@/components/ConfigSelector";

export type Product = {
  slug: string;
  title: string;
  description: string;
  video: string;

  steps: {
    title: string;
    desc: string;
    image: string;
  }[];

  importanceTitle?: string;
  importanceDescription?: string;
  importance?: string[];

  applicationTitle?: string;
  applicationDescription?: string;
  applicationImage?: string;

  capacityTitle?: string;
  capacityDescription?: string;
  capacities?: string[];

  configurations?: {
    title: string;
    desc: string;
    points: string[];
  }[];

  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
};
export async function generateMetadata() {
  const product = productPages.find(
    (p) => p.slug === "high-speed-soap-cutter-machine",
  );

  if (!product) return {};

  return {
    title: product.meta.title,
    description: product.meta.description,
    keywords: product.meta.keywords,
  };
}

export default function ProductPage() {
  const product = productPages.find(
    (p) => p.slug === "high-speed-soap-cutter-machine",
  );

  if (!product) return notFound();

  return (
    <Layout>
      <ProductHero
        title={product.title}
        description={product.description}
        video={product.video}
      />
      {product.refinerIntro && (
        <RefinerIntro
          title={product.refinerIntro.title}
          paragraphs={product.refinerIntro.paragraphs}
        />
      )}
      {product.processSteps?.length && (
        <section className="py-20 bg-gray-50 text-center">
          <div className="container">
            <h2 className="text-4xl font-bold text-primary mb-4">
              {product.processTitle}
            </h2>

            <p className="text-gray-600 mb-16 max-w-3xl mx-auto">
              {product.processDescription}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.processSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow overflow-hidden"
                >
                  <div className="w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.desc}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-gray-600 text-lg leading-relaxed text-left">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <ImportanceGrid
        title={product.importanceTitle}
        description={product.importanceDescription}
        columns={4}
        items={product.importance || []}
      />

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT - IMAGE */}
          <div className="lg:sticky top-24">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={product.detailSection.images?.[0] || ""}
                alt="soap cutting machine"
                width={800}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="max-w-xl">
            {/* LABEL */}
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Machine Overview
            </p>

            {/* TITLE */}
            <h2 className="text-4xl font-extrabold text-primary leading-tight mb-6">
              {product.detailSection.title}
            </h2>

            {/* INTRO */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.detailSection.intro}
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {product.detailSection.features?.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* ICON */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent text-white font-bold text-lg shrink-0">
                    ✓
                  </div>

                  {/* TEXT */}
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* EXTRA TEXT */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.detailSection.extraText}
            </p>

            {/* MODES (SPECIAL HIGHLIGHT BLOCK) */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8">
              <h4 className="text-lg font-bold text-primary mb-4">
                The machine offers dual operating modes 
              </h4>

              <div className="space-y-3">
                {product.detailSection.modes?.map((mode, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent font-bold text-lg">•</span>
                    <span className="text-gray-700">{mode}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONCLUSION */}
            <p className="text-gray-700 leading-relaxed">
              {product.detailSection.conclusion}
            </p>
          </div>
        </div>
      </section>

      <Section title={product.applicationTitle} className="" center>
        <div className="">
          <div className="bg-primary backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl">
            <p className="text-white text-lg leading-relaxed mb-8 text-center">
              {product.applicationDescription}
            </p>
          </div>
        </div>
      </Section>

      {product.ctaSection && (
        <CTASection
          title={product.ctaSection.title}
          description={product.ctaSection.description}
          buttonText={product.ctaSection.buttonText}
          buttonLink={product.ctaSection.buttonLink}
        />
      )}
    </Layout>
  );
}
