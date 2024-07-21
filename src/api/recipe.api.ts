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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
