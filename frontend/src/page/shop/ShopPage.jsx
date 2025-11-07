import React from 'react'
import ProductCards from './ProductCards'
import  { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'




const ShopPage = () => {

  const { data, error, isLoading } = useFetchAllProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  
  const { products , totalPages, totalProducts } = data
  
  console.log(products);
  

  return (
    <>

    <section className='pt-22 max-w-screen-2xl px-12 md:px-16  '>
      <div className='text-center bg-gray-100 py-20 mb-10'>
        <h1>Shop Page</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi molestiae iusto veniam dignissimos eligendi atque animi sed ducimus nemo itaque.</p>

      </div>

      <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
           <div>
               <p>Categories</p>
           </div>
           <div>
              <h1 className='mb-4 px-12'>Showing 1 to 9 of 9 Products</h1>
              <ProductCards products={products}/>
           </div>
      </div>
    </section>
    
    </>
  )
}

export default ShopPage
