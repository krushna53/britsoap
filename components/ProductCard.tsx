import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
};

export default function ProductCard({ title, description, image }: Props) {
  return (
    <div className="bg-[#0d2c8d] rounded-[40px] p-6 text-center text-white shadow-lg">
      <div className="bg-white rounded-[30px] p-4 mb-4">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="mx-auto object-contain"
        />
      </div>

      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  );
}