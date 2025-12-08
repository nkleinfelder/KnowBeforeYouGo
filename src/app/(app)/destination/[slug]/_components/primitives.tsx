import { PropsWithChildren } from "react";

export function Section({ children }: PropsWithChildren) {
  return <section className="flex w-full flex-col gap-5">{children}</section>;
}

export function Header({ children }: PropsWithChildren) {
  return <header className="flex items-center gap-2">{children}</header>;
}

export function Title({ children }: PropsWithChildren) {
  return <h2 className="text-3xl font-bold">{children}</h2>;
}
