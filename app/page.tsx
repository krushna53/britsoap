import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomeContent from "@/components/HomeContent";
import ServicesPreview from "@/components/ServicesPreview";
import { getHomepage, getServices } from "@/lib/contentful";

export const revalidate = 300;

export default async function Index() {
  const data = await getHomepage();
  const services = await getServices();

  if (!data) return null;

  const featuredProducts =
    data.featuredProducts?.map((item) => ({
      name: item.fields.name,
      slug: item.fields.slug,
      imageUrl: item.fields.image?.fields?.file?.url
        ? `https:${item.fields.image.fields.file.url}`
        : "",
    })) || [];

  return (
    <Layout>
      <Hero hero={data} />
      <FeaturedProducts products={featuredProducts} />
      <HomeContent />
      <ServicesPreview services={services} />
    </Layout>
  );
}