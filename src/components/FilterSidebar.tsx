import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesByArea, getRecipesByCategory } from "../api/recipe.api";
import ArrowLeft from "../assets/Arrow-Left.svg";
import { setShowFilter } from "../redux/reducers/FilterSlice";
import { RootState } from "../redux/store";
import { Area } from "../types/area";
import { Category } from "../types/category";
import { Recipe } from "../types/recipe";
import ListItemButton from "./ListItemButton";
import SearchCard from "./SearchCard";

const FilterSidebar = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const dispatch = useDispatch();
  const allCategories = useSelector(
    (state: RootState) => state.filter.categories
  );
  const allAreas = useSelector((state: RootState) => state.filter.areas);

  const handleCategoryClick = (category: Category) => {
    if (category.strCategory === "All") {
      if (selectedCategories.length === allCategories.length) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(allCategories);
      }
    } else {
      setSelectedCategories((prev) =>
        prev.some((cat) => cat.strCategory === category.strCategory)
          ? prev.filter((cat) => cat.strCategory !== category.strCategory)
          : [...prev, category]
      );
    }
  };

  const handleAreaClick = (area: Area) => {
    if (area.strArea === "All") {
      if (selectedAreas.length === allAreas.length) {
        setSelectedAreas([]);
      } else {
        setSelectedAreas(allAreas);
      }
    } else {
      setSelectedAreas((prev) =>
        prev.some((a) => a.strArea === area.strArea)
          ? prev.filter((a) => a.strArea !== area.strArea)
          : [...prev, area]
      );
    }
  };

  const mutation = useMutation({
    mutationFn: async ({
      selectedCategories,
      selectedAreas,
    }: {
      selectedCategories: Category[];
      selectedAreas: Area[];
    }) => {
      const filteredRecipesByCategory = await getRecipesByCategory(
        selectedCategories
      );
      const filteredRecipesByArea = await getRecipesByArea(selectedAreas);
      if (selectedCategories.length === 0) {
        setSelectedRecipes(filteredRecipesByArea);
        return filteredRecipesByArea;
      }
      if (selectedAreas.length === 0) {
        setSelectedRecipes(filteredRecipesByCategory);
        return filteredRecipesByCategory;
      }
      const filteredRecipes = filteredRecipesByCategory.filter((recipe) =>
        filteredRecipesByArea.some((r) => r.idMeal === recipe.idMeal)
      );
      console.log(filteredRecipes);
      setSelectedRecipes(filteredRecipes);
      return filteredRecipes;
    },
  });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 w-[94%]">
        <div className="flex items-center h-7">
          <img
            src={ArrowLeft}
            alt="not found"
            className="cursor-pointer"
            onClick={() => dispatch(setShowFilter(false))}
          />
          <div className="w-11/12">
            <h1 className="text-center font-semibold text-lg">Filter Search</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Category</div>
          <div className="h-full flex flex-wrap gap-2">
            <ListItemButton
              name="All"
              selected={selectedCategories.length === allCategories.length}
              onClick={() => handleCategoryClick({ strCategory: "All" })}
            />
            {allCategories.map((category: Category, index: number) => (
              <ListItemButton
                key={index}
                name={category.strCategory}
                selected={selectedCategories.some(
                  (cat) => cat.strCategory === category.strCategory
                )}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Area</div>
          <div className="h-full flex flex-wrap gap-2">
            <ListItemButton
              name="All"
              selected={
                selectedAreas.length === allAreas.length &&
                selectedAreas.length > 0
              }
              onClick={() => handleAreaClick({ strArea: "All" })}
            />
            {allAreas.map((area: Area, index: number) => (
              <ListItemButton
                key={index}
                name={area.strArea}
                selected={selectedAreas.some((a) => a.strArea === area.strArea)}
                onClick={() => handleAreaClick(area)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-custom-green text-white w-44 h-9 rounded-lg"
            onClick={() =>
              mutation.mutate({
                selectedCategories,
                selectedAreas,
              })
            }
          >
            Filter
          </button>
        </div>
        <div>
          {selectedRecipes.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="font-semibold">Recipes</div>
              <div className="h-full flex gap-y-2 flex-wrap justify-between">
                {selectedRecipes.map((recipe: Recipe) => (
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

export default FilterSidebar;
