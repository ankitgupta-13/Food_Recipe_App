import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Area } from "../../types/area";
import { Category } from "../../types/category";

export interface FilterState {
  categories: Category[];
  areas: Area[];
  showFilter: boolean;
}

const initialState: FilterState = {
  categories: [],
  areas: [],
  showFilter: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setAreas: (state, action: PayloadAction<Area[]>) => {
      state.areas = action.payload;
    },
    setShowFilter: (state, action: PayloadAction<boolean>) => {
      state.showFilter = action.payload;
    },
  },
});

export const { setCategories, setAreas, setShowFilter } = filterSlice.actions;

export default filterSlice.reducer;
