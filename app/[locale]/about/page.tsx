import { getTranslations } from "next-intl/server";

export default async function About() {
  const t = await getTranslations("about");
  const skills: string[] = t.raw("skills.list");

  return (
    <section className="px-6 md:px-12 lg:px-24 py-20 max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-8">{t("title")}</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-12">{t("bio")}</p>

      <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-4">
        {t("skills.title")}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill: string) => (
          <li
            key={skill}
            className="border border-gray-200 text-sm px-3 py-1.5 rounded"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
