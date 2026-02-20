"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import { machines } from "@/data/machines";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const categoryMachines = machines.filter(
    (m) => m.categorySlug === category
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const machine = categoryMachines[currentIndex];

  if (!machine) {
    return <Layout>Machine not found</Layout>;
  }

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-primary text-center">
        <div className="container">
          <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-2">
            {machine.category}
          </h2>
          <h1 className="text-4xl font-bold text-primary-foreground">
            {machine.name}
          </h1>
        </div>
      </section>

      {/* Machine Content */}
      <section className="py-20 bg-background">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <Image
              src={machine.image}
              alt={machine.name}
              className="rounded w-full object-contain"
            />
          </div>

          <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {machine.description}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-12">
          {categoryMachines.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-10 h-10 rounded border text-sm font-medium ${
                index === currentIndex
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </Layout>
  );
}
