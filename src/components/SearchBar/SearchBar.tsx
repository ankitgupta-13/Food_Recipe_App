import { useMutation } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesBySearch } from "../../api/recipe.api";
import Filter from "../../assets/Filter.svg";
import Search from "../../assets/Search.svg";
import { setShowFilter, setShowSearch } from "../../redux/reducers/FilterSlice";
import { setSearchRecipes } from "../../redux/reducers/RecipeSlice";
import { RootState } from "../../redux/store";

const SearchBar = () => {
  const dispatch = useDispatch();
  const showFilter = useSelector((state: RootState) => state.filter.showFilter);
  const showSearch = useSelector((state: RootState) => state.filter.showSearch);

  const mutation = useMutation({
    mutationFn: async (search: string) => {
      const response = await getRecipesBySearch(search);
      if (response) {
        dispatch(setSearchRecipes(response));
      }
      return response;
    },
  });

  // Create a debounced version of the mutate function
  const debouncedMutate = useCallback(
    debounce((value: string) => {
      mutation.mutate(value);
    }, 500),
    []
  );

  return (
    <div className="flex h-10 gap-5">
      <div
        className="flex items-center justify-between w-11/12 h-full gap-2 rounded-lg border-2 border-custom-gray p-2"
        onClick={() => dispatch(setShowSearch(true))}
      >
        <img src={Search} className="" alt="Search" />
        {showSearch ? (
          <input
            className="text-custom-light-gray text-xs border-none outline-none w-11/12"
            placeholder="Search Recipe"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              debouncedMutate(e.target.value)
            }
          />
        ) : (
          <p className="text-custom-light-gray text-xs">Search Recipe</p>
        )}
      </div>
      <img
        src={Filter}
        alt="Filter"
        onClick={() => dispatch(setShowFilter(!showFilter))}
      />
    </div>
  );
};

export default SearchBar;
