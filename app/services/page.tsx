import { getServices } from "@/lib/contentful";
import ServicesClient from "@/components/ServicesClient";

export const revalidate = 300;

export default async function ServicesPage() {
  const services = await getServices("en");

  return <ServicesClient services={services} />;
}
