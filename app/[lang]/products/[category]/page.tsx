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
      <section className="pt-20 pb-6 bg-background">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-left capitalize">
            {categoryData?.title}
          </h1>
          {slug !== "drying-line" && categoryData?.description && (
            <p className="mt-4 text-primary text-lg text-left">
              {categoryData.description}
            </p>
          )}
        </div>
      </section>

      {/* 🔹 Intro Content + Image */}
      <section className={`pt-2 bg-background ${slug === "finishing-line" || slug === "soap-stampers" ? "pb-0" : "pb-12"}`}>
        <div className="container space-y-8">
          <div>
            {slug === "drying-line" && categoryData?.description && (
              <p className="text-lg text-primary mb-5">
                {categoryData.description}
              </p>
            )}

            {(isLocal
              ? categoryData?.intro || []
              : [
                "This product line supports consistent soap processing with quality-focused engineering and practical plant integration.",
                "Detailed machine-level pages will be added with complete specifications, videos, and application guidance.",
              ]
            ).map((paragraph: string, idx: number) => (
              <p
                key={idx}
                className={`text-lg text-muted-foreground leading-relaxed ${idx === 0 ? "mb-5" : ""
                  }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          {slug !== "soap-stampers" && slug !== "finishing-line" && (
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
                className={`w-full ${slug === "drying-line"
                  ? "h-[380px] md:h-[460px]"
                  : "h-[280px] md:h-[340px]"
                  } rounded-2xl ${slug === "saponification" || slug === "drying-line"
                    ? "object-contain"
                    : "object-cover"
                  }`}
              />
            </div>
          )}
        </div>
      </section>

      {/* 🔹 Products */}
      <section className={`bg-background ${slug === "finishing-line" || slug === "soap-stampers" ? "pt-8 pb-20" : "py-20"}`}>
        <div className="container">
          <div className={`grid gap-8 justify-items-center ${
            products.length === 1
              ? "grid-cols-1 max-w-95 mx-auto"
              : products.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-[800px] mx-auto"
              : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          }`}>
            {products.map((product: any, i: number) => {
              const productTitle = isLocal ? product.title : product.name;
              const productDesc = isLocal ? product.description : product.shortDescription;
              const rootSlugs = [
                "av-pneumatic-soap-cutter-machine",
                "double-arm-sigma-mixer-soap-manufacturing",
                "duplex-vacuum-soap-plodder-machine",
                "high-speed-soap-cutter-machine",
                "simplex-refiner-plodder",
                "triple-roll-mill-soap-refining-machine",
              ];

              const productLink = isLocal
                ? rootSlugs.includes(product.slug)
                  ? `/${lang}/${product.slug}`
                  : `/${lang}/products/${slug}/${product.slug}`
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
                  className="group bg-primary rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full max-w-95 h-101.25"
                >
                  {/* Image */}
                  <div className="bg-white m-4 mb-0 overflow-hidden border border-border">
                    {productImg ? (
                      <Image
                        src={productImg}
                        alt={productTitle}
                        width={500}
                        height={300}
                        className="w-full h-52 object-contain p-3"
                      />
                    ) : (
                      <div className="w-full h-52 bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="px-5 py-5 text-primary-foreground">
                    <h3 className="text-[17px] font-bold mb-2 leading-snug uppercase border-b border-[#e21e2d] line-clamp-2">
                      {productTitle}
                    </h3>
                    <p className="text-[13px] text-primary-foreground/75 leading-relaxed line-clamp-4">
                      {productDesc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
