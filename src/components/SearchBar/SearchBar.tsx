import Filter from "../../assets/Filter.svg";
import Search from "../../assets/Search.svg";

const SearchBar = () => {
  return (
    <div className="flex h-10 gap-5">
      <div className="flex items-center h-full gap-2 rounded-lg border-2 border-custom-gray p-2">
        <img src={Search} className="" alt="not found" />
        <input
          type="text"
          className="border-none rounded-lg focus:outline-none w-4/5"
          placeholder="Search Recipe"
        />
      </div>
      <img src={Filter} alt="not found" />
    </div>
  );
};

export default SearchBar;
