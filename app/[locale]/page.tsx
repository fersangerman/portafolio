import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import ProjectCard, { type Project } from "@/components/ui/ProjectCard";
import ServiceCard from "@/components/ui/ServiceCard";

// Placeholder projects — se reemplazarán con datos reales
const placeholderProjects: Project[] = [
  {
    slug: "placeholder-1",
    title: "Identidad de marca — Ejemplo",
    category: "Diseño Gráfico",
    tags: ["Branding", "Identidad Visual"],
    coverColor: "#f0ece6",
  },
  {
    slug: "placeholder-2",
    title: "Rediseño UX — App móvil",
    category: "UX/UI",
    tags: ["UX Research", "Prototipo", "Figma"],
    coverColor: "#e6eef0",
  },
  {
    slug: "placeholder-3",
    title: "Campaña Digital — Redes sociales",
    category: "Marketing Digital",
    tags: ["Social Media", "Diseño", "Estrategia"],
    coverColor: "#ece6f0",
  },
  {
    slug: "placeholder-4",
    title: "Diseño editorial — Revista",
    category: "Diseño Gráfico",
    tags: ["Editorial", "Tipografía", "Layout"],
    coverColor: "#f0f0e6",
  },
];

export default function Home() {
  const t = useTranslations("home");
  const st = useTranslations("services");
  const locale = useLocale();

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
        <p className="text-sm text-gray-400 uppercase tracking-widest mb-5">
          {t("role")}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight max-w-4xl whitespace-pre-line">
          {t("headline")}
        </h1>
        <Link
          href={`/${locale}/portfolio`}
          className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-black border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors w-fit"
        >
          {t("cta")} →
        </Link>
      </section>

      {/* ── Portafolio ── */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-gray-100">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {locale === "es" ? "Portafolio" : "Portfolio"}
          </h2>
          <Link
            href={`/${locale}/portfolio`}
            className="text-sm text-gray-400 hover:text-black transition-colors hidden md:block"
          >
            {locale === "es" ? "Ver todos →" : "View all →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {placeholderProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href={`/${locale}/portfolio`}
            className="text-sm text-gray-400 hover:text-black transition-colors"
          >
            {locale === "es" ? "Ver todos →" : "View all →"}
          </Link>
        </div>
      </section>

      {/* ── Servicios ── */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-gray-100">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {st("title")}
          </h2>
          <Link
            href={`/${locale}/services`}
            className="text-sm text-gray-400 hover:text-black transition-colors hidden md:block"
          >
            {locale === "es" ? "Ver servicios →" : "All services →"}
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
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-gray-100">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            {locale === "es"
              ? "¿Tienes un proyecto en mente?"
              : "Have a project in mind?"}
          </h2>
          <p className="text-gray-500 mb-8">
            {locale === "es"
              ? "Estoy disponible para proyectos freelance y colaboraciones. Hablemos."
              : "I'm available for freelance projects and collaborations. Let's talk."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            {locale === "es" ? "Escribir mensaje →" : "Send a message →"}
          </Link>
        </div>
      </section>
    </div>
  );
}
