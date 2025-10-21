import Navbar from "./Navbar";
import fs from "fs";
import path from "path";
import { Biography } from "@/app/Types";
import CopyButton from "@/app/components/CopyButton";

export default function Header() {
  const bioPath = path.join(process.cwd(), "public/content/bio.json");
  const bio: Biography = JSON.parse(fs.readFileSync(bioPath, "utf-8"));
  return (
    <div className="flex flex-col items-center justify-center gap-3 max-w-5xl mx-aut mt-8">
      <h1 className="text-4xl font-bold mb-4 text-[var(--accent-light)]">
        {bio.name}
      </h1>
      <p className="px-4 text-center max-w-xl mx-auto">{bio.description}</p>
      <p className="px-4 text-center">{bio.education}</p>
      <CopyButton textToCopy={bio.email} />
      <Navbar />
    </div>
  );
}
