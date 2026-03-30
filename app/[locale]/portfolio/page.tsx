import { getTranslations } from "next-intl/server";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import PortfolioGrid from "@/components/ui/PortfolioGrid";
import { type Project } from "@/components/ui/ProjectCard";

interface Props {
  params: Promise<{ locale: string }>;
}

function readProjects(locale: string): Project[] {
  const dir = path.join(process.cwd(), "content", locale, "projects");
  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const raw = files.map((file) => {
    const data = JSON.parse(readFileSync(path.join(dir, file), "utf-8"));
    return { slug: file.replace(".json", ""), ...data };
  });

  raw.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return raw.map((data) => ({
    slug: data.slug,
    title: data.title,
    category: data.category,
    categoryKey: data.categoryKey,
    description: data.description,
    tags: data.tags ?? [],
    coverColor: data.coverColor,
    coverImage: data.coverImage,
    gridVariant: data.gridVariant ?? null,
    year: data.year,
    client: data.client,
  }));
}

export default async function Portfolio({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("portfolio");

  const projects = readProjects(locale);

  const isEs = locale === "es";

  const filters = [
    { key: "graphic", label: isEs ? "Diseño Gráfico" : "Graphic Design" },
    { key: "uxui", label: "UX/UI" },
    { key: "branding", label: "Branding" },
    { key: "marketing", label: "Marketing" },
  ];

  return (
    <section className="px-6 md:px-12 lg:px-24 py-20">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">
        {t("title")}
      </h1>
      <p className="text-ink-muted mb-12">{t("subtitle")}</p>

      <PortfolioGrid
        projects={projects}
        filters={filters}
        allLabel={isEs ? "Todos" : "All"}
      />
    </section>
  );
}
