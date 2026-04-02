"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { Locale, t } from "@/lib/translations";
import { safeJsonParse } from "@/lib/utils";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: ReturnType<typeof t>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "optimall-design-language";

export function LanguageProvider({ children, initialLocale = "uz" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = safeJsonParse<Locale | null>(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null, null);
    if (stored) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (value: Locale) => {
    setLocaleState(value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  };

  const value = useMemo(() => ({ locale, setLocale, dict: t(locale) }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
