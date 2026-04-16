import { notFound } from "next/navigation";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import OverlapGallery, { type GalleryImage } from "@/components/ui/OverlapGallery";
import UXCaseStudy, { type CaseStudySection } from "@/components/ui/UXCaseStudy";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

interface ClientGroup {
  name: string;
  images: GalleryImage[];
}

interface ProcessSection {
  challenge: string;
  approach: string;
  results: string;
}


interface ProjectData {
  title: string;
  category: string;
  categoryKey: string;
  caseType: "gallery" | "full";
  year: string;
  client: string;
  description: string;
  coverColor?: string;
  coverImage?: string;
  tags: string[];
  images: GalleryImage[];
  clients?: ClientGroup[];
  process?: ProcessSection | null;
  sections?: CaseStudySection[];
  order?: number;
}

interface NextProject {
  slug: string;
  title: string;
  category: string;
  year: string;
  coverColor?: string;
  coverImage?: string;
}

function readAllProjects(locale: string): Array<ProjectData & { slug: string }> {
  const dir = path.join(process.cwd(), "content", locale, "projects");
  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  const projects = files.map((file) => {
    const data = JSON.parse(readFileSync(path.join(dir, file), "utf-8"));
    return { slug: file.replace(".json", ""), ...data } as ProjectData & { slug: string };
  });
  return projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

function getNextProject(
  allProjects: Array<ProjectData & { slug: string }>,
  currentSlug: string
): NextProject | null {
  const idx = allProjects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return null;
  const next = allProjects[(idx + 1) % allProjects.length];
  return {
    slug: next.slug,
    title: next.title,
    category: next.category,
    year: next.year,
    coverColor: next.coverColor,
    coverImage: next.coverImage,
  };
}

export default async function CaseStudy({ params }: Props) {
  const { locale, slug } = await params;

  let project: ProjectData;

  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      locale,
      "projects",
      `${slug}.json`
    );
    project = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    notFound();
  }

  const allProjects = readAllProjects(locale);
  const nextProject = getNextProject(allProjects, slug);
  const isEs = locale === "es";

  return (
    <article className="pb-0">

      {/* ── Hero: imagen completa sin recorte ── */}
      {project.coverImage ? (
        <div className="w-full max-h-[75vh] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={1920}
            height={1080}
            className="w-full h-auto block"
            priority
          />
        </div>
      ) : (
        <div
          className="w-full h-[50vh]"
          style={{ backgroundColor: project.coverColor ?? "#E8E5E1" }}
        />
      )}

      {/* ── Info del proyecto ── */}
      <div className="px-6 md:px-12 lg:px-24 py-12 border-b border-border">
        <Link
          href={`/${locale}/portfolio`}
          className="text-sm text-ink-muted hover:text-ink transition-colors font-medium mb-10 inline-block"
        >
          {isEs ? "← Portafolio" : "← Portfolio"}
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="text-xs text-ink-light uppercase tracking-widest font-medium mb-2">
              {project.category} · {project.year}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              {project.title}
            </h1>
          </div>

          <div className="max-w-xl">
            <p className="text-ink-muted text-base leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-violet-light text-violet-dark px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Contenido ── */}
      {project.sections && project.sections.length > 0 ? (
        <UXCaseStudy sections={project.sections} locale={locale} />
      ) : project.caseType === "full" && project.process ? (
        <FullCaseStudy project={project} locale={locale} />
      ) : (
        <GalleryCase project={project} locale={locale} />
      )}

      {/* ── Siguiente Proyecto ── */}
      {nextProject && (
        <NextProjectSection next={nextProject} locale={locale} isEs={isEs} />
      )}
    </article>
  );
}

/* ── Gallery mode ── */
function GalleryCase({
  project,
  locale: _locale,
}: {
  project: ProjectData;
  locale: string;
}) {
  const hasClientGroups = project.clients && project.clients.length > 0;
  const hasImages = project.images && project.images.length > 0;

  if (!hasImages && !hasClientGroups) {
    return (
      <div className="px-6 md:px-12 lg:px-24 py-20 text-center">
        <p className="text-ink-light text-sm">
          {_locale === "es" ? "Imágenes próximamente." : "Images coming soon."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      {hasImages && <OverlapGallery images={project.images} />}

      {hasClientGroups &&
        project.clients!.map((clientGroup) => (
          <div key={clientGroup.name} className="mt-16">
            <h2 className="text-xl font-semibold text-ink mb-6 px-6 md:px-12 lg:px-24">
              {clientGroup.name}
            </h2>
            {clientGroup.images.length > 0 ? (
              <OverlapGallery images={clientGroup.images} />
            ) : (
              <div className="mx-6 md:mx-12 lg:mx-24 rounded-xl bg-cream-dark h-48 flex items-center justify-center">
                <p className="text-ink-light text-sm">
                  {_locale === "es" ? "Imágenes próximamente." : "Images coming soon."}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

/* ── Full case study (UX/UI) ── */
function FullCaseStudy({
  project,
  locale,
}: {
  project: ProjectData;
  locale: string;
}) {
  const isEs = locale === "es";
  const p = project.process!;

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div>
          <p className="text-xs text-violet uppercase tracking-widest font-semibold mb-3">
            {isEs ? "El reto" : "The challenge"}
          </p>
          <p className="text-ink-muted leading-relaxed">{p.challenge}</p>
        </div>
        <div>
          <p className="text-xs text-violet uppercase tracking-widest font-semibold mb-3">
            {isEs ? "Mi enfoque" : "My approach"}
          </p>
          <p className="text-ink-muted leading-relaxed">{p.approach}</p>
        </div>
        <div>
          <p className="text-xs text-violet uppercase tracking-widest font-semibold mb-3">
            {isEs ? "Resultados" : "Results"}
          </p>
          <p className="text-ink-muted leading-relaxed">{p.results}</p>
        </div>
      </div>

      {project.images.length > 0 ? (
        <OverlapGallery images={project.images} />
      ) : (
        <div className="rounded-xl bg-cream-dark h-64 flex items-center justify-center">
          <p className="text-ink-light text-sm">
            {isEs ? "Imágenes próximamente." : "Images coming soon."}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Siguiente Proyecto ── */
function NextProjectSection({
  next,
  locale,
  isEs,
}: {
  next: NextProject;
  locale: string;
  isEs: boolean;
}) {
  return (
    <Link
      href={`/${locale}/portfolio/${next.slug}`}
      className="group block border-t border-border mt-16"
    >
      <div className="relative h-[32vh] overflow-hidden">
        {next.coverImage ? (
          <Image
            src={next.coverImage}
            alt={next.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundColor: next.coverColor ?? "#E8E5E1" }}
          />
        )}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-10">
          <p className="text-xs text-white uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-white/60" />
            {isEs ? "Siguiente proyecto" : "Next project"}
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {next.title}
              </h2>
              <p className="text-sm text-white/80 mt-1">
                {next.category} · {next.year}
              </p>
            </div>
            <span className="text-white text-2xl translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
