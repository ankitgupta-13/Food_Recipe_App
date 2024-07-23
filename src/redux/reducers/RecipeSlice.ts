import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../types/recipe";

const initialState = {
  recipes: [] as Recipe[],
  searchRecipes: [] as Recipe[],
  isLoadingAllCategoriesRecipe: true,
  isLoadingSearchRecipes: true,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipesLoading: (state, action) => {
      state.isLoadingAllCategoriesRecipe = action.payload;
    },
    setLoadingSearchRecipes: (state, action) => {
      state.isLoadingSearchRecipes = action.payload;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setSearchRecipes: (state, action) => {
      state.searchRecipes = action.payload;
    },
  },
});

export const {
  setRecipes,
  setSearchRecipes,
  setRecipesLoading,
  setLoadingSearchRecipes,
} = recipeSlice.actions;

export default recipeSlice.reducer;
