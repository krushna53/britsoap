import Link from "next/link";
import Layout from "@/components/Layout";
import { getCategoriesWithCounts } from "@/lib/contentful";

type Category = {
  title: string;
  slug: string;
  count: number;
};

export default async function ProductsPage() {
  const categories: Category[] = await getCategoriesWithCounts();

  return (
    <Layout>
      <section className="py-24 bg-primary text-center">
        <div className="container">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-3">
            Our Range
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Product Categories
          </h1>
        </div>
      </section>
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {categories.map((cat, i) => (
              <Link
                key={`${cat.slug}-${i}`}
                href={`/products/${cat.slug}`}
                className="group relative border border-border rounded-xl p-8 bg-white hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                    {cat.title}
                  </h2>

                  <p className="text-4xl font-bold text-accent mb-2">
                    {cat.count}
                  </p>

                  <p className="text-sm text-muted-foreground mb-6">
                    Products Available
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-accent transition">
                    Explore Category
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
