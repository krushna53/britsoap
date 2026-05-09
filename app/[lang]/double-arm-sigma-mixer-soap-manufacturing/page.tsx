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
                  className="shadow-lg w-full object-cover"
                />
              )}

              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm shadow">
                Industrial Grade
              </div>
            </div>
          </div>
        </section>
      )}

      {/* <Section
        title={product.applicationTitle}
        className="bg-primary text-white"
        center
      >
        <div className="max-w-4xl mx-auto">
          <div className=" rounded-2xl p-8 md:p-10">
            <p className="text-white/80 text-lg leading-relaxed mb-8 text-left">
              {product.applicationDescription}
            </p>
          </div>
        </div>
      </Section> */}
      <section className="bg-[#2E3192] py-20 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold capitalize">
              {product.applicationTitle || "Applications In Production"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {product.applicationImage && (
                <Image
                  src={product.applicationImage}
                  alt={product.applicationTitle || "Applications"}
                  width={600}
                  height={400}
                  className="shadow-2xl w-full object-cover"
                />
              )}
            </div>
            <div>
              <ul className="space-y-4 text-lg mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                  <span className="flex-1">Dual synchronized sigma blades</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                  <span className="flex-1">SS 304 stainless steel body</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                  <span className="flex-1">Heavy-duty bearing assembly</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                  <span className="flex-1">Continuous production support</span>
                </li>
              </ul>
              <div className="text-white/80 leading-relaxed text-lg">
                <p>
                 The Brit Soap Double Sigma Mixer is designed for efficient
        industrial soap manufacturing with synchronized kneading
        and superior material blending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section
        title="Capacity Range"
        description="The Brit Soap soap mixers are available in a wide range of production capacities to suit different manufacturing scales."
        center
      >
        <CapacityRange capacities={product.capacities ?? []} />
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
