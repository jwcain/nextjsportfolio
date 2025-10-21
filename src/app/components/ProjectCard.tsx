"use client";
import { Project } from "@/app/Types";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-black/10 rounded-2xl shadow-inner shadow-black/30 p-3 flex flex-col gap-3">
      <span className={"text-xl"}>{project.title}</span>
      <div className={""}>
        <div className={"flex flex-row gap-3"}>
          {project.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-[var(--accent-dark)]/10 px-3 py-1 rounded-2xl shadow-inner shadow-black/30"
            >
              <span className="font-medium">{tag}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-[var(--accent-light)]"></div>

      <span>{project.description}</span>

      <div className={"flex flex-row gap-3"}>
        {project.links.map((link) => (
          <button
            className="bg-[var(--accent-dark)] rounded-full
            shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),0_2px_4px_rgba(255,255,255,0.05)]
            hover:shadow-inner hover:shadow-black/30 hover:bg-[var(--accent-dark)]/50
            transition-all duration-200 p-2
"
            key={link.url}
            onClick={() => window.open(link.url, "_blank")}
          >
            {link.name}
          </button>
        ))}
      </div>
    </div>
  );
}
