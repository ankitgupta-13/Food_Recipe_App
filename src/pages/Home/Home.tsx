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
  NewRecipes,
  Recipes,
  SearchBar,
  SearchRecipes,
  VoiceAssistant,
} from "../../components";
import { setAreas, setCategories } from "../../redux/reducers/FilterSlice";
import {
  setRecipes,
  setRecipesLoading,
} from "../../redux/reducers/RecipeSlice";
import { RootState } from "../../redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const showFilter = useSelector((state: RootState) => state.filter.showFilter);
  const showSearch = useSelector((state: RootState) => state.filter.showSearch);
  const showAssistant = useSelector(
    (state: RootState) => state.filter.showAssistant
  );
  const { data: allCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await getAllCategories();
      if (response) {
        dispatch(setCategories(response));
        return response;
      } else {
        return [];
      }
    },
    staleTime: Infinity,
  });

  const {} = useQuery({
    queryKey: ["allAreas"],
    queryFn: async () => {
      const response = await getAllAreas();
      if (response) {
        dispatch(setAreas(response));
        return response;
      } else {
        return [];
      }
    },
    staleTime: Infinity,
  });

  const {} = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await getRecipesByCategory(allCategories);
      if (!response) return [];
      dispatch(setRecipesLoading(false));
      dispatch(setRecipes(response));
      return response;
    },
    staleTime: Infinity,
  });

  return (
    <div className="relative flex flex-col gap-5">
      <Header />
      <SearchBar />
      <Categories />
      <Recipes />
      <NewRecipes />
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-700 ease-in-out z-30 w-full overflow-y-scroll ${
          showFilter ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FilterSidebar />
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-700 ease-in-out z-20 w-full overflow-y-scroll ${
          showSearch ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <SearchRecipes />
      </div>
      <div
        className={`fixed top-0 right-0 h-full opacity-95 bg-black shadow-lg transform transition-transform duration-700 ease-in-out z-20 w-full overflow-y-scroll ${
          showAssistant ? "-translate-y-0" : "-translate-y-full"
        }`}
      >
        <VoiceAssistant />
      </div>
    </div>
  );
};

export default Home;
