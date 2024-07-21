import { useState } from "react";

const Categories = () => {
  type Category = {
    id: number;
    name: string;
    active: boolean;
  };

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "All", active: true },
    { id: 2, name: "Chicken", active: false },
    { id: 3, name: "Vegetarian", active: false },
    { id: 4, name: "Dessert", active: false },
  ]);

  const handleActiveCategory = (name: string) => {
    const updatedCategories = categories.map((category) => {
      if (category.name === name) {
        return { ...category, active: true };
      } else {
        return { ...category, active: false };
      }
    });
    setCategories(updatedCategories);
  };

  return (
    <div className="flex gap-1 justify-between">
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className={`text-custom-green cursor-pointer text-xs px-5 py-2 rounded-lg ${
              category.active ? "text-white bg-custom-green" : ""
            } active:text-white active:bg-custom-green`}
            onClick={() => handleActiveCategory(category.name)}
          >
            {category.name}
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
