import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Area } from "../../types/area";
import { Category } from "../../types/category";

export interface FilterState {
  categories: Category[];
  areas: Area[];
  showFilter: boolean;
  showSearch: boolean;
}

const initialState: FilterState = {
  categories: [],
  areas: [],
  showFilter: false,
  showSearch: false,
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
    setShowSearch: (state, action: PayloadAction<boolean>) => {
      state.showSearch = action.payload;
    },
  },
});

export const { setCategories, setAreas, setShowFilter, setShowSearch } =
  filterSlice.actions;

export default filterSlice.reducer;
