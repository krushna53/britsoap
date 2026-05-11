import { getServices } from "@/lib/contentful";
import ServicesClient from "@/components/ServicesClient";

export const revalidate = 300;

export default async function ServicesPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  const services = await getServices(lang);

  return <ServicesClient services={services} />;
}