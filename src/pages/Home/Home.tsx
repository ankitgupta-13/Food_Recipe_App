import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAreas,
  getAllCategories,
  getRecipesByCategory,
} from "../../api/recipe.api";
import {
  Categories,
  FilterSidebar,
  Header,
  Recipes,
  SearchBar,
  SearchRecipes,
} from "../../components";
import { setAreas, setCategories } from "../../redux/reducers/FilterSlice";
import { setRecipes } from "../../redux/reducers/RecipeSlice";
import { RootState } from "../../redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const showFilter = useSelector((state: RootState) => state.filter.showFilter);
  const showSearch = useSelector((state: RootState) => state.filter.showSearch);
  const { data: allCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await getAllCategories();
      dispatch(setCategories(response));
      return response;
    },
    staleTime: Infinity,
  });

  const {} = useQuery({
    queryKey: ["allAreas"],
    queryFn: async () => {
      const response = await getAllAreas();
      dispatch(setAreas(response));
      return response;
    },
    staleTime: Infinity,
  });

  const {} = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await getRecipesByCategory(allCategories);
      dispatch(setRecipes(response));
      return response;
    },
    staleTime: Infinity,
  });

  return (
    <div className="relative">
      <Header />
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-700 ease-in-out z-50 w-full overflow-y-scroll ${
          showFilter ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FilterSidebar />
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-700 ease-in-out z-50 w-full overflow-y-scroll ${
          showSearch ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <SearchRecipes />
      </div>
      <SearchBar />
      <Categories />
      <Recipes />
    </div>
  );
};

export default Home;
