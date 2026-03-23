import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
        <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">
          {t("role")}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight max-w-3xl whitespace-pre-line">
          {t("headline")}
        </h1>
        <Link
          href={`/${locale}/portfolio`}
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-black border border-black px-5 py-2.5 rounded hover:bg-black hover:text-white transition-colors w-fit"
        >
          {t("cta")} →
        </Link>
      </section>
    </div>
  );
}
