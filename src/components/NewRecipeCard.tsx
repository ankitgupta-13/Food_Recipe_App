import Rating from "../assets/Rating.svg";
import Timer from "../assets/Timer.svg";

const NewRecipeCard = ({
  name,
  image,
  profile,
  owner,
}: {
  name: string;
  image: string;
  profile: string;
  owner: string;
}) => {
  return (
    <div className="flex w-42 h-32 flex-shrink-0 rounded-md items-end relative">
      <div className=" flex h-24 bg-white shadow-custom-light p-2">
        <div className="flex items-end gap-1">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">{name.slice(0, 14) + ".."}</p>
            <div className="flex justify-start">
              <img src={Rating} alt="not found" className="h-3" />
            </div>
            <div className="flex items-center gap-2">
              <img src={profile} alt="not found" />
              <span className="text-custom-light-gray text-xs font-normal">
                By {owner}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={Timer} alt="not found" />
            <p className="text-xs font-semibold text-custom-dark-gray">
              15 Mins
            </p>
          </div>
        </div>
        <img
          src={image}
          alt="not found"
          className="rounded-full w-20 h-20 absolute top-0 right-2"
        />
      </div>
    </div>
  );
};

export default NewRecipeCard;
