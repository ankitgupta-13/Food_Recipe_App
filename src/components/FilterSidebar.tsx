import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Area } from "../types/area";
import { Category } from "../types/category";

const FilterSidebar = () => {
  const allCategories = useSelector(
    (state: RootState) => state.filter.categories
  );
  const allAreas = useSelector((state: RootState) => state.filter.areas);
  console.log(allAreas);
  return (
    <div>
      <h1>Filter Search</h1>
      <div>
        <div>Category</div>
        <div className="h-full flex flex-wrap gap-2">
          {allCategories.map((category: Category, index: number) => (
            <div key={index}>{category.strCategory}</div>
          ))}
        </div>
      </div>
      <div>
        <div>Area</div>
        <div className="h-full flex flex-wrap gap-2">
          {allAreas.map((area: Area, index: number) => (
            <div key={index}>{area.strArea}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
