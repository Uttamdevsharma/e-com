import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: '#fff',
          color: '#333',
          borderRadius: '8px',
          padding: '10px 16px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        },
        duration: 3000,
      }}
      containerStyle={{
        top: 20,
      }}
      reverseOrder={false}
      gutter={8}
    />
  </Provider>
)
