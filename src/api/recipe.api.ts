import { Category } from "../types/category";
import { api } from "./axiosInstance";

export const getAllCategories = async () => {
  try {
    const response = await api.get("/list.php?c=list");
    if (response.status === 200) {
      return response.data.meals;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllAreas = async () => {
  try {
    const response = await api.get("/list.php?a=list");
    if (response.status === 200) {
      return response.data.meals;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesByCategory = async (categories: Category[]) => {
  if (categories.length === 0) return;
  try {
    let categoryQuery = "";
    categories.map(async (category) => {
      categoryQuery += "c=" + category.strCategory + "&";
    });

    const response = await api.get(`/filter.php?${categoryQuery}`);
    if (response.status === 200) {
      return response.data.meals;
    }
  } catch (error) {
    console.error(error);
  }
};
