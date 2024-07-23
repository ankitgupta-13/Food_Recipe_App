const truncateName = (name: string, maxWords: number) => {
  const words = name.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return name;
};

const SearchCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div
      className="relative w-[8.5rem] h-[9rem] bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
      <div className="absolute bottom-0 text-white p-2 rounded-lg">
        <div className="font-semibold">{truncateName(name, 4)}</div>
        <div className="text-xxs text-custom-light-gray">
          By Chef Sanjoy Kher
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
