import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import path from "path";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

interface Project {
  title: string;
  description: string;
}

export default async function CaseStudy({ params }: Props) {
  const { locale, slug } = await params;

  let project: Project;

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

  return (
    <article className="px-6 md:px-12 lg:px-24 py-20 max-w-4xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        {project.title}
      </h1>
      <p className="text-gray-500 text-lg leading-relaxed">
        {project.description}
      </p>
    </article>
  );
}
