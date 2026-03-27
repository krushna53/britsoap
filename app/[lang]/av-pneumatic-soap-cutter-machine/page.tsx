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
    (p) => p.slug === "av-pneumatic-soap-cutter-machine",
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
    (p) => p.slug === "av-pneumatic-soap-cutter-machine",
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
        items={product.importance || []}
        columns={3}
      />

      {product.detailSection && (
        <section className="py-20 bg-gray-100">
          <div className="container grid md:grid-cols-2 gap-20 items-center">
            {/* LEFT */}
            <div className="flex flex-col gap-6">
              {/* MAIN IMAGE */}
              {product.detailSection.images?.[0] && (
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <div className="w-full aspect-[16/10]">
                    <Image
                      src={product.detailSection.images[0]}
                      alt="machine"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="max-w-xl space-y-6">
              {product.detailSection.paragraphs?.map((p, i) => (
                <p
                  key={i}
                  className="text-gray-700 leading-relaxed text-[16.5px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}
     {product.configurations && product.configurations.length > 0 && (
        <ConfigSelector configurations={product.configurations} />
      )}
      <Section
        title={product.applicationTitle}
        className=""
        center
      >
        <div className="max-w-4xl mx-auto">
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
