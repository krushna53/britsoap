import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";

export default async function SoapCuttersPage() {
  const products = [
    {
      title: "Electro Pneumatic Vertical Cutter",
      image: "/assets/AVC/automatic-soap-cutting-machine.png",
      description:
        "Electro-pneumatic vertical cutter for precise, synchronized cutting of continuously extruded soap into uniform bars.",
      href: `/av-pneumatic-soap-cutter-machine`,
    },
    {
      title: "High Speed Rotary Cutter",
      image: "/assets/HSB-Cutter/soap-cutting-machine-india.png",
      description:
        "A high-speed rotary soap cutter designed for precise, continuous cutting of extruded soap bars in larger manufacturing lines.",
      href: `/high-speed-soap-cutter-machine`,
    },
  ];

  return (
    <Layout>
      <section className="py-16 bg-background">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {products.map((product, i) => (
              <Link
                key={i}
                href={product.href}
                className="group bg-primary rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full max-w-95 h-101.25"
              >
                <div className="m-4 mb-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={300}
                    className="w-full h-52 object-contain p-3"
                  />
                </div>
                <div className="px-5 py-5 text-primary-foreground">
                  <h3 className="text-[17px] font-bold mb-2 leading-snug uppercase border-b border-accent line-clamp-2 pb-2">
                    {product.title}
                  </h3>
                  <p className="text-[13px] text-primary-foreground/75 leading-relaxed line-clamp-4 mt-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
