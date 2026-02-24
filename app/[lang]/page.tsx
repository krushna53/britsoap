import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomeAbout from "@/components/HomeAbout";
import HomeImpact from "@/components/HomeImpact";
import HomeCTA from "@/components/HomeCTA";
import ServicesPreview from "@/components/ServicesPreview";
import { getHomepage, getServices } from "@/lib/contentful";

export const revalidate = 300;

export default async function Index({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params; 

  const data = await getHomepage(lang);
  const services = await getServices(lang);

  if (!data) return null;

  const featuredProducts =
    data.featuredProducts?.map((item: any) => ({
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
      <HomeAbout data={data} />
      <HomeImpact data={data} />
      <ServicesPreview services={services} />
      <HomeCTA data={data} />
    </Layout>
  );
}