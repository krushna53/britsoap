"use client";

import { Factory, Cog, Wrench } from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

const icons = [Factory, Cog, Wrench];
const numbers = ["01", "02", "03"];
const shades = ["bg-[#3A44A8]", "bg-[#2A328B]", "bg-[#1F276F]"];

type Service = {
  title: string;
  description: Document | string;
};

type Props = {
  services: Service[];
};

export default function ServicesPreview({ services }: Props) {
  return (
    <section className="pt-20 pb-0 bg-primary">
      <div className="w-full">

        <div className="text-center mb-12 container">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What We Do
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full">
          {services.slice(0, 3).map((service, i) => {
            const Icon = icons[i % icons.length];

            return (
              <div
                key={`${service.title}-${i}`}
                className={`relative h-[300px] md:h-[320px] ${shades[i]} overflow-hidden group`}
              >
                {/* Large ghost number watermark */}
                <span className="absolute -bottom-4 -right-2 text-[120px] font-black text-white/5 leading-none select-none pointer-events-none">
                  {numbers[i]}
                </span>

                {/* Front face */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-400 group-hover:opacity-0 group-hover:pointer-events-none">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">
                        {numbers[i]}
                      </span>
                      <div className="w-px h-4 bg-white/20" />
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Icon size={20} className="text-accent" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-snug tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <span>Hover to view details</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 7h12M8 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                {/* Back face — slides up on hover */}
                <div className="absolute inset-0 flex flex-col p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out overflow-y-auto">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <div className="text-sm leading-relaxed text-white/85 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1">
                    {typeof service.description === "string"
                      ? service.description
                      : documentToReactComponents(service.description)}
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
