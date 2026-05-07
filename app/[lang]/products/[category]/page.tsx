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
      <section className="py-20 bg-background text-center">
        <div className="container">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {categoryData?.title}
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            {categoryData?.title}
          </h1>
          {categoryData?.description && (
            <p className="mt-4 text-primary max-w-2xl mx-auto text-lg">
              {categoryData.description}
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
              className={`w-full h-[280px] md:h-[340px] rounded-2xl border border-border ${
                slug === "soponification" ? "object-contain" : "object-cover"
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
              const cardMinHeight = slug === "soponification" ? "min-h-[800px]" : "min-h-[500px]";
              const imageHeight = "h-56";
              const descriptionClass = "text-sm text-primary-foreground/80 leading-relaxed";
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
    </Layout>
  );
}
