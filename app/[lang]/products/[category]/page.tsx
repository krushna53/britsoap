import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getCategoryWithProducts } from "@/lib/contentful";
import { getLocalCategoryWithProducts } from "@/data/categories";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}) {
  const { lang, category: slug } = await params;
  const isSaponification = slug === "soponification";

  // Try local hardcoded categories first
  let categoryData = getLocalCategoryWithProducts(slug);
  let isLocal = true;

  if (!categoryData) {
    // Fallback to Contentful
    const contentfulCategory = await getCategoryWithProducts(slug, lang);
    if (!contentfulCategory) return notFound();
    categoryData = contentfulCategory as any;
    isLocal = false;
  }

  const products = categoryData?.products || [];

  if (!products || products.length === 0) {
    return notFound();
  }

  return (
    <Layout>
      {/* 🔹 Hero */}
      <section className="py-20 bg-background text-center">
        <div className="container">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {isSaponification ? "SOAP REACTION SYSTEMS" : categoryData?.title}
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-primary max-w-4xl mx-auto leading-tight">
            {isSaponification
              ? "Saponification Process | Soap Reaction System for Neat Soap Production"
              : categoryData?.title}
          </h1>
          {categoryData?.description && (
            <p className="mt-4 text-primary max-w-4xl mx-auto text-lg leading-relaxed">
              {isSaponification
                ? "Efficient conversion of oils and caustic soda into neat soap for industrial soap manufacturing."
                : categoryData.description}
            </p>
          )}
        </div>
      </section>

      {/* 🔹 Intro Content + Image */}
      <section className="pb-12 bg-background">
        <div className="container max-w-5xl mx-auto space-y-8">
          <div>
            {(isLocal
              ? categoryData?.intro || []
              : [
                  "This product line supports consistent soap processing with quality-focused engineering and practical plant integration.",
                  "Detailed machine-level pages will be added with complete specifications, videos, and application guidance.",
                ]
            ).map((paragraph: string, idx: number) => (
              <p
                key={idx}
                className={`text-lg text-muted-foreground leading-relaxed ${
                  idx === 0 ? "mb-5" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <Image
              src={
                isLocal
                  ? categoryData?.introImage || "/placeholder.png"
                  : "/placeholder.png"
              }
              alt={`${categoryData?.title} overview`}
              width={900}
              height={560}
              className={`w-full rounded-2xl border border-border ${
                isSaponification
                  ? "h-[320px] md:h-[460px] object-contain bg-white/80"
                  : "h-[280px] md:h-[340px] object-cover"
              }`}
            />
          </div>
        </div>
      </section>

      {/* 🔹 Products */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {products.map((product: any, i: number) => {
              const productTitle = isLocal ? product.title : product.name;
              const productDesc = isLocal ? product.description : product.shortDescription;
              const isComingSoon = Boolean(isLocal && product.comingSoon);
              const cardMinHeight = isSaponification ? "min-h-[620px]" : "min-h-[500px]";
              const imageHeight = isSaponification ? "h-48 md:h-52" : "h-56";
              const descriptionClass = isSaponification
                ? "text-xs md:text-sm leading-relaxed text-primary-foreground/80"
                : "text-sm text-primary-foreground/80 line-clamp-4";
              const productLink = isLocal
                ? isComingSoon
                  ? `/${lang}/products/${slug}/${product.slug}`
                  : `/${lang}/${product.slug}`
                : `/${lang}/products/${slug}/${product.slug}`;
              
              let productImg = null;
              if (isLocal) {
                productImg = product.detailSection?.images?.[0] || product.applicationImage || product.importanceImage || product.processSteps?.[0]?.image || null;
              } else {
                productImg = product.imageUrl;
              }

              return (
                <Link
                  key={`${product.slug}-${i}`}
                  href={productLink}
                  className={`group bg-primary border border-primary rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 flex flex-col ${cardMinHeight} max-w-[360px] mx-auto w-full`}
                >
                  {/* Content */}
                  <div className="px-6 py-8 md:py-10 flex flex-col flex-grow bg-primary text-primary-foreground text-center justify-center">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">
                      {productTitle}
                    </h3>

                    <div className="mb-6">
                      {productImg ? (
                        <Image
                          src={productImg}
                          alt={productTitle}
                          width={500}
                          height={300}
                          className={`w-full ${imageHeight} object-cover rounded-xl border border-white/30`}
                        />
                      ) : (
                        <div className={`w-full ${imageHeight} bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-xs text-primary-foreground/80`}>
                          No Image
                        </div>
                      )}
                    </div>

                    <p className={descriptionClass}>
                      {productDesc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {isSaponification && (
        <section className="pb-20 bg-background">
          <div className="container space-y-10">
            {[
              {
                title: "Saponification Crutcher",
                image: "/category-media/soponification/crutcher.png",
                paragraphs: [
                  "The Saponification Crutcher is a batch-type soap reaction vessel used in the semi-boiled soap process, designed for controlled mixing of fatty acids, caustic soda, brine, and water to produce neat soap with consistent quality.",
                  "It is ideal for manufacturers requiring flexibility in formulations, offering precise control over reaction parameters and uniform soap production.",
                  "The Saponification Crutcher is the primary reaction vessel in the semi-boiled saponification process, widely used in industrial soap manufacturing plants. It is designed to efficiently produce a wide variety of soaps and to enable precise mixing of additives, fillers, and liquid soap formulations.",
                  "All raw materials including fatty acids, caustic soda (alkali), brine, and water are accurately dosed into the crutcher and continuously mixed until the saponification reaction is complete, ensuring consistent soap quality and batch uniformity.",
                  "The system is engineered based on a 2-hour cycle time, optimized for high productivity: 30 minutes for charging raw materials, 60 minutes for saponification reaction, and 30 minutes for discharge. Critical parameters such as pump ratings, saponification value of fats, caustic liquor concentration, and reaction temperature play a vital role in achieving efficient and consistent batch cycles.",
                ],
              },
              {
                title: "Saponification Jet",
                image: "/category-media/soponification/jet.png",
                paragraphs: [
                  "The Saponification Jet is a continuous soap manufacturing system that uses steam-driven venturi technology to enable instant saponification, producing up to 90% reacted neat soap directly.",
                  "With no moving parts and low steam consumption, it is ideal for high-capacity soap plants seeking energy-efficient, low-maintenance, and high-speed production.",
                  "The Saponification Jet uses motive steam and venturi vacuum to draw and mix caustic liquor with oils for rapid soap reaction. Its no-moving-parts design supports energy-efficient and low-maintenance operation in high-capacity soap plants.",
                  "The system operates on venturi-driven suction with 5 bar motive steam, enabling controlled and repeatable continuous reaction. Needle valve adjustment allows operators to tune flow, output, and process stability while handling output capacities from 1 to 10 tonnes per hour.",
                  "Its compact and robust build is designed for long-duty industrial operation with minimal mechanical complexity and low steam consumption.",
                ],
              },
            ].map((block, index) => (
              <div
                key={block.title}
                className={`grid gap-8 items-center ${
                  index % 2 === 0
                    ? "md:grid-cols-[1.15fr_0.85fr]"
                    : "md:grid-cols-[0.85fr_1.15fr] md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1"
                }`}
              >
                <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight">
                    {block.title}
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50">
                  <Image
                    src={block.image}
                    alt={block.title}
                    width={900}
                    height={1100}
                    className="h-[420px] md:h-[520px] w-full object-contain p-6"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
