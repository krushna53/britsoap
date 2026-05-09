import React from "react";

type Props = {
  configurations: {
    title: string;
    desc: string;
    points: string[];
  }[];
};

// const labels = ["01", "02", "03", "04"];

export default function ConfigSelector({ configurations }: Props) {
  return (
    <section className="py-16 bg-muted">
      <div className="container">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Configurations Of The Machine
          </h2>
          <div className="mx-auto w-16 h-1 bg-accent rounded-full" />
        </div>

        {/* Cards — side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {configurations.map((config, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl overflow-hidden border border-border shadow-sm"
            >
              {/* Card header */}
              <div className="bg-primary px-7 py-6 flex items-start gap-4">
                {/* <span className="text-4xl font-black text-white/10 leading-none select-none shrink-0">
                  {labels[idx] ?? String(idx + 1).padStart(2, "0")}
                </span> */}
                <div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {config.title}
                  </h3>
                  {config.desc && (
                    <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                      {config.desc}
                    </p>
                  )}
                </div>
              </div>

              {/* Points */}
              {config.points && config.points.length > 0 && (
                <div className="flex-1 bg-background px-7 py-6">
                  <ul className="space-y-3">
                    {config.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M1.5 5l2.5 2.5 4.5-4.5"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-sm text-foreground leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
