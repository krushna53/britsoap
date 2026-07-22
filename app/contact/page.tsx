import type { Metadata } from "next";
import Layout from "@/components/Layout";
import ContactClient from "@/components/ContactClient";
import { getContactSection } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Contact Us | Get A Quote For Soap Manufacturing Machinery",
  description:
    "Get in touch with Brit Soap Machinery for enquiries, quotes, and support on soap plant machinery, plodders, mixers, cutters, and stampers.",
  keywords: [
    "contact brit soap",
    "soap machinery quote",
    "soap plant enquiry",
    "soap machinery supplier contact",
  ],
};

export default async function ContactPage() {
  const contact = await getContactSection("en");

  return (
    <Layout>
      <ContactClient contact={contact} />
    </Layout>
  );
}
