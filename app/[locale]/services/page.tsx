import { getTranslations } from "next-intl/server";

export default async function Services() {
  const t = await getTranslations("services");

  return (
    <section className="px-6 md:px-12 lg:px-24 py-20">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">{t("title")}</h1>
      <p className="text-gray-500 mb-12">{t("subtitle")}</p>

      {/* Services placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg h-48 flex items-center justify-center text-gray-300 text-sm">
          {t("emptyState")}
        </div>
        <div className="bg-gray-50 rounded-lg h-48 flex items-center justify-center text-gray-300 text-sm">
          {t("emptyState")}
        </div>
        <div className="bg-gray-50 rounded-lg h-48 flex items-center justify-center text-gray-300 text-sm">
          {t("emptyState")}
        </div>
      </div>
    </section>
  );
}
