import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesByCategory } from "../api/recipe.api";
import { setRecipes } from "../redux/reducers/RecipeSlide";
import { RootState } from "../redux/store";
import { Category } from "../types/category";

const Categories = () => {
  type HomeCategory = {
    id: number;
    name: string;
    active: boolean;
  };
  const dispatch = useDispatch();
  const [homeCategories, setHomeCategories] = useState<HomeCategory[]>([
    { id: 1, name: "All", active: true },
    { id: 2, name: "Chicken", active: false },
    { id: 3, name: "Vegetarian", active: false },
    { id: 4, name: "Dessert", active: false },
  ]);

  const handleHomeCategory = (category: string) => {
    setHomeCategories(
      homeCategories.map((homeCategory) => {
        return {
          ...homeCategory,
          active: homeCategory.name === category,
        };
      })
    );
  };
  const allCategories = useSelector(
    (state: RootState) => state.filter.categories
  );

  const mutation = useMutation({
    mutationFn: async (newCategory: Category[]) => {
      newCategory[0].strCategory === "All"
        ? (newCategory = allCategories)
        : newCategory;
      const response = await getRecipesByCategory(newCategory);
      dispatch(setRecipes(response));
      return response;
    },
  });

  return (
    <div className="flex justify-between">
      {homeCategories.map((category: HomeCategory) => {
        return (
          <div
            key={category.id}
            className={`text-custom-green cursor-pointer text-xs px-4 py-2 rounded-lg ${
              category.active ? "text-white bg-custom-green" : ""
            } active:text-white active:bg-custom-green`}
            onClick={() => {
              mutation.mutate([
                {
                  strCategory: category.name,
                },
              ]);
              handleHomeCategory(category.name);
            }}
          >
            {category.name}
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
