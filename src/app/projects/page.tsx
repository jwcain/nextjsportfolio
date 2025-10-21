import fs from "fs";
import path from "path";
import ProjectCard from "@/app/components/ProjectCard";
import { Project } from "@/app/Types";

export default function ProjectsPage() {
  const dir = path.join(process.cwd(), "public/content/project");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const projects = files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")),
  );
  projects.sort((a, b) => b.order - a.order);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6 p-2">
      {projects.map((p: Project) => (
        <div key={p.title}>
          <ProjectCard project={p} />
        </div>
      ))}
    </div>
  );
}
