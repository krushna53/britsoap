"use client";

import "next-google-translate-widget/styles";
import GoogleTranslate from "next-google-translate-widget";

export default function LanguageSwitcher() {
  return (
    <div className="relative">
      <GoogleTranslate
        pageLanguage="en"
        languages={[
          { label: "English", value: "en", flag: "us" },
          { label: "Français", value: "fr", flag: "fr" },
          { label: "Español", value: "es", flag: "es" },
        ]}
      />
    </div>
  );
}