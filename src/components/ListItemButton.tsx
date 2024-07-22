import React from "react";

interface ListItemButtonProps {
  name: string;
  selected: boolean;
  onClick: (name: string) => void;
}

const ListItemButton: React.FC<ListItemButtonProps> = ({
  name,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(name)}
      className={`border-2 rounded-xl px-3 py-1 text-xs cursor-pointer ${
        selected
          ? "bg-custom-green text-white"
          : "text-custom-green border-custom-green"
      }`}
    >
      {name}
    </div>
  );
};

export default ListItemButton;
