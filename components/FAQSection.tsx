"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What is a simplex soap refining plodder?",
    answer:
      "A simplex soap refining plodder compresses and refines soap noodles to produce a smooth, dense soap billet before finishing processes such as milling, cutting, and stamping.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Typical machine capacities range from 125 kg/hour up to 3 tons per hour depending on plant requirements.",
  },
  {
    question: "What is the difference between single worm and twin worm plodders?",
    answer:
      "Single worm plodders are used for standard refining operations, while twin worm plodders provide higher refining efficiency and higher production output.",
  },
  {
    question: "Can the machine be integrated into a complete soap plant?",
    answer:
      "Yes. The simplex plodder can be integrated with mixers, triple roll mills, cutters, and stamping machines in a complete soap manufacturing line.",
  },
  {
    question: "How do I choose the right machine capacity?",
    answer:
      "Machine capacity depends on production scale, soap formulation and plant layout. Our engineering team can recommend the ideal configuration.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-3xl">

        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left p-5 flex justify-between items-center font-semibold"
              >
                {faq.question}

                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-muted-foreground text-sm">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}