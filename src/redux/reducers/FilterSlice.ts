import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Area } from "../../types/area";
import { Category } from "../../types/category";

export interface FilterState {
  categories: Category[];
  areas: Area[];
  searchInput: string;
  showFilter: boolean;
  showSearch: boolean;
  showAssistant: boolean;
  isAssistantActive: boolean;
}

const initialState: FilterState = {
  categories: [],
  areas: [],
  searchInput: "",
  showFilter: false,
  showSearch: false,
  showAssistant: false,
  isAssistantActive: false,
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
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    setShowFilter: (state, action: PayloadAction<boolean>) => {
      state.showFilter = action.payload;
    },
    setShowSearch: (state, action: PayloadAction<boolean>) => {
      state.showSearch = action.payload;
    },
    setShowAssistant: (state, action: PayloadAction<boolean>) => {
      state.showAssistant = action.payload;
    },
    setIsAssistantActive: (state, action: PayloadAction<boolean>) => {
      state.isAssistantActive = action.payload;
    },
  },
});

export const {
  setCategories,
  setAreas,
  setSearchInput,
  setShowFilter,
  setShowSearch,
  setShowAssistant,
  setIsAssistantActive,
} = filterSlice.actions;

export default filterSlice.reducer;
