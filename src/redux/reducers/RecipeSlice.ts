import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../types/recipe";

const initialState = {
  recipes: [] as Recipe[],
  searchRecipes: [] as Recipe[],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setSearchRecipes: (state, action) => {
      state.searchRecipes = action.payload;
    },
  },
});

export const { setRecipes, setSearchRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
