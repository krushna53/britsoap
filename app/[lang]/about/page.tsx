import Layout from "@/components/Layout";
import AboutClient from "@/components/AboutClient";
import { getAboutPage } from "@/lib/contentful";

export const revalidate = 300;

export default async function AboutPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang;

  const data = await getAboutPage(lang);

  if (!data) return <div>No data found</div>;

  return (
    <Layout>
      <AboutClient data={data} />
    </Layout>
  );
}
