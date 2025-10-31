import React from "react";

const Categories = () => {
  return (
    <>
      <section class="product__grid">
        <a class="categories__card" href="/categories/accessories">
          <img src="./assets/category-1.jpg" alt="Accessories" />
          <h4>Accessories</h4>
        </a>
        <a class="categories__card" href="/categories/dress">
          <img src="./assets/category-2.jpg" alt="Dress Collection" />
          <h4>Dress Collection</h4>
        </a>
        <a class="categories__card" href="/categories/jewellery">
          <img src="./assets/category-3.jpg" alt="Jewellery" />
          <h4>Jewellery</h4>
        </a>
        <a class="categories__card" href="/categories/cosmetics">
          <img src="./assets/category-4.jpg" alt="Cosmetics" />
          <h4>Cosmetics</h4>
        </a>
      </section>
    </>
  );
};

export default Categories;
