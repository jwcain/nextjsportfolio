"use client";
import { Recipe, Ingredient } from "@/app/Types";
import Link from "next/link";

type RecipeCardProps = {
  recipe: Recipe;
  withSteps: boolean;
};

// Sum ingredients and track if an ingredient is used in multiple steps
export function sumIngredients(
  ingredients: Ingredient[],
): { name: string; amountOptions: string[]; combined: boolean }[] {
  const map = new Map<
    string,
    { amounts: string[]; alternatives: string[]; combined: boolean }
  >();

  ingredients.forEach(({ name, amountOptions }) => {
    if (!amountOptions || amountOptions.length === 0) return;

    const primary = amountOptions[0].trim();
    const alt = amountOptions.slice(1);

    if (map.has(name)) {
      const entry = map.get(name)!;
      entry.amounts.push(primary);
      entry.alternatives.push(...alt);
      entry.combined = true; // Mark as combined if appears again
    } else {
      map.set(name, { amounts: [primary], alternatives: alt, combined: false });
    }
  });

  return Array.from(map.entries()).map(
    ([name, { amounts, alternatives, combined }]) => ({
      name,
      amountOptions: [...[amounts.join(" + ")], ...alternatives],
      combined,
    }),
  );
}

export default function RecipeCard({ recipe, withSteps }: RecipeCardProps) {
  // Flatten all ingredients from every step
  const allIngredients = recipe.steps.flatMap((step) => step.ingredient || []);
  const summedIngredients = sumIngredients(allIngredients);
  const hasCombined = summedIngredients.some((ing) => ing.combined);

  return (
    <div className="flex flex-col gap-3 bg-black/10 p-3 rounded-2xl shadow-inner shadow-black/30">
      <Link
        href={`/recipes/${recipe.id}`}
        className="self-start bg-[var(--accent-dark)] rounded-full
          shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),0_2px_4px_rgba(255,255,255,0.05)]
          hover:shadow-inner hover:shadow-black/30 hover:bg-[var(--accent-dark)]/50
          transition-all duration-200 px-4 py-2"
      >
        View Full Recipe →
      </Link>
      <div className="text-xl font-semibold">{recipe.title}</div>
      <div>{recipe.description}</div>
      <div className="border-b border-[var(--accent-light)]"></div>

      {/* Summed ingredients */}
      <div className="grid gap-1 grid-cols-1 md:grid-cols-2">
        {summedIngredients.map((ingredient, index) => (
          <span key={index}>
            ♦ {ingredient.amountOptions.join(" (")}
            {ingredient.amountOptions.length > 1 ? ")" : ""} {ingredient.name}
            {ingredient.combined && (
              <span className="text-[var(--accent-light)]">*</span>
            )}
          </span>
        ))}
      </div>
      {/* Show note only if any combined */}
      {hasCombined && (
        <div className="mb-2 text-sm text-[var(--accent-light)] italic">
          * ingredient split across steps
        </div>
      )}
      {/* Steps */}
      {withSteps ? (
        <div className="mt-4 flex flex-col gap-4">
          {recipe.steps.map((step, stepIndex) => (
            <div key={stepIndex} className="flex flex-row gap-3 py-2">
              <div className="font-bold w-6 text-center text-[var(--accent-light)]">
                {stepIndex + 1}
              </div>
              <div className="flex flex-col gap-1">
                <span>{step.description}</span>
                {step.ingredient.length > 0 && (
                  <div className="grid gap-1 grid-cols-1 md:grid-cols-2 px-4">
                    {step.ingredient.map((ing, i) => (
                      <span key={ing.name + i}>
                        ♦ {ing.amountOptions.join(" (")}
                        {ing.amountOptions.length > 1 ? ")" : ""} {ing.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Link
          href={`/recipes/${recipe.id}`}
          className="self-start bg-[var(--accent-dark)] rounded-full
            shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),0_2px_4px_rgba(255,255,255,0.05)]
            hover:shadow-inner hover:shadow-black/30 hover:bg-[var(--accent-dark)]/50
            transition-all duration-200 px-4 py-2"
        >
          View Full Recipe →
        </Link>
      )}
    </div>
  );
}
