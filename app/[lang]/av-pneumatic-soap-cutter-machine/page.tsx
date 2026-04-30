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

            <p className="text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
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
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-lg border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* ================= LEFT: FEATURES ================= */}
              <div>
                {/* HEADING */}
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-10">
                  Key Features
                </h3>

                {/* FEATURE LIST */}
                <div className="space-y-4">
                  {product.features?.map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      {/* DOT / ICON */}
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-accent text-white text-xs font-bold shrink-0 mt-1">
                        ✓
                      </div>

                      {/* TEXT */}
                      <p className="text-gray-800 leading-relaxed font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CONCLUSION */}
                {/* <p className="mt-8 text-gray-700 leading-relaxed">
                  This combination ensures{" "}
                  <span className="font-semibold text-primary">
                    consistent performance, flexibility, and efficient soap bar
                    production
                  </span>{" "}
                  across varied manufacturing requirements.
                </p> */}
              </div>

              {/* ================= RIGHT: IMAGES ================= */}
              <div className="grid grid-cols-2 gap-6">
                {/* IMAGE 1 */}
                <div className="rounded-3xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/AVC/soap-cutter-embossing-roller.png"
                    alt="roller"
                    width={1100}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* IMAGE 2 */}
                <div className="rounded-3xl overflow-hidden shadow-md bg-gray-100">
                  <Image
                    src="/assets/AVC/soap-sample.png"
                    alt="soap"
                    width={1100}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* IMAGE 3 (BIG) */}
                <div className="col-span-2 rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/assets/AVC/automatic-soap-cutter-embossing-assembly.jpg"
                    alt="machine"
                    width={1100}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {product.configurations && product.configurations.length > 0 && (
        <ConfigSelector configurations={product.configurations} />
      )}
      <div className="bg-primary text-white py-12 md:py-20 px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center leading-snug">
          {product.applicationTitle}
        </h2>

        <div className="max-w-5xl mx-auto pt-6 md:pt-8 text-center">
          {Array.isArray(product.applicationDescription) ? (
            product.applicationDescription.map((desc, i) => (
              <p key={i} className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                {desc}
              </p>
            ))
          ) : (
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              {product.applicationDescription}
            </p>
          )}
        </div>
      </div>

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
