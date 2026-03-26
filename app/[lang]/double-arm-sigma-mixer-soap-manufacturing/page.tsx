import Layout from "@/components/Layout";
import ProductHero from "@/components/ProductHero";
import Section from "@/components/Section";
import Grid from "@/components/Grid";
import Image from "next/image";
import { productPages } from "@/data/productPages";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import CapacityRange from "@/components/CapacityRange";
import RefinerIntro from "@/components/RefinerIntro";
import ImportanceGrid from "@/components/ImportanceGrid";
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

  meta: {
    title: string;
    description: string;
    keywords: string[];
  };

  detailSection?: {
    title: string;
    description: string[];
    features?: string[];
    optional?: string[];
    image: string;
  };
};

export async function generateMetadata() {
  const product = productPages.find(
    (p) => p.slug === "double-arm-sigma-mixer-soap-manufacturing",
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
    (p) => p.slug === "double-arm-sigma-mixer-soap-manufacturing",
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
      {product.steps?.length && (
        <Section title="The Soap Mixing Process" center>
          <Grid items={product.steps} />
        </Section>
      )}

      <ImportanceGrid
        title={product.importanceTitle}
        description={product.importanceDescription}
        items={product.importance || []}
      />
      {product.detailSection && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-4 ">
                {product.detailSection.title}
              </h2>

              {product.detailSection?.description?.map((para, i) => (
                <p key={i} className="text-gray-600 mb-4 leading-relaxed">
                  {para}
                </p>
              ))}
              {product.detailSection.optional?.length && (
                <div className="bg-white p-5 rounded-xl shadow-sm border">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Optional Configurations
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {product.detailSection.optional.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              {product.detailSection?.image && (
                <Image
                  src={product.detailSection.image}
                  alt="Double arm sigma mixer mixing soap base"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
              )}

              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm shadow">
                Industrial Grade
              </div>
            </div>
          </div>
        </section>
      )}

      <Section
        title={product.applicationTitle}
        className="bg-primary text-white"
        center
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl">
            <p className="text-white/80 text-lg leading-relaxed mb-8 text-center">
              {product.applicationDescription}
            </p>
          </div>
        </div>
      </Section>
      <Section
        title="Capacity Range"
        description="The Brit Soap soap mixers are available in a wide range of production capacities to suit different manufacturing scales."
        center
      >
        <CapacityRange capacities={product.capacities} />
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
