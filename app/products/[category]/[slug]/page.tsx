import { notFound } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import { machines } from "@/data/machines";

export default async function MachineDetail({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const machine = machines.find(
    (m) => m.categorySlug === category && m.slug === slug
  );

  if (!machine) return notFound();

  return (
    <Layout>
      {/* Category Header */}
      <section className="py-16 bg-primary text-center">
        <div className="container">
          <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-2">
            {machine.category}
          </h2>
          <h1 className="text-4xl font-bold text-primary-foreground">
            {machine.name.toUpperCase()}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Large Image */}
          <div>
            <Image
              src={machine.image}
              alt={machine.name}
              className="rounded w-full object-contain"
            />
          </div>

          {/* Description */}
          <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {machine.description}
          </div>
        </div>
      </section>
    </Layout>
  );
}
