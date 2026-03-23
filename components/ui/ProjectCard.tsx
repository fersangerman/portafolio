"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

export interface Project {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  coverColor?: string;
  coverImage?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      {/* Cover */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: project.coverColor ?? "#e5e5e5" }}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest">
            Imagen próximamente
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {project.category}
        </p>
        <h3 className="text-base font-semibold text-black group-hover:underline underline-offset-2">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
