type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Renders a JSON-LD structured data script tag. Server-renderable, no client JS. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
