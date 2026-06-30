import DisableInspect from "@/components/DisableInspect";
import FloatingCTA from "@/components/FloatingCTA";
import { LanguageProvider } from "@/components/LanguageContext";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

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
          <DisableInspect />
        <FloatingCTA />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}