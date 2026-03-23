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
    (p) => p.slug === "simplex-refiner-plodder",
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
    (p) => p.slug === "simplex-refiner-plodder",
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
      {product.processSteps?.length && (
        <section className="py-24 bg-gray-50 text-center">
          <div className="container">
            <h2 className="text-4xl font-bold text-primary mb-4">
              {product.processTitle}
            </h2>

            <p className="text-gray-600 mb-16 max-w-3xl mx-auto">
              {product.processDescription}
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {product.processSteps.map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <Image
                    src={step.image}
                    alt="Simplex refiner plodder machine for soap manufacturing"
                    width={300}
                    height={200}
                    className="rounded-lg mb-4 mx-auto"
                  />

                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {product.whyPoints?.length && (
        <section className="py-24 text-center">
          <div className="container">
            <h2 className="text-3xl font-bold text-primary mb-12">
              {product.whyTitle}
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {product.whyPoints.map((item, i) => (
                <div
                  key={i}
                  className="px-6 py-3 border rounded-full bg-gray-100 text-gray-700 text-sm shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.detailSection && (
        <section className="py-28 bg-gray-100">
          <div className="container grid md:grid-cols-2 gap-20 items-center">
            {/* LEFT */}
            <div className="flex flex-col gap-8">
              {/* MAIN IMAGE (FIXED HEIGHT) */}
              <div className="bg-white p-4 rounded-3xl shadow-xl">
                <div className="h-[320px] overflow-hidden rounded-2xl">
                  <Image
                    src={product.detailSection.images?.[0]}
                    alt="machine"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* SECOND IMAGE */}
              {product.detailSection.images?.[1] && (
                <div className="bg-white p-3 rounded-2xl shadow-md w-4/5 ml-auto">
                  <div className="h-[180px] overflow-hidden rounded-xl">
                    <Image
                      src={product.detailSection.images[1]}
                      alt="machine"
                      width={400}
                      height={250}
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
                  className="text-gray-700 leading-relaxed text-[17px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
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
              alt="Simplex refiner plodder machine for soap manufacturing"
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
      <Section
        title={product.applicationTitle}
        className="bg-primary text-white"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <Image
              src={product.applicationImage}
              alt="Simplex refiner plodder machine for soap manufacturing"
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
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-white rounded-full mt-2"></span>
                <p className="text-white/80">
                  Used in toilet and laundry soap production
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-white rounded-full mt-2"></span>
                <p className="text-white/80">
                  Ensures uniform blending before refining
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-white rounded-full mt-2"></span>
                <p className="text-white/80">
                  Supports continuous production lines
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      {product.configurations?.length && (
        <section className="py-24 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold text-primary text-center mb-16">
              {product.configurationsTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-16">
              {product.configurations.map((config, i) => (
                <div key={i} className="text-center">
                  <Image
                    src={config.image}
                    alt="Simplex refiner plodder machine for soap manufacturing"
                    width={400}
                    height={300}
                    className="rounded-2xl mx-auto mb-6 shadow-lg"
                  />

                  <h3 className="text-xl font-bold text-primary mb-2">
                    {config.title}
                  </h3>

                  <p className="text-gray-600 mb-4">{config.desc}</p>

                  <ul className="text-gray-700 space-y-1">
                    {config.points.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
