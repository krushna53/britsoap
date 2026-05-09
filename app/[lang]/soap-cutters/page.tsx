import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

export default async function SoapCuttersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const products = [
    {
      title: "Electro Pneumatic Vertical Cutter",
      image: "/assets/AVC/automatic-soap-cutting-machine.png",
      description:
        "Electro-pneumatic vertical cutter for precise, synchronized cutting of continuously extruded soap into uniform bars.",
      href: `/${lang}/av-pneumatic-soap-cutter-machine`,
    },
    {
      title: "High Speed Rotary Cutter",
      image: "/assets/HSB-Cutter/soap-cutting-machine-india.png",
      description:
        "A high-speed rotary soap cutter designed for precise, continuous cutting of extruded soap bars in larger manufacturing lines.",
      href: `/${lang}/high-speed-soap-cutter-machine`,
    },
  ];

  return (
    <Layout>
      <section className="py-16 bg-muted">
        <div className="container">
          <h1 className="text-3xl font-bold text-primary mb-6 capitalize">
            Automatic Soap Cutters for Consistent Soap Manufacturing
          </h1>

          <div className="text-muted-foreground mb-12 leading-relaxed text-lg space-y-3">
            <p>
              Brit Soap offers two advanced models of automatic soap cutters,
              engineered for consistent performance across different production
              capacities. Designed to integrate seamlessly with soap production
              lines, these machines automatically synchronize cutting speed with
              variations in soap bar output from the extruder—ensuring
              continuous, efficient operation.
            </p>
            <p>
              Built using European design standards and engineered in India,
              both cutters enable real-time soap length adjustment without
              stopping production, giving operators full control and flexibility.
              With the ability to cut soap bars ranging from 10 mm to 999 mm,
              they deliver accuracy and uniformity across every batch.
            </p>
            <p>
              Brit Soap cutters combine robust construction with high operational
              efficiency—making them ideal for manufacturers seeking reliability,
              scalability, and long-term performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
