import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import ProjectCard, { type Project } from "@/components/ui/ProjectCard";
import ServiceCard from "@/components/ui/ServiceCard";

const placeholderProjects: Project[] = [
  {
    slug: "placeholder-1", categoryKey: "graphic",
    title: "Identidad de marca — Ejemplo",
    category: "Diseño Gráfico",
    description: "Desarrollo de identidad visual completa incluyendo logotipo, paleta de color y guía de marca.",
    tags: ["Branding", "Identidad Visual"],
    coverColor: "#DDD5F0",
  },
  {
    slug: "placeholder-2", categoryKey: "uxui",
    title: "Rediseño UX — App móvil",
    category: "UX/UI",
    description: "Investigación de usuario, wireframes y prototipo de alta fidelidad para aplicación móvil.",
    tags: ["UX Research", "Prototipo", "Figma"],
    coverColor: "#D5E8F0",
  },
  {
    slug: "placeholder-3", categoryKey: "marketing",
    title: "Campaña Digital — Redes sociales",
    category: "Marketing Digital",
    description: "Estrategia y diseño de piezas visuales para campaña en redes sociales.",
    tags: ["Social Media", "Diseño", "Estrategia"],
    coverColor: "#F0EDE8",
  },
];

export default async function Home() {
  const t = await getTranslations("home");
  const st = await getTranslations("services");
  const locale = await getLocale();

  const services = [
    {
      number: "01",
      title: locale === "es" ? "Diseño Gráfico" : "Graphic Design",
      description:
        locale === "es"
          ? "Identidades visuales, materiales de marca, diseño editorial y piezas creativas que comunican con impacto."
          : "Visual identities, brand materials, editorial design and creative pieces that communicate with impact.",
    },
    {
      number: "02",
      title: locale === "es" ? "UX/UI" : "UX/UI Design",
      description:
        locale === "es"
          ? "Investigación de usuario, wireframes, prototipos y diseño de interfaces centradas en la experiencia."
          : "User research, wireframes, prototypes and interface design centered on user experience.",
    },
    {
      number: "03",
      title: locale === "es" ? "Marketing Digital" : "Digital Marketing",
      description:
        locale === "es"
          ? "Estrategia y ejecución de campañas digitales, contenido para redes sociales y activos visuales de marketing."
          : "Strategy and execution of digital campaigns, social media content and visual marketing assets.",
    },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
        <p className="text-xs text-ink-light uppercase tracking-[0.2em] mb-6 font-medium">
          {t("role")}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight max-w-4xl whitespace-pre-line text-ink">
          {t("headline")}
        </h1>
        <div className="mt-12 flex items-center gap-6">
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 text-sm font-semibold bg-violet text-white px-7 py-3.5 rounded-full hover:bg-violet-dark transition-colors"
          >
            {t("cta")} →
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
          >
            {locale === "es" ? "Contactar" : "Get in touch"}
          </Link>
        </div>
      </section>

      {/* ── Portafolio ── */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs text-ink-light uppercase tracking-[0.2em] mb-3 font-medium">
              {locale === "es" ? "Trabajo selecto" : "Selected work"}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              {locale === "es" ? "Portafolio" : "Portfolio"}
            </h2>
          </div>
          <Link
            href={`/${locale}/portfolio`}
            className="text-sm text-ink-muted hover:text-ink transition-colors hidden md:flex items-center gap-1.5 font-medium"
          >
            {locale === "es" ? "Ver todos" : "View all"} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {placeholderProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href={`/${locale}/portfolio`}
            className="text-sm text-ink-muted hover:text-ink transition-colors font-medium"
          >
            {locale === "es" ? "Ver todos →" : "View all →"}
          </Link>
        </div>
      </section>

      {/* ── Servicios ── */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border bg-cream-dark">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs text-ink-light uppercase tracking-[0.2em] mb-3 font-medium">
              {locale === "es" ? "Qué hago" : "What I do"}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              {st("title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/services`}
            className="text-sm text-ink-muted hover:text-ink transition-colors hidden md:flex items-center gap-1.5 font-medium"
          >
            {locale === "es" ? "Ver servicios" : "All services"} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <ServiceCard
              key={s.number}
              number={s.number}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>
      </section>

      {/* ── Contacto CTA ── */}
      <section className="px-6 md:px-12 lg:px-24 py-32 border-t border-border">
        <div className="max-w-2xl">
          <p className="text-xs text-ink-light uppercase tracking-[0.2em] mb-4 font-medium">
            {locale === "es" ? "Hablemos" : "Let's talk"}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5 text-ink">
            {locale === "es"
              ? "¿Tienes un proyecto en mente?"
              : "Have a project in mind?"}
          </h2>
          <p className="text-ink-muted mb-10 text-lg leading-relaxed">
            {locale === "es"
              ? "Estoy disponible para proyectos freelance y colaboraciones."
              : "I'm available for freelance projects and collaborations."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-violet transition-colors"
          >
            {locale === "es" ? "Escribir mensaje" : "Send a message"} →
          </Link>
        </div>
      </section>
    </div>
  );
}
