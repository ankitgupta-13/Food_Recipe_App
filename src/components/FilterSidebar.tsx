import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/recipe.api";

const FilterSidebar = () => {
  const {
    data: allCategories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const data = await getAllCategories();
      return data;
    },
    staleTime: Infinity,
  });

  return (
    <div>
      {isLoading
        ? "Loading..."
        : isError
        ? error.message
        : allCategories.map((category: { strCategory: string }) => (
            <div>{category.strCategory}</div>
          ))}
    </div>
  );
};

export default FilterSidebar;
