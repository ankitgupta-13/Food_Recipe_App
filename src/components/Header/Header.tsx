import { useSelector } from "react-redux";
import Avatar from "../../assets/Avatar.svg";
import { RootState } from "../../redux/store";
import FilterSidebar from "../FilterSidebar";

const Header = () => {
  const showFilter = useSelector((state: RootState) => state.filter.showFilter);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="">Hello Jaya</h1>
          <p>What are you cooking today?</p>
        </div>
        <div>
          <img src={Avatar} alt="Not found!" />
        </div>
      </div>
      {showFilter && (
        <div className="h-full">
          <FilterSidebar />
        </div>
      )}
    </div>
  );
};

export default Header;
