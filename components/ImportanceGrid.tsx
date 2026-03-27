type Props = {
  title?: string;
  description?: string;
  items: string[];
};

export default function ImportanceGrid({ title, description, items }: Props) {
  return (
    <section className="py-16">
      <div className="container text-center mx-auto">
        {title && (
          <h2 className="text-3xl font-bold text-primary mb-4">
            {title}
          </h2>
        )}

        {description && (
          <p className="text-muted-foreground mb-10 text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6  m-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="h-full flex items-center justify-center text-center px-4 py-5 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 bg-white"
            >
              <p>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}