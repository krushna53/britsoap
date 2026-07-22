import type { Metadata } from "next";
import Layout from "@/components/Layout";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "All Products | Soap Manufacturing Machines & Equipment",
  description:
    "Browse Brit Soap's complete range of soap manufacturing machinery — mixers, plodders, roll mills, cutters, stampers, saponification and drying equipment.",
  keywords: [
    "soap manufacturing machines",
    "soap making equipment",
    "soap plant machinery",
    "soap production equipment",
    "industrial soap machines",
  ],
};

export default function ProductsPage() {
  return (
    <Layout>
      <ProductsClient />
    </Layout>
  );
}
