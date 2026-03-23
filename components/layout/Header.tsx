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
    // Replace the current locale prefix with the other one
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100">
      <Link href={`/${locale}`} className="font-semibold text-base tracking-tight">
        Fernanda San German
      </Link>

      <nav className="flex items-center gap-6 text-sm">
        <Link href={`/${locale}/portfolio`} className="text-gray-600 hover:text-black transition-colors">
          {t("portfolio")}
        </Link>
        <Link href={`/${locale}/services`} className="text-gray-600 hover:text-black transition-colors">
          {t("services")}
        </Link>
        <Link href={`/${locale}/contact`} className="text-gray-600 hover:text-black transition-colors">
          {t("contact")}
        </Link>
        <button
          onClick={switchLocale}
          className="text-gray-400 hover:text-black transition-colors uppercase text-xs font-medium tracking-wider border border-gray-200 px-2 py-1 rounded"
        >
          {otherLocale}
        </button>
      </nav>
    </header>
  );
}
