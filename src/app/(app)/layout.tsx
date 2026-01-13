import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/header";
import { TRPCReactProvider } from "@/src/server/react";

const bodyFont = Manrope({
  variable: "--font-normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Know Before You Go",
  description: "Get all the information you need about a country.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} antialiased`}>
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
