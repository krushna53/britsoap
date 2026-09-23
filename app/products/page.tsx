import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Layout from "@/components/Layout";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = buildMetadata({
  title: "All Products | Soap Manufacturing Machines & Equipment",
  description:
    "Browse Brit Soap's full range of soap manufacturing machinery — mixers, plodders, roll mills, cutters, stampers, saponification and drying equipment.",
  keywords: [
    "soap manufacturing machines",
    "soap making equipment",
    "soap plant machinery",
    "soap production equipment",
    "industrial soap machines",
  ],
  path: "/products",
});

export default function ProductsPage() {
  return (
    <Layout>
      <ProductsClient />
    </Layout>
  );
}
