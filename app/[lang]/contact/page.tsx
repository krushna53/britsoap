import Layout from "@/components/Layout";
import ContactClient from "@/components/ContactClient";
import { getContactSection } from "@/lib/contentful";

export default async function ContactPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  const contact = await getContactSection(lang);

  return (
    <Layout>
      <ContactClient contact={contact} />
    </Layout>
  );
}