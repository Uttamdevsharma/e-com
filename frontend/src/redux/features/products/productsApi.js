import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/gateBaseUrl";

const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    //fetch product by query 
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = URLSearchParams({
          category: category || " ",
          color: color || " ",
          minPrice: minPrice || 0,
          maxPrice: maxPrice || " ",
          page: page.toString(),
          limit: limit.toString(),
        });
        return `/${queryParams}`
      },
      providesTags: ['Products']
    }),

    //fetch product by id
    fetchProductById : builder.query({
        query: (id) => `${id}`,
        providesTags:['Products']
    }),

    //add a product
    AddProduct : builder.mutation({
        query: (newProduct) => ({
            url: '/create-product',
            method: 'POST',
            body: newProduct
        }),
        invalidatesTags: ['Products']
    }),


    //update a product
    UpdateProduct: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/update-product/ ${id}`,
                method: 'PATCH',
                body : rest
            }),
            invalidatesTags:['Products']

    }),


    //delete a product
    DeleteProduct: builder.mutation({
        query : (id) =>( {
            url: `/${id}`,
            method: 'DELETE',

        }),
        invalidatesTags: ['Products']
    })

  }),
});

const {useFetchAllProductsQuery , useAddProductMutation,useDeleteProductMutation,useFetchProductByIdQuery,useUpdateProductMutation} = productApi


export default productApi