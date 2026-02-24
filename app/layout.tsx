import "./globals.css";
import { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}