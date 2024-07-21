import Avatar from "../../assets/Avatar.svg";

const Header = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="">Hello Jaya</h1>
        <p>What are you cooking today?</p>
      </div>
      <div>
        <img src={Avatar} alt="Not found!" />
      </div>
    </div>
  );
};

export default Header;
