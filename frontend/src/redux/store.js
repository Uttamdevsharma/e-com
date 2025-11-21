import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import productApi from './features/products/productsApi'
import reviewsApi from './features/reviews/reviesApi'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth : authReducer,
      [productApi.reducerPath]: productApi.reducer,      
      [reviewsApi.reducerPath]: reviewsApi.reducer,
      cart : cartReducer,     
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware,productApi.middleware,reviewsApi.middleware)

})