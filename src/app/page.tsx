// app/page.tsx
import fs from "fs";
import path from "path";
import ExperienceCard from "@/app/components/ExperienceCard";
import { Experience } from "./Types";

export default function Home() {
  const dir = path.join(process.cwd(), "public/content/experience");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const experiences = files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")),
  );
  experiences.sort((a, b) => b.order - a.order);

  return (
    <div className="flex flex-col items-center justify-center  gap-3">
      <div className="grid grid-cols-1 gap-3 p-2">
        {experiences.map((p: Experience) => (
          <ExperienceCard key={p.title} experience={p} />
        ))}
      </div>
    </div>
  );
}
