// Shared i18n types and helpers

/**
 * A localized text field that stores translations for supported locales.
 * The `en` field is always required and serves as the fallback.
 *
 * IMPORTANT: Fields marked with a translation note below have NOT been
 * reviewed by a qualified agricultural expert. Do NOT ship safety-critical
 * translations (pesticide doses, safety intervals, PPE) to production without
 * human expert review.
 */
export type LocalizedText = {
  en: string;
  hi: string;
  mr?: string;
  pa?: string;
  [k: string]: string | undefined;
};

/**
 * Pick the translation for `locale`, falling back to English if missing.
 */
export function localize(text: LocalizedText, locale: string): string {
  return text[locale] ?? text.en;
}

/** Supported locale codes */
export const SUPPORTED_LOCALES = ["en", "hi", "mr", "pa"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, { label: string; native: string }> = {
  en: { label: "English", native: "English" },
  hi: { label: "Hindi", native: "हिंदी" },
  mr: { label: "Marathi", native: "मराठी" },
  pa: { label: "Punjabi", native: "ਪੰਜਾਬੀ" },
};
