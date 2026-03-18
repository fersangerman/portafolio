import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section className="px-6 md:px-12 lg:px-24 py-20 max-w-xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">{t("title")}</h1>
      <p className="text-gray-500 mb-10">{t("subtitle")}</p>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
        />
        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
        />
        <textarea
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
        />
        <button
          type="submit"
          className="bg-black text-white text-sm font-medium px-5 py-3 rounded hover:bg-gray-800 transition-colors"
        >
          {t("send")}
        </button>
      </form>
    </section>
  );
}
