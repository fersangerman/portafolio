import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

interface ImageItem {
  src: string;
  alt: string;
  size?: "large" | "small" | "full";
}

interface ClientGroup {
  name: string;
  images: ImageItem[];
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
  images: ImageItem[];
  clients?: ClientGroup[];
  process?: ProcessSection | null;
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

  const backLabel = locale === "es" ? "← Portafolio" : "← Portfolio";

  return (
    <article className="pb-24">
      {/* Hero */}
      <div
        className="w-full h-[50vh] md:h-[60vh] flex items-end"
        style={{ backgroundColor: project.coverColor ?? "#E8E5E1" }}
      >
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24 py-12 border-b border-border">
        <Link
          href={`/${locale}/portfolio`}
          className="text-sm text-ink-muted hover:text-ink transition-colors font-medium mb-8 inline-block"
        >
          {backLabel}
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs text-ink-light uppercase tracking-widest font-medium mb-3">
              {project.category} · {project.year}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-5 text-ink">
              {project.title}
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags sidebar */}
          <div className="flex flex-wrap md:flex-col gap-2 md:min-w-[160px]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-violet-light text-violet-dark px-3 py-1 rounded-full font-medium w-fit"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {project.caseType === "full" && project.process ? (
        <FullCaseStudy project={project} locale={locale} />
      ) : (
        <GalleryCase project={project} locale={locale} />
      )}
    </article>
  );
}

/* ── Gallery mode (Diseño Gráfico / Branding) ── */
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
    <div className="px-6 md:px-12 lg:px-24 py-16">
      {/* Main images with overlapping layout */}
      {hasImages && <OverlapGallery images={project.images} />}

      {/* Client groups for Archipiélago Clientes */}
      {hasClientGroups &&
        project.clients!.map((clientGroup) => (
          <div key={clientGroup.name} className="mb-16">
            <h2 className="text-xl font-semibold text-ink mb-8">
              {clientGroup.name}
            </h2>
            {clientGroup.images.length > 0 ? (
              <OverlapGallery images={clientGroup.images} />
            ) : (
              <div className="rounded-2xl bg-cream-dark h-48 flex items-center justify-center">
                <p className="text-ink-light text-sm">
                  {_locale === "es"
                    ? "Imágenes próximamente."
                    : "Images coming soon."}
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
      {/* Process sections */}
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

      {/* Gallery with overlap effect */}
      {project.images.length > 0 ? (
        <OverlapGallery images={project.images} />
      ) : (
        <div className="rounded-2xl bg-cream-dark h-64 flex items-center justify-center">
          <p className="text-ink-light text-sm">
            {isEs ? "Imágenes próximamente." : "Images coming soon."}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Overlapping gallery ── */
function OverlapGallery({ images }: { images: ImageItem[] }) {
  return (
    <div className="relative space-y-[-2rem]">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={[
            "relative rounded-2xl overflow-hidden shadow-md",
            i % 2 === 0 ? "ml-0 mr-8 md:mr-16" : "ml-8 md:ml-16 mr-0",
            img.size === "large" || img.size === "full"
              ? "aspect-[16/9]"
              : "aspect-[4/3]",
          ].join(" ")}
          style={{ zIndex: i + 1 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
