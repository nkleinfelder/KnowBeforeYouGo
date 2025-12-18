import { ComponentProps } from "react";
import { cn } from "../lib/utils";

const stepsAmount = 15;
const steps = [...Array(stepsAmount).keys()].map((val) => {
  const center = (100 / stepsAmount) * val;

  return {
    index: val,
    start: Math.max(center - 10, 0),
    center,
    end: Math.min(center + 10, 100),
    blur: val,
  };
});

export function ProgressiveBlur({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div aria-hidden className={cn("grid-stack", className)} {...props}>
      {steps.map((step) => (
        <div
          className="h-full w-full"
          style={{
            willChange: "backdrop-filter, mask",
            backdropFilter: `blur(${step.blur}px) opacity(var(--blur-opacity))`,
            WebkitBackdropFilter: `blur(${step.blur}px) opacity(var(--blur-opacity))`,
            mask: `
              linear-gradient(
                rgba(0,0,0,0) ${step.start}%,
                rgba(0,0,0,1) ${step.center}%,
                rgba(0,0,0,${step.index === steps.length - 1 ? 1 : 0}) ${step.end}%
              )
            `,
          }}
          key={step.index}
        />
      ))}
    </div>
  );
}
