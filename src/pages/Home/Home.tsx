import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  getAllAreas,
  getAllCategories,
  getRecipesByCategory,
} from "../../api/recipe.api";
import { Categories, Header, Recipes, SearchBar } from "../../components";
import { setAreas, setCategories } from "../../redux/reducers/FilterSlice";
import { setRecipes } from "../../redux/reducers/RecipeSlide";
const Home = () => {
  const dispatch = useDispatch();
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
    <div>
      <Header />
      <SearchBar />
      <Categories />
      <Recipes />
    </div>
  );
};

export default Home;
