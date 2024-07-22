import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Recipe } from "../types/recipe";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.idMeal} {...recipe} />
      ))}
    </div>
  );
};

export default Recipes;
