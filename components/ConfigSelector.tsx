import React from "react";

type Props = {
  configurations: {
    title: string;
    desc: string;
    points: string[];
  }[];
};

export default function ConfigSelector({ configurations }: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-5xl">
        {/* SECTION HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-3">
            Configurations Of The Machine
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {configurations.map((config, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100"
            >
              <h3 className="text-3xl font-bold text-primary mb-4">
                {config.title}
              </h3>

              {config.desc && (
                <p className="text-gray-600 mb-8 leading-relaxed max-w-3xl">
                  {config.desc}
                </p>
              )}

              {config.points && config.points.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {config.points.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-sm transition"
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                        ✓
                      </span>
                      <span className="text-gray-700 text-lg leading-relaxed">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}