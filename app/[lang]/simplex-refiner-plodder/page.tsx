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
                  className="bg-white rounded-xl shadow overflow-hidden"
                >
                  <div className="w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={step.image}
                      alt="Simplex refiner plodder machine for soap manufacturing"
                      loading="eager"
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
      {product.whyPoints?.length && (
        <section className="py-20  text-center">
          <div className="container">
            <h2 className="text-4xl font-bold text-primary mb-14">
              {product.whyTitle}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
              {product.whyPoints.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-100 border border-gray-100 p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition"
                >
                  {/* <div className="text-2xl mb-3 text-primary">✨</div> */}

                  <p className="text-gray-700 text-lg md:text-base font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                      alt="Simplex refiner plodder machine for soap manufacturing"
                      loading="eager"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* SECOND IMAGE */}
              {product.detailSection.images?.[1] && (
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <div className="w-full aspect-[16/10]">
                    <Image
                      src={product.detailSection.images[1]}
                      alt="Simplex refiner plodder machine for soap manufacturing"
                      loading="eager"
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
              loading="eager"
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

      <div className="bg-primary text-white py-12 md:py-20 px-4 md:px-6">
        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center leading-snug">
          {product.applicationTitle}
        </h2>

        {/* CONTENT */}
        <div className="max-w-3xl mx-auto pt-6 md:pt-8">
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed text-center">
            {product.applicationDescription}
          </p>
        </div>
      </div>
      {product.configurations?.length && (
        <section className="py-20 bg-gray-50">
          <div className="container">
            {/* TITLE H2 */}
            <h2 className="text-4xl font-bold text-primary text-center mb-16 text-left">
              {product.configurationsTitle}aaabb
            </h2>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-12">
              {product.configurations.map((config, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition"
                >
                  {/* IMAGE */}
                  <div className="w-full md:w-1/2 h-[220px] md:h-[260px]">
                    <Image
                      src={config.image}
                      alt="machine"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="w-full md:w-1/2 flex">
                    <div className="flex flex-col justify-between w-full p-5 md:p-6 text-left">
                      {/* TITLE */}
                      <h3 className="text-lg md:text-2xl font-semibold text-primary mb-3">
                        {config.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-gray-600 mb-3 text-sm md:text-base">
                        {config.desc}
                      </p>

                      {/* POINTS */}
                      <ul className="text-gray-700 space-y-1">
                        {config.points.map((p, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Section
        title="Capacity Range"
        description="The Brit Soap soap refining machines are available in a wide range of production capacities to suit different manufacturing scales."
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
