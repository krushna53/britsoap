import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getCategoryWithProducts } from "@/lib/contentful";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;

  const category = await getCategoryWithProducts(slug);

  if (!category) return notFound();

  const products = category.products;

  if (!products || products.length === 0) {
    return notFound();
  }


return (
  <Layout>
    {/* 🔹 Hero */}
    <section className="py-20 bg-primary text-center">
      <div className="container">
        <h2 className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-3">
          {category.title}
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
          {dict.products}
        </h1>
      </div>
    </section>

    {/* 🔹 Products */}
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <div
              key={`${product.slug}-${i}`}
              className="group bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                  {product.shortDescription}
                </p>

                {/* CTA */}
                <Link
                  href={`/products/${slug}/${product.slug}`}
                  className="mt-auto inline-flex items-center text-sm font-medium text-accent hover:underline"
                >
                  View Details
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);
}
