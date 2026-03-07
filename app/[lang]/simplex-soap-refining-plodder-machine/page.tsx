import Image from "next/image";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";

export const metadata = {
  title: "Simplex Soap Refining Plodder Machine Manufacturer | Brit Soap",
  description:
    "Industrial simplex soap refining plodder machine for refining and extrusion of soap noodles. Multiple capacities available.",
  keywords: [
    "simplex soap refining plodder machine",
    "soap plodder machine",
    "soap refining plodder",
    "industrial soap plodder",
    "soap extrusion machine",
    "soap manufacturing machinery",
    "soap plant machinery manufacturer",
    "soap extruder machine",
  ],
};
export default function ProductPage() {
  const capacities = [
    "125 kg / hour",
    "250 kg / hour",
    "500 kg / hour",
    "1 ton / hour",
    "2 tons / hour",
    "3 tons / hour",
  ];

  const steps = [
    {
      title: "Compression",
      desc: "Rotating screw compresses and homogenizes the soap mass",
      image: "/images/about-factory.jpg",
    },
    {
      title: "Impurity Removal",
      desc: "Filter screens remove hard particles and impurities",
      image: "/images/hero-machinery.jpg",
    },
    {
      title: "Extrusion",
      desc: "Soap passes through a stainless steel noodling plate",
      image: "/images/product-detergent.jpg",
    },
    {
      title: "Further Refining",
      desc: "Refined noodles move to the Triple Roll Mill",
      image: "/images/product-transport.jpg",
    },
  ];

  return (
    <Layout>
      {/* HERO */}

      <section className="bg-primary text-white py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-white/70 mb-4">
              BRIT SOAP MACHINERY
            </p>

            <h1 className="text-5xl font-bold mb-6">
              Simplex Soap Refining Plodder Machine
            </h1>

            <p className="text-white/80 mb-8">
              High-performance refining and extrusion machine used in the soap
              finishing line to improve soap texture, consistency, and final
              product quality.
            </p>

            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold">
              Request Product Details
            </button>
          </div>

          <Image
            src="/images/product-wrapping.jpg"
            alt="Simplex Refiner Plodder"
            width={700}
            height={500}
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* OVERVIEW */}

      <section className="py-20">
        <div className="container max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            High-Performance Refining for Superior Soap Quality
          </h2>

          <p className="text-muted-foreground mb-4">
            The Brit Soap Simplex Refiner Plodder receives soap noodles mixed
            with colours, perfumes and additives from the Double Sigma Mixer and
            refines them before further processing.
          </p>

          <p className="text-muted-foreground">
            Positioned as the second machine in the soap finishing line, the
            plodder improves texture, consistency and overall quality of the
            final soap bar.
          </p>
        </div>
      </section>

      {/* HOW MACHINE WORKS */}

      <section className="py-20 bg-muted">
        <div className="container text-center mb-14">
          <h2 className="text-3xl font-bold text-primary">
            Inside the Plodder
          </h2>
        </div>

        <div className="container grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow text-center">
              <Image
                src={step.image}
                alt={step.title}
                width={200}
                height={120}
                className="mx-auto mb-4"
              />

              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>

              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REFINING BENEFITS */}

      <section className="py-20">
        <div className="container text-center mb-14">
          <h2 className="text-3xl font-bold text-primary">
            Why Refining is Important
          </h2>
        </div>

        <div className="container grid md:grid-cols-3 gap-8">
          {[
            "Eliminates impurities and hard particles",
            "Creates uniform and homogeneous soap mass",
            "Improves crystalline structure",
            "Enhances foam generation",
            "Improves solubility",
            "Creates smoother premium soap bars",
          ].map((item, i) => (
            <div key={i} className="border rounded-lg p-6 bg-white shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* APPLICATIONS */}

      <section className="py-20 bg-muted">
        <div className="container text-center mb-14">
          <h2 className="text-3xl font-bold text-primary">
            Applications in Soap Manufacturing
          </h2>
        </div>

        <div className="container grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            🧼
            <h3 className="font-semibold mt-3">Toilet Soap</h3>
            <p className="text-sm text-muted-foreground">
              Smooth billet formation
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            🧴
            <h3 className="font-semibold mt-3">Laundry Soap</h3>
            <p className="text-sm text-muted-foreground">
              High volume refining
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            🌿
            <h3 className="font-semibold mt-3">Herbal Soap</h3>
            <p className="text-sm text-muted-foreground">
              Special formulations
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            🏭
            <h3 className="font-semibold mt-3">Contract Manufacturing</h3>
            <p className="text-sm text-muted-foreground">Flexible production</p>
          </div>
        </div>
      </section>

      {/* CONFIGURATION */}

      <section className="py-20">
        <div className="container text-center mb-14">
          <h2 className="text-3xl font-bold text-primary">
            Available Configurations
          </h2>
        </div>

        <div className="container grid md:grid-cols-2 gap-10">
          <div className="border p-8 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">Single Worm Plodder</h3>
            Efficient refining solution for standard production lines.
          </div>

          <div className="border p-8 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">Twin Worm Plodder</h3>
            Higher refining efficiency and higher throughput.
          </div>
        </div>
      </section>

      {/* CAPACITY */}

      <section className="py-20 bg-muted">
        <div className="container text-center mb-14">
          <h2 className="text-3xl font-bold text-primary">
            Production Capacity Options
          </h2>
        </div>

        <div className="container grid md:grid-cols-3 gap-6">
          {capacities.map((c, i) => (
            <div key={i} className="bg-white rounded-lg p-6 text-center shadow">
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="py-24 bg-primary text-white text-center">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Engineered for Efficiency. Built for Reliability.
          </h2>

          <p className="text-white/80 mb-8">
            Speak with our engineers to design a solution tailored to your
            production capacity and plant layout.
          </p>

          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold">
            Contact Our Engineering Team
          </button>
        </div>
      </section>

      <FAQSection />
    </Layout>
  );
}
