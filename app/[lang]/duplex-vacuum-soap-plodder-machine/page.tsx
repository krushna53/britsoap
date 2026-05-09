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
};

export async function generateMetadata() {
  const product = productPages.find(
    (p) => p.slug === "duplex-vacuum-soap-plodder-machine",
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
    (p) => p.slug === "duplex-vacuum-soap-plodder-machine",
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

            <p className="text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
              {product.processDescription}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.processSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-white shadow overflow-hidden"
                >
                  <div className="w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={step.image}
                      alt="Duplex vacuum soap plodder machine for billet extrusion"
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
            <div className="flex flex-col gap-6">
              {product.detailSection.images?.[0] && (
                <div className="overflow-hidden shadow-xl">
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
              {product.detailSection.images?.[1] && (
                <div className="overflow-hidden shadow-xl">
                  <div className="w-full aspect-[16/10]">
                    <Image
                      src={product.detailSection.images[1]}
                      alt="machine"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
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
      {product.configurations?.length && (
        <section className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold text-primary text-center mb-16">
              {product.configurationsTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-16">
              {product.configurations.map((config, i) => (
                <div key={i} className="text-center">
                  <Image
                    src={config.image}
                    alt="Duplex vacuum soap plodder machine for billet extrusion"
                    width={400}
                    height={300}
                    className="mx-auto mb-6 shadow-lg"
                  />
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {config.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-left">{config.desc}</p>
                  {config.points?.length > 0 && (
                    <ul className="text-gray-700 space-y-1">
                      {config.points.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
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
              {/* {product.importance && (
                <ul className="space-y-4 text-lg mb-8">
                  {product.importance.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              )} */}
              <div className="text-white/80 leading-relaxed text-lg">
                <p>
           The Brit Soap duplex vacuum plodder is used across a wide range of soap manufacturing environments supporting both standard and specialised soap production lines. The machine removes trapped air, improves product homogeneity, and ensures consistent extrusion of soap bars . It is an important step in the process of soap manufacturing and widely used for producing toilet soap bars, laundry soap bars, and syndet soaps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        title="Capacity Range"
        description="The Brit Soap soap refining machines are available in a wide range of production capacities to suit different manufacturing scales."
        center
      >
        <CapacityRange capacities={product.capacities || []} />
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
