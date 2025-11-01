import { useParams } from "react-router-dom";
import ProductCards from "../shop/ProductCards";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const displayName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "Category";

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 pt-24">
      
      {/* Page Heading */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
          {displayName}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Explore the best selection of {displayName.toLowerCase()} products curated just for you.
        </p>
      </div>

      {/* All Proudct show */}
      <div className="mt-12">
        <ProductCards />
      </div>

    </div>
  );
};

export default CategoryPage;
