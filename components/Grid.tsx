import Image from "next/image";

type GridItem = {
  title?: string;
  desc?: string;
  image?: string;
};

type GridProps = {
  items: GridItem[];
};

export default function Grid({ items }: GridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <div
          key={i}
          className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
        >
          {item.image && (
            <div className="overflow-hidden">
              <Image
                src={item.image}
                alt={item.title || "image"}
                width={400}
                height={430}
                className="w-full h-96 object-cover group-hover:scale-105 transition"
              />
            </div>
          )}

          <div className="p-6 text-center">
            {/* {item.title && (
              <h3 className="font-semibold text-lg mb-2">
                {item.title}
              </h3>
            )} */}
            {item.desc && (
              <p className="text-gray-600 text-sm">{item.desc}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}