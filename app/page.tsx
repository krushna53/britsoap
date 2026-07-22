import type { Metadata } from "next";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedProducts, {
  type FeaturedProduct,
} from "@/components/FeaturedProducts";
import HomeAbout from "@/components/HomeAbout";
import HomeCTA from "@/components/HomeCTA";
import type { HomepageData } from "@/types/contentful";
import ServicesPreview from "@/components/ServicesPreview";
import { getHomepage, getServices } from "@/lib/contentful";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Industrial Soap Making Machinery & Complete Soap Plant Manufacturer",
  description:
    "Brit Soap Machinery designs and manufactures complete soap production plants — from saponification to finishing, cutting, stamping and packing — for industrial soap manufacturers worldwide.",
  keywords: [
    "soap making machine",
    "soap manufacturing machinery",
    "soap plant manufacturer",
    "industrial soap machinery",
    "complete soap production line",
    "soap making machine manufacturer india",
  ],
};

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
      <HomeCTA data={data} />
    </Layout>
  );
}