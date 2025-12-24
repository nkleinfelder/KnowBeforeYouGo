import { ComponentProps, PropsWithChildren } from "react";

export function Section({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"section">>) {
  return (
    <section className="flex w-full flex-col gap-5" {...props}>
      {children}
    </section>
  );
}

export function Grid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-3 md:grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]">
      {children}
    </div>
  );
}

export function Header({ children }: PropsWithChildren) {
  return <header className="flex items-center gap-2">{children}</header>;
}

export function Title({ children }: PropsWithChildren) {
  return <h2 className="text-3xl font-bold">{children}</h2>;
}
