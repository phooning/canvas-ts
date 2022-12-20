import LANGUAGE_BUNDLES, { TLocale } from "../constants/lang";

export * from "./types";

export const getLanguageBundles = (locale: TLocale) =>
  Object.values(LANGUAGE_BUNDLES).reduce(
    (acc, bundle) => ({ ...acc, ...bundle[locale] }),
    {}
  ) as Record<string, string>;
