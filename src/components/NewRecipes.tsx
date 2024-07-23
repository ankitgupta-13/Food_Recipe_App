import Recipe1 from "../assets/NewRecipe1.svg";
import Recipe2 from "../assets/NewRecipe2.svg";
import Profile1 from "../assets/Profile1.svg";
import Profile2 from "../assets/Profile2.svg";
import NewRecipeCard from "./NewRecipeCard";

const NewRecipes = () => {
  const newRecipes = [
    {
      idMeal: 1,
      strMeal: "Steak with tomato sauce",
      strMealThumb: Recipe1,
      profile: Profile1,
      owner: "James Milner",
    },
    {
      idMeal: 2,
      strMeal: "Pilaf sweet with chicken",
      strMealThumb: Recipe2,
      profile: Profile2,
      owner: "Laura Wilson",
    },
    {
      idMeal: 3,
      strMeal: "Pilaf sweet with chicken",
      strMealThumb: Recipe2,
      profile: Profile2,
      owner: "Laura Wilson",
    },
    {
      idMeal: 4,
      strMeal: "Pilaf sweet with chicken",
      strMealThumb: Recipe2,
      profile: Profile2,
      owner: "Laura Wilson",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-base">New Recipes of your Area</p>
      <div className="flex overflow-x-auto gap-2 overflow-y-hidden">
        {newRecipes.map((recipe) => (
          <NewRecipeCard
            key={recipe.idMeal}
            name={recipe.strMeal}
            image={recipe.strMealThumb}
            profile={recipe.profile}
            owner={recipe.owner}
          />
        ))}
      </div>
    </div>
  );
};

export default NewRecipes;
