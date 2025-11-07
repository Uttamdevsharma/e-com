import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import productApi from './features/products/productsApi'

export const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth : authReducer,
      [productApi.reducerPath]: productApi.reducer,

      
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware,productApi.middleware)

})