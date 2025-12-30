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
    <div className="group grid grid-cols-1 grid-rows-[auto_1fr] gap-3 md:grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))]">
      {children}
    </div>
  );
}

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-0.5">
      {children}
    </header>
  );
}

export function Title({ children }: PropsWithChildren) {
  return <h2 className="text-2xl font-bold md:text-3xl">{children}</h2>;
}

export function Description({ children }: PropsWithChildren) {
  return (
    <p className="col-span-2 row-start-2 text-muted-foreground">{children}</p>
  );
}
