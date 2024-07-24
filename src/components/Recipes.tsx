import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Recipe } from "../types/recipe"; // Adjust path as necessary
import RecipeCard from "./RecipeCard"; // Adjust path as necessary
import SkeletonCard from "./Skeleton";

const Recipes = () => {
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const isLoadingAllCategoriesRecipe = useSelector(
    (state: RootState) => state.recipe.isLoadingAllCategoriesRecipe
  );

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      {isLoadingAllCategoriesRecipe ? (
        <div className="flex gap-3">
          <SkeletonCard {...{ w: 36, h: 60 }} />
          <SkeletonCard {...{ w: 36, h: 60 }} />
          <SkeletonCard {...{ w: 36, h: 60 }} />
          <SkeletonCard {...{ w: 36, h: 60 }} />
        </div>
      ) : (
        <div className="flex gap-3">
          {recipes.length === 0 ? (
            <p>No recipes found</p>
          ) : (
            recipes.map((recipe: Recipe) => (
              <RecipeCard key={recipe.idMeal} {...recipe} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Recipes;
