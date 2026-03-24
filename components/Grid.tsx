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
          className="bg-white rounded-2xl overflow-hidden border border-gray-200 transition hover:shadow-md"
        >
          {item.image && (
            <div className="w-full aspect-4/3 overflow-hidden">
              <Image
                src={item.image}
                alt="Simplex refiner plodder machine for soap manufacturing"
                loading="eager"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-5">
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
