import { Area } from "../types/area";
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
  if (categories.length === 0) return [];

  try {
    // Array of promises for each area API call
    const promises = categories.map(async (category) => {
      const response = await api.get(`/filter.php?c=${category.strCategory}`);
      if (response.status === 200) {
        return response.data.meals;
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        return [];
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    const combinedResults = results.flat();
    return combinedResults;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getRecipesByArea = async (areas: Area[]) => {
  if (areas.length === 0) return [];

  try {
    const promises = areas.map(async (area) => {
      const response = await api.get(`/filter.php?a=${area.strArea}`);
      if (response.status === 200) {
        return response.data.meals;
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        return [];
      }
    });

    const results = await Promise.all(promises);

    const combinedResults = results.flat();
    return combinedResults;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getRecipesBySearch = async (search: string) => {
  try {
    const response = await api.get(`/search.php?s=${search}`);
    if (response.status === 200) {
      return response.data.meals;
    } else {
      console.error(`Unexpected status code: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
