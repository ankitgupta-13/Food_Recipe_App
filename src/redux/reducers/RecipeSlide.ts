import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../types/recipe";

const initialState = {
  recipes: [] as Recipe[],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export const { setRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
