import fs from "fs";
import path from "path";
import RecipeCard from "@/app/components/RecipeCard";
import { Recipe } from "@/app/Types";

export default function RecipesPage() {
  const dir = path.join(process.cwd(), "public/content/recipe");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const recipes = files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")),
  );
  recipes.sort((a, b) => b.order - a.order);

  return (
    <div className="grid grid-cols-1 gap-6 p-2">
      {recipes.map((p: Recipe) => (
        <div key={p.title}>
          <RecipeCard recipe={p} withSteps={false} />
        </div>
      ))}
    </div>
  );
}
