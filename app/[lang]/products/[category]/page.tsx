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

  const products = categoryData.products;

  if (!products || products.length === 0) {
    return notFound();
  }

  return (
    <Layout>
      {/* 🔹 Hero */}
      <section className="py-20 bg-background text-center">
        <div className="container">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {categoryData.title}
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            {categoryData.title} ({products.length})
          </h1>
          {categoryData.description && (
            <p className="mt-4 text-primary max-w-2xl mx-auto text-lg">
              {categoryData.description}
            </p>
          )}
        </div>
      </section>

      {/* 🔹 Products */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {products.map((product: any, i: number) => {
              const productTitle = isLocal ? product.title : product.name;
              const productDesc = isLocal ? product.description : product.shortDescription;
              const productLink = isLocal ? `/${lang}/${product.slug}` : `/${lang}/products/${slug}/${product.slug}`;
              
              let productImg = null;
              if (isLocal) {
                productImg = product.detailSection?.images?.[0] || product.applicationImage || product.importanceImage || product.processSteps?.[0]?.image || null;
              } else {
                productImg = product.imageUrl;
              }

              return (
                <div
                  key={`${product.slug}-${i}`}
                  className="group bg-primary border border-primary rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="overflow-hidden bg-white">
                    {productImg ? (
                      <Image
                        src={productImg}
                        alt={productTitle}
                        width={500}
                        height={300}
                        className="w-full h-56 object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-56 bg-white flex items-center justify-center text-xs text-primary">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow bg-primary text-primary-foreground">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                      {productTitle}
                    </h3>

                    <p className="text-sm text-primary-foreground/80 line-clamp-3 mb-6">
                      {productDesc}
                    </p>

                    {/* CTA */}
                    <Link
                      href={productLink}
                      className="mt-auto inline-flex items-center justify-center text-sm font-semibold text-primary bg-white px-4 py-2 rounded hover:bg-accent hover:text-white transition-colors"
                    >
                      View Details
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
