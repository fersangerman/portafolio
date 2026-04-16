"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "es" ? "en" : "es";

  function switchLocale() {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between bg-cream/90 backdrop-blur-sm border-b border-border">
      <Link
        href={`/${locale}`}
        className="text-ink font-semibold hover:opacity-70 transition-opacity duration-200"
        aria-label="Fernanda San German — Home"
      >
        Fernanda San German
      </Link>

      <nav className="flex items-center gap-7 text-sm">
        <Link
          href={`/${locale}/portfolio`}
          className="text-ink-muted hover:text-ink transition-colors font-medium"
        >
          {t("portfolio")}
        </Link>
        <Link
          href={`/${locale}/services`}
          className="text-ink-muted hover:text-ink transition-colors font-medium"
        >
          {t("services")}
        </Link>
        <Link
          href={`/${locale}/about`}
          className="text-ink-muted hover:text-ink transition-colors font-medium"
        >
          {t("about")}
        </Link>
        <button
          onClick={switchLocale}
          className="text-ink-light hover:text-ink transition-colors uppercase text-xs font-semibold tracking-widest border border-border px-2.5 py-1 rounded hover:border-ink-muted"
        >
          {otherLocale}
        </button>
      </nav>
    </header>
  );
}
