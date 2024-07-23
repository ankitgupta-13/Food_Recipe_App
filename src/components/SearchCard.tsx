const SearchCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div
      className="relative w-[8.5rem] h-[9rem] bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
      <div className="flex flex-col gap-1 absolute bottom-0 text-white p-2 rounded-lg">
        <div className="font-semibold">
          {name.length > 15 ? name.slice(0, 15) + "..." : name}
        </div>
        <div className="text-xxs text-custom-light-gray">
          By Chef Sanjoy Kher
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
