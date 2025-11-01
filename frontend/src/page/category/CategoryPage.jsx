import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="pt-24 px-12 md:px-16 ">
      <h1 className="text-3xl font-bold text-gray-800">
        {categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : "Category"} Page
      </h1>
    </div>
  );
};

export default CategoryPage;
