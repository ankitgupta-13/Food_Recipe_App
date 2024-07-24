import { useMutation } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesBySearch } from "../api/recipe.api";
import Filter from "../assets/Filter.svg";
import Microphone from "../assets/Microphone.svg";
import Search from "../assets/Search.svg";
import {
  setIsAssistantActive,
  setSearchInput,
  setShowAssistant,
  setShowFilter,
  setShowSearch,
} from "../redux/reducers/FilterSlice";
import {
  setLoadingSearchRecipes,
  setSearchRecipes,
} from "../redux/reducers/RecipeSlice";
import { RootState } from "../redux/store";

const SearchBar = () => {
  const dispatch = useDispatch();
  const showFilter = useSelector((state: RootState) => state.filter.showFilter);
  const showSearch = useSelector((state: RootState) => state.filter.showSearch);
  const searchInput = useSelector(
    (state: RootState) => state.filter.searchInput
  );
  const { mutate } = useMutation({
    mutationFn: async (search: string) => {
      if (search.trim()) {
        const response = await getRecipesBySearch(search);
        dispatch(setSearchInput(search));
        dispatch(setLoadingSearchRecipes(false));
        if (response) {
          dispatch(setSearchRecipes(response));
        } else {
          dispatch(setSearchRecipes([]));
        }
        return response;
      }
    },
    onMutate: () => {
      dispatch(setLoadingSearchRecipes(true));
    },
  });

  // Create a debounced function
  const debouncedMutate = useCallback(
    debounce((value: string) => {
      mutate(value);
    }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchInput(value));
    debouncedMutate(value);
  };

  return (
    <div className="flex h-10 gap-5">
      <div className="flex items-center justify-between w-11/12 h-full gap-2 rounded-lg border-2 border-custom-gray cursor-pointer px-2">
        <div
          className="flex items-center justify-between gap-2 h-full w-full"
          onClick={() => dispatch(setShowSearch(true))}
        >
          <img src={Search} alt="Search" />
          {showSearch ? (
            <input
              className="text-custom-light-gray text-xs border-none outline-none w-11/12"
              placeholder="Search Recipe"
              value={searchInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  debouncedMutate(searchInput);
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
          ) : (
            <div className="flex justify-start w-full">
              <p className="text-custom-light-gray text-xs">Search Recipe</p>
            </div>
          )}
        </div>
        <img
          src={Microphone}
          alt="Microphone"
          className="w-5 cursor-pointer transition-transform duration-200 "
          onClick={() => {
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
            dispatch(setShowAssistant(true));
            dispatch(setIsAssistantActive(true));
          }}
        />
      </div>
      <img
        src={Filter}
        alt="Filter"
        className="cursor-pointer"
        onClick={() => {
          dispatch(setShowFilter(!showFilter));
        }}
      />
    </div>
  );
};

export default SearchBar;
