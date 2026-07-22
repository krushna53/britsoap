import type { Metadata } from "next";
import Layout from "@/components/Layout";
import AboutClient from "@/components/AboutClient";
import { getAboutPage } from "@/lib/contentful";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About Us | Soap Machinery Manufacturer With Decades Of Engineering Experience",
  description:
    "Brit Soap Machinery is a joint venture between Britannia Soap Machinery (England) and Orum Engineering (India), delivering complete soap plants worldwide for over 20 years.",
  keywords: [
    "about brit soap",
    "soap machinery manufacturer",
    "soap plant supplier",
    "industrial soap equipment company",
    "britannia soap machinery",
  ],
};

export default async function AboutPage() {
  const data = await getAboutPage("en");

  if (!data) return <div>No data found</div>;

  return (
    <Layout>
      <AboutClient data={data} />
    </Layout>
  );
}
