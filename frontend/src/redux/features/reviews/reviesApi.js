import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/gateBaseUrl";

const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${getBaseUrl()}/api/reviews`,
      credentials: 'include'
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
      postAReview: builder.mutation({
        query: (reviewData) => ({
          url: '/post-review',
          method: 'POST',
          body: reviewData
        }),
        invalidatesTags: (result, error, reviewData) => [
          { type: 'Reviews', id: reviewData.productId }
        ]
      }),
  
      getReviewsCount: builder.query({
        query: () => ({
          url: '/total-reviews'
        })
      }),
  
      getReviewByUserId: builder.query({
        query: (userId) => ({
          url: `/${userId}`
        }),
        providesTags: (result, error, userId) => [{ type: 'Reviews', id: userId }],
      })
    })
  });
  
  export const { 
    useGetReviewByUserIdQuery, 
    useGetReviewsCountQuery, 
    usePostAReviewMutation 
  } = reviewsApi;
  
  export default reviewsApi;
  