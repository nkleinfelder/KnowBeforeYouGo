import { SerializedLinkNode } from "@payloadcms/richtext-lexical";

export const internalDocToHref = ({
  linkNode,
}: {
  linkNode: SerializedLinkNode;
}) => {
  const { value, relationTo } = linkNode.fields.doc!;

  const slug = typeof value !== "string" && value.slug;

  if (relationTo === "countries") {
    return `/destination/${slug}`;
  } else {
    return `/${slug}`;
  }
};
