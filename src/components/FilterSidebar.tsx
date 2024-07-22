import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getRecipesByArea, getRecipesByCategory } from "../api/recipe.api";
import { RootState } from "../redux/store";
import { Area } from "../types/area";
import { Category } from "../types/category";
import ListItemButton from "./ListItemButton";

const FilterSidebar = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);

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
    console.log(selectedAreas);
  };

  const mutation = useMutation({
    mutationFn: async ({
      selectedCategories,
      selectedAreas,
    }: {
      selectedCategories: Category[];
      selectedAreas: Area[];
    }) => {
      // Pass both selectedCategories and selectedAreas to the API
      const filteredRecipesByCategory = await getRecipesByCategory(
        selectedCategories
      );
      const filteredRecipesByArea = await getRecipesByArea(selectedAreas);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center">Filter Search</h1>
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
    </div>
  );
};

export default FilterSidebar;
