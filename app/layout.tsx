import "./globals.css";
import { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageContext";
import FloatingCTA from "@/components/FloatingCTA";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FloatingCTA text="Speak with an Engineer" href="/contact" />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}