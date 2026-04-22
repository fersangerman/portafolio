import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function About() {
  const t = await getTranslations("about");
  const skills: string[] = t.raw("skills.list");

  return (
    <section className="px-6 md:px-12 lg:px-24 py-20">
      {/* Layout dos columnas en desktop */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-16">
        {/* Texto */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight mb-8">{t("title")}</h1>
          <p className="text-lg text-ink-muted leading-relaxed mb-12">{t("bio")}</p>

          <h2 className="text-sm uppercase tracking-widest text-ink-light mb-4">
            {t("skills.title")}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
              <li
                key={skill}
                className="border border-border text-sm px-3 py-1.5 rounded text-ink-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Foto */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-cream-dark">
            <Image
              src="/images/profile/fer.jpg"
              alt="Fer San Germán"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 384px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
