import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

export default function ProductCard({ title, description, image, href }: Props) {
  const content = (
    <div className="bg-white rounded-xl shadow-md flex items-center hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 gap-2 overflow-hidden group">
      <div className="w-[45%] shrink-0 h-60 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover rounded-l-xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 p-5 text-left">
        <h3 className="text-base font-bold text-primary mb-2 leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        {/* {href && (
          <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-accent uppercase tracking-wider">
            Learn More
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )} */}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
