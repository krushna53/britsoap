import Layout from "@/components/Layout";
import ProductHero from "@/components/ProductHero";
import Section from "@/components/Section";
import Grid from "@/components/Grid";
import Image from "next/image";
import { productPages } from "@/data/productPages";
import { notFound } from "next/navigation";

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

      {product.steps?.length > 0 && (
        <Section title="The Soap Mixing Process" center>
          <Grid items={product.steps} />
        </Section>
      )}

      {product.importance?.length > 0 && (
        <Section
          title={product.importanceTitle}
          description={product.importanceDescription}
          center
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Image
              src={product.importanceImage}
              alt="importance"
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

              {product.detailSection.description.map((para, i) => (
                <p key={i} className="text-gray-600 mb-4 leading-relaxed">
                  {para}
                </p>
              ))}
              {product.detailSection.features?.length > 0 && (
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
              {product.detailSection.optional?.length > 0 && (
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
              <Image
                src={product.detailSection.image}
                alt={product.detailSection.title}
                width={600}
                height={500}
                className="rounded-2xl shadow-lg w-full object-cover"
              />

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
              alt="application"
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
              {/* <p className="text-white/70 text-sm">Production Capacity</p> */}
            </div>
          ))}
        </div>
      </Section>
      <section className="py-28 bg-primary text-white text-center">
        <div className="container max-w-3xl">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Upgrade Your Production Line?
          </h2>

          <p className="text-white/80 text-lg mb-10">
            Talk to our experts and get a customized solution tailored to your
            factory.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold shadow hover:scale-105 transition">
              Speak with Engineer
            </button>

            <button className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
