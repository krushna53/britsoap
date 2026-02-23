import Link from "next/link";
import Layout from "@/components/Layout";
import { getCategoriesWithCounts } from "@/lib/contentful";

export default async function ProductsPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <Layout>
      <section className="py-20 bg-primary text-center">
        <div className="container">
          <h1 className="text-4xl font-bold text-primary-foreground">
            Our Products
          </h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="border rounded-lg p-8 text-center hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-primary mb-2">
                {cat.title}
              </h2>

              <p className="text-3xl font-bold text-accent mb-2">{cat.count}</p>

              <p className="text-sm text-muted-foreground">
                Products Available
              </p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
