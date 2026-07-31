type JsonLdProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps): React.ReactElement {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={`${String(item['@type'] ?? 'ld')}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
