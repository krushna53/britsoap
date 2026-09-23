import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getServices } from "@/lib/contentful";
import ServicesClient from "@/components/ServicesClient";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Our Services | Installation, Commissioning & After-Sales Support",
  description:
    "Complete installation, commissioning and after-sales support for soap manufacturing plants and machinery worldwide.",
  keywords: [
    "soap machinery installation",
    "soap plant commissioning",
    "soap machinery after sales service",
    "soap plant support services",
  ],
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices("en");

  return <ServicesClient services={services} />;
}
