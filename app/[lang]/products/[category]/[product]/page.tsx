import { notFound } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import { getCategoryWithProducts } from "@/lib/contentful";
import { getLocalCategoryWithProducts } from "@/data/categories";

type Product = {
  name: string;
  slug: string;
  shortDescription: string;
  imageUrl: string | null;
  order: number;
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; category: string; product: string }>;
}) {
  const { lang, category: categorySlug, product: productSlug } = await params;

  if (!categorySlug || !productSlug) return notFound();

  const localCategory = getLocalCategoryWithProducts(categorySlug);
  if (localCategory) {
    const localProduct = (localCategory.products as any[]).find(
      (p) => p.slug === productSlug
    );

    if (!localProduct) return notFound();

    const image =
      localProduct.detailSection?.images?.[0] || "/placeholder.png";

    return (
      <Layout>
        <section className="py-16 bg-primary text-center">
          <div className="container">
            <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-2">
              {localCategory.title}
            </h2>
            <h1 className="text-4xl font-bold text-primary-foreground">
              {localProduct.title}
            </h1>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Image
                src={image}
                alt={localProduct.title}
                width={600}
                height={400}
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                {localProduct.title}
              </h2>

              <p className="text-muted-foreground mb-6">
                {localProduct.description}
              </p>

              <p className="text-sm text-muted-foreground mb-4">
                Detailed specifications, capacity options, and technical diagrams
                will be published shortly.
              </p>

              <div className="text-sm text-muted-foreground mb-2">
                Category:{" "}
                <span className="font-medium text-primary">
                  {localCategory.title}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                Route:{" "}
                <span className="font-medium text-primary">
                  /{lang}/products/{categorySlug}/{productSlug}
                </span>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const category = await getCategoryWithProducts(categorySlug);

  if (!category) return notFound();

  const product: Product | undefined = category.products.find(
    (p) => p.slug === productSlug
  );

  if (!product) return notFound();

  return (
    <Layout>
      <section className="py-16 bg-primary text-center">
        <div className="container">
          <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-2">
            {category.title}
          </h2>
          <h1 className="text-4xl font-bold text-primary-foreground">
            {product.name}
          </h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-start">
          <div>
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={400}
                className="w-full rounded-lg object-cover"
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {product.name}
            </h2>

            <p className="text-muted-foreground mb-6">
              {product.shortDescription}
            </p>

            <div className="text-sm text-muted-foreground">
              Category:{" "}
              <span className="font-medium text-primary">
                {category.title}
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}