/**
 * src/components/seo/JsonLd.tsx
 * Renders a JSON-LD structured-data block as a script tag.
 */

/**
 * Embeds a structured-data object as `<script type="application/ld+json">`.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
