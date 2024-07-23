import Avatar from "../assets/Avatar.svg";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-base">Hello Jaya</h1>
          <p className="text-xs font-normal text-custom-light-gray">
            What are you cooking today?
          </p>
        </div>
        <div>
          <img src={Avatar} alt="Not found!" />
        </div>
      </div>
    </div>
  );
};

export default Header;
