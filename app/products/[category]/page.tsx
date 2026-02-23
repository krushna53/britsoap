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
      <section className="py-16 bg-primary text-center">
        <div className="container">
          <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-2">
            {category.title as string}
          </h2>
          <h1 className="text-4xl font-bold text-primary-foreground">
            Products
          </h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product: any) => (
            <div
              key={product.slug}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  {product.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {product.shortDescription}
                </p>

                <Link
                  href={`/products/${slug}/${product.slug}`}
                  className="text-xs uppercase tracking-wider text-accent font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
