import type { Metadata } from "next";
import { getServices } from "@/lib/contentful";
import ServicesClient from "@/components/ServicesClient";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Our Services | Installation, Commissioning & After-Sales Support",
  description:
    "Brit Soap offers complete installation, commissioning, and after-sales support services for soap manufacturing plants and machinery worldwide.",
  keywords: [
    "soap machinery installation",
    "soap plant commissioning",
    "soap machinery after sales service",
    "soap plant support services",
  ],
};

export default async function ServicesPage() {
  const services = await getServices("en");

  return <ServicesClient services={services} />;
}
