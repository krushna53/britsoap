type Props = {
  title?: string;
  description?: string;
  items: string[];
  columns?: number; // 👈 just pass 3 / 4 / 5 / 6
};

export default function ImportanceGrid({
  title,
  description,
  items,
  columns = 4,
}: Props) {

  const getGridClass = () => {
    switch (columns) {
      case 3:
        return "sm:grid-cols-2 md:grid-cols-3";
      case 4:
        return "sm:grid-cols-2 md:grid-cols-4";
      case 5:
        return "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
      case 6:
        return "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
      default:
        return "sm:grid-cols-2 md:grid-cols-4";
    }
  };

  return (
    <section className="py-16">
      <div className="container text-center mx-auto">

        {/* TITLE */}
        {title && (
          <h2 className="text-3xl font-bold text-primary mb-4">
            {title}
          </h2>
        )}

        {/* DESCRIPTION */}
        {description && (
          <p className="text-muted-foreground mb-10 text-gray-600 text-lg leading-relaxed  mx-auto">
            {description}
          </p>
        )}

        {/* GRID */}
        <div className={`grid gap-6 ${getGridClass()}`}>
          {items.map((item, i) => (
            <div
              key={i}
              className="group h-full flex items-center justify-center text-center px-5 py-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-gray-700 font-medium leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}