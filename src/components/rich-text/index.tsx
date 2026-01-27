import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type Props = {
  data: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

export function RichText(props: Props) {
  const { ...rest } = props;

  return <RichTextConverter {...rest} className="prose max-w-none" />;
}
