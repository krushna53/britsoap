import Layout from "@/components/Layout";
import ProductHero from "@/components/ProductHero";
import Section from "@/components/Section";
import Grid from "@/components/Grid";
import Image from "next/image";
import { productPages } from "@/data/productPages";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";

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
        <section className="py-20 text-center">
          <div className="container">
            <h2 className="text-4xl font-bold text-primary mb-6">
              {product.refinerIntro.title}
            </h2>

            {product.refinerIntro.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 text-lg mb-4 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      )}
      {product.steps?.length && (
        <Section title="The Soap Mixing Process" center>
          <Grid items={product.steps} />
        </Section>
      )}

      {product.importance?.length && (
        <Section
          title={product.importanceTitle}
          description={product.importanceDescription}
          center
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Image
              src={product.importanceImage}
              alt="Double arm sigma mixer mixing soap base"
              width={500}
              height={400}
              className="rounded-xl shadow-lg"
            />

            <div className="grid gap-4">
              {product.importance.map((item, i) => (
                <div key={i} className="border p-4 rounded-lg shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
      {product.detailSection && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
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
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10 max-w-5xl mx-auto">
          {product.capacities.map((c, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                ⚙️
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{c}</p>
              </div>
            </div>
          ))}
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
