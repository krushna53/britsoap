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
        <section className="py-24 text-center">
          <div className="container max-w-4xl">
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

              {product.detailSection && (
                <section className="py-28 bg-gray-100">
                  <div className="container grid md:grid-cols-2 gap-20 items-center">
                    {/* LEFT → IMAGES */}
                    <div className="flex flex-col gap-8">
                      {product.detailSection.images?.map((img, i) => (
                        <div
                          key={i}
                          className="bg-white p-4 rounded-3xl shadow-xl"
                        >
                          <div className="h-[300px] overflow-hidden rounded-2xl">
                            <Image
                              src={img}
                              alt="machine"
                              width={600}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* RIGHT → TEXT */}
                    <div className="max-w-xl space-y-6">
                      {product.detailSection.paragraphs?.map((para, i) => (
                        <p
                          key={i}
                          className="text-gray-700 leading-relaxed text-[17px]"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </section>
              )}
              {product.detailSection.features?.length && (
                <div className="space-y-2 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Key Features:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {product.detailSection.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
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
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <Image
              src={product.applicationImage}
              alt="Double arm sigma mixer mixing soap base"
              width={600}
              height={450}
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
            <div className="absolute -z-10 inset-0 bg-white/10 blur-3xl rounded-full"></div>
          </div>

          <div>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
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
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {product.capacities.map((c, i) => (
            <div
              key={i}
              className="group bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-2xl shadow-lg text-center transition hover:scale-105 hover:shadow-2xl"
            >
              <p className="text-3xl font-bold mb-2">{c}</p>
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
