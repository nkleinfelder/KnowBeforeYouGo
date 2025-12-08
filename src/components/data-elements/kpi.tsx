import { CheckCircleIcon, CircleEllipsisIcon, XCircleIcon } from "lucide-react";
import { InfoPopover } from "../ui-extensions/info-popover";

type CheckState = "true" | "false" | "indeterminate";

function CheckState({
  state,
  title,
  label,
}: {
  state: CheckState;
  title: string;
  label: string;
}) {
  return (
    <article className="relative grid grid-cols-1 grid-rows-[auto_1fr_auto] items-center justify-center justify-items-center gap-1 rounded-lg bg-card p-2 text-center text-card-foreground shadow">
      <h3 className="mx-4">{title}</h3>
      <InfoPopover className="absolute top-1 right-1 z-10">
        some info text
      </InfoPopover>
      {state === "true" && (
        <CheckCircleIcon className="size-6 text-green-500" />
      )}
      {state === "indeterminate" && (
        <CircleEllipsisIcon className="size-6 text-amber-400" />
      )}
      {state === "false" && <XCircleIcon className="size-6 text-red-500" />}
      <p className="text-xs text-muted-foreground">{label}</p>
    </article>
  );
}

export { CheckState };
