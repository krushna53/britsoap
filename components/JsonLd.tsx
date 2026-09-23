/**
 * Renders structured data into the server HTML.
 * Do not swap this for next/script — that injects the tag on the client,
 * where crawlers are far less likely to pick it up.
 */
export default function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown>;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
