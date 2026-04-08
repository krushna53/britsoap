import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
};

export default function ProductCard({ title, description, image }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md  flex items-center text-center hover:shadow-xl transition gap-2">
      <div className="w-full w-[40%] h-[260px] overflow-hidden  ">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>
      <div className="text-left">
        <p className="text-gray-600 mb-5 max-w-md p-[15px] ">{description}dd</p>
      </div>
    </div>
  );
}
