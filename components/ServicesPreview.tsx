"use client";

import { motion } from "framer-motion";
import { Factory, Cog, Wrench } from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

const icons = [Factory, Cog, Wrench];

type Service = {
  title: string;
  description: Document | string;
};

type Props = {
  services: Service[];
};

export default function ServicesPreview({ services }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What We Do
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, i) => {
            const Icon = icons[i % icons.length];

            return (
              <motion.div
                key={`${service.title}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="p-8 border border-border rounded hover:border-primary/30 transition-colors"
              >
                <Icon size={28} className="text-primary mb-4" />

                <h3 className="text-xl font-semibold text-primary mb-2">
                  {service.title}
                </h3>

                <div className="text-lg text-muted-foreground leading-relaxed">
                  {typeof service.description === "string"
                    ? service.description
                    : documentToReactComponents(service.description)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}