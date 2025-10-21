import path from "path";
import { promises as fs } from "fs";
import RecipeCard from "@/app/components/RecipeCard";
import { Recipe } from "@/app/Types";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecipeDetailPage({ params }: Readonly<Props>) {
  const { id } = await params;

  const filePath = path.join(
    process.cwd(),
    "public/content/recipe",
    `${id}.json`,
  );

  let recipe: Recipe;

  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    recipe = JSON.parse(fileContents) as Recipe;
  } catch (err) {
    console.warn(`Recipe JSON not found: ${filePath}`);
    return notFound(); // render Next.js 404 page
  }

  return (
    <div className="p-2">
      <RecipeCard recipe={recipe} withSteps={true} />
    </div>
  );
}
