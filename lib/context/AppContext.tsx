"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { STATES, getStateById, type StateInfo } from "@/lib/mock-data/geo";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

interface AppContextValue {
  /** Currently selected state (ISO 3166-2:IN code), or null for All India */
  selectedState: string | null;
  selectedStateInfo: StateInfo | null;
  setSelectedState: (id: string | null) => void;

  /** Active UI locale */
  locale: Locale;
  setLocale: (code: Locale) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const LS_STATE_KEY = "cropsense_state";
const LS_LOCALE_KEY = "cropsense_locale";

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedState, setSelectedStateRaw] = useState<string | null>(null);
  const [locale, setLocaleRaw] = useState<Locale>("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(LS_STATE_KEY);
      if (savedState && (savedState === "null" || STATES.some((s) => s.id === savedState))) {
        setSelectedStateRaw(savedState === "null" ? null : savedState);
      }
      const savedLocale = localStorage.getItem(LS_LOCALE_KEY) as Locale | null;
      if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
        setLocaleRaw(savedLocale);
      }
    } catch {
      // localStorage not available (SSR safety)
    }
  }, []);

  const setSelectedState = useCallback((id: string | null) => {
    setSelectedStateRaw(id);
    try {
      localStorage.setItem(LS_STATE_KEY, id ?? "null");
    } catch {}
    // Auto-set language to that state's primary language
    if (id) {
      const info = getStateById(id);
      if (info) {
        const lc = info.languageCode as Locale;
        if (SUPPORTED_LOCALES.includes(lc)) {
          setLocaleRaw(lc);
          try {
            localStorage.setItem(LS_LOCALE_KEY, lc);
          } catch {}
        }
      }
    }
  }, []);

  const setLocale = useCallback((code: Locale) => {
    setLocaleRaw(code);
    try {
      localStorage.setItem(LS_LOCALE_KEY, code);
    } catch {}
  }, []);

  const selectedStateInfo = selectedState ? getStateById(selectedState) ?? null : null;

  return (
    <AppContext.Provider
      value={{ selectedState, selectedStateInfo, setSelectedState, locale, setLocale }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
