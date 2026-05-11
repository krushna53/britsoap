import Layout from "@/components/Layout";
import ContactClient from "@/components/ContactClient";
import { getContactSection } from "@/lib/contentful";

export default async function ContactPage() {
  const contact = await getContactSection("en");

  return (
    <Layout>
      <ContactClient contact={contact} />
    </Layout>
  );
}
