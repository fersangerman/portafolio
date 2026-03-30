"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

export interface Project {
  slug: string;
  title: string;
  category: string;
  categoryKey: string | string[];
  description?: string;
  tags: string[];
  coverColor?: string;
  coverImage?: string;
  gridVariant?: "featured" | "wide" | null;
  year?: string;
  client?: string;
}

export default function ProjectCard({
  project,
  forceDefault = false,
}: {
  project: Project;
  forceDefault?: boolean;
}) {
  const locale = useLocale();

  const isLarge = !forceDefault && project.gridVariant === "featured";
  const isWide = !forceDefault && project.gridVariant === "wide";

  return (
    <Link
      href={`/${locale}/portfolio/${project.slug}`}
      className={[
        "group block bg-cream-dark rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300",
        isLarge ? "col-span-2 row-span-2" : "",
        isWide ? "col-span-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Cover */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: project.coverColor ?? "#E8E5E1" }}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-ink-light uppercase tracking-widest font-medium">
            {project.category}
          </p>
          {project.year && (
            <p className="text-xs text-ink-light font-medium">{project.year}</p>
          )}
        </div>
        <h3 className="text-base font-semibold text-ink leading-snug mb-3 group-hover:text-violet transition-colors">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-violet-light text-violet-dark px-2.5 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
