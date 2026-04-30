import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedProducts, {
  type FeaturedProduct,
} from "@/components/FeaturedProducts";
import HomeAbout from "@/components/HomeAbout";
import HomeImpact from "@/components/HomeImpact";
import HomeCTA from "@/components/HomeCTA";
import type { HomepageData } from "@/types/contentful";
import ServicesPreview from "@/components/ServicesPreview";
import { getHomepage, getServices } from "@/lib/contentful";

export const revalidate = 300;

export default async function Index({
  params,
}: {
  params: Promise<{ lang: string }>; // ✅ FIXED
}) {
  const { lang } = await params; // ✅ FIXED

  const data = (await getHomepage(lang)) as HomepageData;
  const services = await getServices(lang);

  if (!data) return null;

  // ✅ FIXED: use FeaturedProduct type + always string
  const featuredProducts: FeaturedProduct[] =
    data.featuredProducts?.map((item) => ({
      name: item.fields.name,
      slug: item.fields.slug,
      imageUrl: item.fields.image?.fields?.file?.url
        ? `https:${item.fields.image.fields.file.url}`
        : "/placeholder.png", // ✅ ALWAYS STRING
    })) || [];

  return (
    <Layout>
      <Hero hero={data} />
      <FeaturedProducts products={featuredProducts} />
      <HomeAbout data={data} />
      <HomeImpact data={data} />
      <ServicesPreview services={services} />
      <HomeCTA data={data} />
    </Layout>
  );
}