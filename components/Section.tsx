import React from "react";

type SectionProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  center?: boolean;
className?: string;
};

export default function Section({
  title,
  description,
  children,
  center = false,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-24 ${className}`}>
      <div className="container">
        {(title || description) && (
          <div
            className={`mb-16 ${
              center ? "text-center max-w-3xl mx-auto" : ""
            }`}
          >
            {title && (
              <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${className}`}>
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}