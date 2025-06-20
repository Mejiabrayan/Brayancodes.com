import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const supportedLanguages = ["en", "es"];
  const defaultLanguage = "en";

  const url = new URL(context.request.url);
  const pathname = url.pathname;

  const hasLangPrefix = supportedLanguages.some((lang) =>
    pathname.startsWith(`/${lang}/`),
  );

  if (!hasLangPrefix) {
    const acceptLanguage = context.request.headers.get("accept-language");
    let preferredLanguage = defaultLanguage;

    if (acceptLanguage) {
      const userLanguages = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim().substring(0, 2));
      preferredLanguage =
        userLanguages.find((lang) => supportedLanguages.includes(lang)) ||
        defaultLanguage;
    }

    // Redirect to the preferred language version
    if (preferredLanguage !== defaultLanguage) {
      return context.redirect(`/${preferredLanguage}${pathname}`);
    }
  }

  // Continue to the next middleware or to the requested route
  return next();
});
