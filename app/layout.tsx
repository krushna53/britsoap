import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageContext";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
  title: {
    template: "%s | Brit Soap",
    default: "Brit Soap",
  },
  description: "Advanced Soap Machinery and Production Lines",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FloatingCTA />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}