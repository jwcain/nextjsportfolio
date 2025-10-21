export type Experience = {
  order: number;
  title: string;
  employer: string;
  location: string;
  description: string;
  date: string;
  details: string[];
};

export type Link = {
  url: string;
  name: string;
  icon: string;
};

export type Project = {
  order: number;
  title: string;
  description: string;
  links: Link[];
  tags: string[];
};
export type Ingredient = {
  name: string;
  amountOptions: string[];
};

export type RecipeStep = {
  description: string;
  ingredient: Ingredient[];
};

export type Recipe = {
  order: number;
  id: string;
  title: string;
  description: string;
  steps: RecipeStep[];
};

export type Biography = {
  name: string;
  description: string;
  education: string;
  email: string;
};
