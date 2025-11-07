import React, { useState } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRange: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const [productsPerPage] = useState(8);

  const {
    data,
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const { products, totalPages, totalProducts } = data;


  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  console.log(products);

  return (
    <>
      <section className="pt-22 max-w-screen-2xl px-12 md:px-16 mb-16 ">
        <div className="text-center bg-gray-100 py-20 mb-10">
          <h1>Shop Page</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
            molestiae iusto veniam dignissimos eligendi atque animi sed ducimus
            nemo itaque.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          <div>
            <p>Categories</p>
          </div>
          <div>
            <h1 className="mb-4 px-12">
              Showing {startProduct} to {endProduct} of {totalProducts} Products
            </h1>
            <ProductCards products={products} />

            {/* pagination */}
            <div className="mt-6 flex justify-center space-x-2">
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } `}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
