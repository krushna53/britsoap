"use client";

import { useState } from "react";

type Props = {
  configurations: {
    title: string;
    desc: string;
    points: string[];
  }[];
};

export default function ConfigSelector({ configurations }: Props) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="container">

        {/* SECTION HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-3">
            Configurations of the Machine
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">

          {/* LEFT SIDE (TABS) */}
          <div>
            <div className="flex flex-col gap-3">
              {configurations.map((config, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`group flex items-center justify-between text-left p-4 rounded-xl border transition-all duration-300 ${
                    active === i
                      ? "bg-primary text-white border-primary shadow-lg scale-[1.02]"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:shadow"
                  }`}
                >
                  <span className="font-semibold">
                    {config.title}
                  </span>

                  {/* Arrow Indicator */}
                  <span
                    className={`text-sm transition ${
                      active === i
                        ? "translate-x-1"
                        : "opacity-50 group-hover:translate-x-1"
                    }`}
                  >
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE (CONTENT) */}
          <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-10 shadow-inner transition-all duration-300">
            
            <h3 className="text-3xl font-bold text-primary mb-4">
              {configurations[active].title}
            </h3>

            <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
              {configurations[active].desc}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {configurations[active].points.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-sm transition"
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                    ✓
                  </span>

                  <span className="text-gray-700 text-sm leading-relaxed">
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}