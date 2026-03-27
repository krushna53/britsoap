import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

export default function SoapCuttersPage() {
  const products = [
    {
      title: "Electro Pneumatic Vertical Cutter",
      image: "/assets/AVC/automatic-soap-cutting-machine.png",
      description:
        "Electro-pneumatic vertical cutter for precise, synchronized cutting of continuously extruded soap into uniform bars.",
    },
    {
      title: "High Speed Rotary Cutter",
      image: "/assets/HSB-Cutter/soap-cutting-machine-india.png",
      description:
        "A high-speed rotary soap cutter designed for precise, continuous cutting of extruded soap bars in larger manufacturing lines.",
    },
  ];

  return (
    <Layout>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          {/* Heading */}
          <h1 className="text-3xl font-semibold text-blue-900 mb-6">
            Automatic Soap Cutters for Consistent Soap Manufacturing
          </h1>

          {/* Description */}
          <div className="mx-auto text-gray-700 mb-12 leading-relaxed">
            <p>
              Brit Soap offers two advanced models of automatic soap cutters,
              engineered for consistent performance across different production
              capacities. Designed to integrate seamlessly with soap production
              lines, these machines automatically synchronize cutting speed with
              variations in soap bar output from the extruder—ensuring
              continuous, efficient operation.
            </p>
            <p>
              Built using European design Both cutters enable real-time soap
              length adjustment without stopping production, giving operators
              full control and flexibility. With the ability to cut soap bars
              ranging from 10 mm to 999 mm, they deliver accuracy and uniformity
              across every batch.
            </p>
            <p>
              standards and engineered in India, Brit Soap cutters combine
              robust construction with high operational efficiency—making them
              ideal for manufacturers seeking reliability, scalability, and
              long-term performance.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
