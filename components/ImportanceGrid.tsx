type Props = {
  title?: string;
  description?: string;
  items: string[];
};

export default function ImportanceGrid({ title, description, items }: Props) {
  return (
    <section className="py-16">
      <div className="container text-center max-w-5xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold text-primary mb-4">
            {title}
          </h2>
        )}

        {description && (
          <p className="text-muted-foreground mb-10">
            {description}
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
          {items.map((item, i) => (
            <div
              key={i}
              className="h-full flex items-center justify-center text-center px-6 py-5 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 bg-white"
            >
              <p className="text-sm font-medium text-gray-800">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}