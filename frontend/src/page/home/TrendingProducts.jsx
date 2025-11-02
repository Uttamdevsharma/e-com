import React, { useState } from "react";
import ProductCards from "../shop/ProductCards";
import products from '../../data/products.json'

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const HandleLoadMoreProducts = () => {
    setVisibleProducts(preCount => preCount + 4)

  }
  return (
    <>
      <section className="max-w-screen-2xl mx-auto px-12 md:px-16 py-10 text-center">
        <h2 className="flex justify-center font-bold text-4xl mb-5">
          Trending Products
        </h2>
        <p className=" text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-6">
          Discover the Hottest picks: Elevate Your Style with our Curated
          Collection oTrending Women's Fashion Products in your choice that is
          Focus your desing choice hi hello say bye
        </p>


        {/* products card */}
        <ProductCards products={products.slice(0,visibleProducts)}/>


        {/* Load more button */}
        <div className="pt-15 md:pt-10">
          {
            visibleProducts < products.length &&
            <button onClick={HandleLoadMoreProducts} className=" bg-red-400 text-white  px-3 py-1  hover:bg-amber-700" >
              Load More
            </button> 
          }
        </div>
      </section>
    </>
  );
};

export default TrendingProducts;
