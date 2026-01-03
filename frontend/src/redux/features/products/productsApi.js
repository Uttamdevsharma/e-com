import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../apiBase";


const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    //fetch product by query 
    fetchAllProducts: builder.query({
        query: ({
          category = "all",
          color = "all",
          minPrice = 0,
          maxPrice = "",
          page = 1,
          limit = 10,
        } = {}) => {
          const queryParams = new URLSearchParams({
            category,
            color,
            minPrice,
            maxPrice,
            page: page.toString(),
            limit: limit.toString(),
          });
          return `/api/products?${queryParams.toString()}`;
        },
        providesTags: ["Products"],
      }),
      

    //fetch product by id
    fetchProductById : builder.query({
        query: (id) => `/api/products/${id}`,
        providesTags:['Products']
    }),

    //add a product
    AddProduct : builder.mutation({
        query: (newProduct) => ({
            url: '/api/products/create-product',
            method: 'POST',
            body: newProduct
        }),
        invalidatesTags: ['Products']
    }),


    //update a product
    UpdateProduct: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/api/products/update-product/${id}`,
                method: 'PATCH',
                body : rest
            }),
            invalidatesTags:['Products']

    }),


    //delete a product
    DeleteProduct: builder.mutation({
        query : (id) =>( {
            url: `/api/products/${id}`,
            method: 'DELETE',

        }),
        invalidatesTags: ['Products']
    })

  }),
});

export const {useFetchAllProductsQuery , useAddProductMutation,useDeleteProductMutation,useFetchProductByIdQuery,useUpdateProductMutation} = productApi


export default productApi