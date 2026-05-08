"use client";

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
    <section className="pt-20 pb-0 bg-background">
      <div className="w-full">
        <div className="text-center mb-12 container">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What We Do
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full">
          {services.slice(0, 3).map((service, i) => {
            const Icon = icons[i % icons.length];
            const shades = [
              "bg-[#3A44A8]",
              "bg-[#2A328B]",
              "bg-[#1F276F]",
            ];

            return (
              <div
                key={`${service.title}-${i}`}
                className={`relative h-[240px] md:h-[270px] ${shades[i]} overflow-hidden`}
              >
                <div className="group h-full w-full" style={{ perspective: "1200px" }}>
                  <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div
                      className="absolute inset-0 text-white p-8 flex flex-col justify-between [backface-visibility:hidden]"
                    >
                      <div>
                        <Icon size={30} className="text-white/90 mb-5" />
                        <h3 className="text-2xl font-bold tracking-tight display-flex justify-center align-center">
                          {service.title}
                        </h3>
                      </div>

                    </div>

                    <div
                      className="absolute inset-0 text-white p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto"
                    >
                      <h3 className="text-xl font-semibold mb-4">
                        {service.title}
                      </h3>
                      <div className="text-sm md:text-base leading-relaxed text-white/95">
                        {typeof service.description === "string"
                          ? service.description
                          : documentToReactComponents(service.description)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="container">
          <div className="h-0.5 bg-accent w-full" />
        </div>
      </div>
    </section>
  );
}