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

export default async function Index() {
  const data = (await getHomepage("en")) as HomepageData;
  const services = await getServices("en");

  if (!data) return null;

  const featuredProducts: FeaturedProduct[] = [
    {
      name: "Soap Finishing Line",
      slug: "finishing-line",
      imageUrl: "/images/soap-finishing-line.jpeg",
      description:
        "Complete finishing lines tailored to different production capacities, delivering top-quality soap bars with consistent texture, shape, and appearance.",
    },
    {
      name: "Saponification & Drying Plant",
      slug: "saponification",
      imageUrl: "/images/saponification-drying.jpeg",
      description:
        "Integrated systems for saponification and drying, designed for efficient, large-scale soap production with customizable configurations.",
    },
    {
      name: "Soap Stamping Machines",
      slug: "soap-stampers",
      imageUrl: "/images/soap-stamping.jpeg",
      description:
        "Advanced solutions for stamping all types of soap bars. Our machines ensure precision, speed, and durability, optimizing your soap making process.",
    },
  ];

  return (
    <Layout>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <HomeAbout data={data} />
      <ServicesPreview services={services} />
      <HomeImpact data={data} />
      <HomeCTA data={data} />
    </Layout>
  );
}