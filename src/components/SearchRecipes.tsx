import { useDispatch, useSelector } from "react-redux";
import ArrowLeft from "../assets/Arrow-Left.svg";
import { setShowSearch } from "../redux/reducers/FilterSlice";
import { RootState } from "../redux/store";
import { Recipe } from "../types/recipe";
import SearchBar from "./SearchBar";
import SearchCard from "./SearchCard";
import SkeletonCard from "./Skeleton";

const SearchRecipes = () => {
  const dispatch = useDispatch();
  const searchRecipes = useSelector(
    (state: RootState) => state.recipe.searchRecipes
  );
  const isLoadingSearchRecipes = useSelector(
    (state: RootState) => state.recipe.isLoadingSearchRecipes
  );
  const searchInput = useSelector(
    (state: RootState) => state.filter.searchInput
  );

  return (
    <div className="flex justify-center pt-10">
      <div className="flex flex-col gap-4 w-5/6">
        <div className="flex items-center h-7">
          <img
            src={ArrowLeft}
            alt="Back"
            className="cursor-pointer"
            onClick={() => dispatch(setShowSearch(false))}
          />
          <div className="w-11/12">
            <h1 className="text-center font-semibold text-lg">Search Recipe</h1>
          </div>
        </div>
        <SearchBar />
        <div>
          {searchInput.length === 0 ? (
            <p className="text-custom-dark-gray text-sm py-2">
              What recipe will make you smile today?
            </p>
          ) : isLoadingSearchRecipes ? (
            <div className="flex pt-10 gap-3">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : searchRecipes.length === 0 ? (
            <p className="text-custom-dark-gray text-sm py-2">
              No recipes found!
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="font-semibold">
                {searchInput.length !== 0
                  ? "Search Result"
                  : "Suggested Recipes"}
              </div>
              <div className="h-full flex gap-y-3 flex-wrap justify-between">
                {searchRecipes.map((recipe: Recipe) => (
                  <SearchCard
                    key={recipe.idMeal}
                    name={recipe.strMeal}
                    image={recipe.strMealThumb}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRecipes;
