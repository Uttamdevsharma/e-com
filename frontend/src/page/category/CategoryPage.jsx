import { useParams } from "react-router-dom";
import ProductCards from "../shop/ProductCards";
import { useEffect, useState } from "react";
import products from '../../data/products.json'



const CategoryPage = () => {
  const { categoryName } = useParams();
  const displayName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "Category";


    const [filterProducts,setFilterProducts] = useState([]);

    useEffect(() => {
       const filtered = products.filter((product) => product.category === categoryName.toLowerCase());
       setFilterProducts(filtered)
       window.scrollTo(0,0)
    },[])



  return (
    <div className="max-w-screen-2xl bg-gray-50 px-12 md:px-16 pt-24 md:pt-30">

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
        <ProductCards products={filterProducts} />
      </div>

    </div>
  );
};

export default CategoryPage;
