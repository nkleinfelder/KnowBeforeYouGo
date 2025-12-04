"use client";
import { useElementDimensions } from "@/src/hooks/useElementDimensions";
import { createContext, useContext, PropsWithChildren } from "react";

export interface ICountryCardContext {
  contentRef: (node: Element | HTMLDivElement | null) => () => void;
  contentHeight: number;
}

const CountryCardContext = createContext<ICountryCardContext | null>(null);

type CountryCardContextProviderProps = PropsWithChildren;
export function CountryCardContextProvider({
  children,
}: CountryCardContextProviderProps) {
  const { ref: contentRef, height: contentHeight } = useElementDimensions();

  return (
    <CountryCardContext.Provider
      value={{
        contentRef,
        contentHeight,
      }}
    >
      {children}
    </CountryCardContext.Provider>
  );
}

export function useCountryCardContext() {
  const context = useContext(CountryCardContext);
  if (!context) {
    throw new Error(
      "useCountryCardContext must be used within a CountryCardContextProvider",
    );
  }
  return context;
}
