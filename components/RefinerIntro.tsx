type Props = {
  title: string;
  paragraphs: string[];
};

export default function RefinerIntro({ title, paragraphs }: Props) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-5xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-xl md:text-2xl font-medium text-primary leading-snug uppercase mb-6 text-center">
          {title}
        </h2>

        {/* CONTENT */}
        <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed text-center">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

      </div>
    </section>
  );
}