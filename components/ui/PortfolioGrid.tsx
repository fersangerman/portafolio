"use client";

import { useState } from "react";
import ProjectCard, { type Project } from "./ProjectCard";

interface FilterOption {
  key: string;
  label: string;
}

interface Props {
  projects: Project[];
  filters: FilterOption[];
  allLabel: string;
}

function matchesFilter(project: Project, filterKey: string): boolean {
  const key = project.categoryKey;
  if (Array.isArray(key)) return key.includes(filterKey);
  return key === filterKey;
}

export default function PortfolioGrid({ projects, filters, allLabel }: Props) {
  const [active, setActive] = useState("all");

  const visible =
    active === "all"
      ? projects
      : projects.filter((p) => matchesFilter(p, active));

  const isFiltered = active !== "all";

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActive("all")}
          className={[
            "text-sm font-medium px-4 py-1.5 rounded-full border transition-all duration-200",
            active === "all"
              ? "bg-ink text-cream border-ink"
              : "bg-transparent text-ink-muted border-border hover:border-ink hover:text-ink",
          ].join(" ")}
        >
          {allLabel}
        </button>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={[
              "text-sm font-medium px-4 py-1.5 rounded-full border transition-all duration-200",
              active === f.key
                ? "bg-ink text-cream border-ink"
                : "bg-transparent text-ink-muted border-border hover:border-ink hover:text-ink",
            ].join(" ")}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            forceDefault={isFiltered}
          />
        ))}
      </div>
    </div>
  );
}
