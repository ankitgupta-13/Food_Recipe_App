import Bookmark from "../assets/Bookmark.svg";
import { Recipe } from "../types/recipe";
const RecipeCard = ({ strMeal, strMealThumb }: Recipe) => {
  return (
    <div className="h-60 w-36 relative flex-shrink-0">
      <div className="flex justify-center">
        <img
          src={strMealThumb}
          className="h-28 w-28 rounded-full absolute top-0 z-10"
          alt="Not found"
        />
      </div>
      <div className="p-2 bg-custom-gray h-3/4 w-full absolute rounded-xl bottom-0 bg-opacity-50 flex flex-col justify-end gap-2">
        <div className="h-2/3 pt-2 flex flex-col justify-between">
          <div className="w-full flex justify-center">
            <p className=" w-3/4 text-center text-sm font-semibold text-custom-dark-gray">
              {strMeal.length > 20 ? `${strMeal.slice(0, 20)}...` : strMeal}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-custom-light-gray text-xs">Time</span>
              <span className="font-semibold text-custom-dark-gray text-xs">
                15 Mins
              </span>
            </div>
            <div className="bg-white w-6 h-6 rounded-full flex justify-center ">
              <img src={Bookmark} alt="" className="w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
