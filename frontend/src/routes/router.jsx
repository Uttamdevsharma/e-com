import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/home/Home.jsx'
import ShopPage from '../page/shop/ShopPage.jsx'
import CategoryPage from '../page/category/CategoryPage.jsx'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import SingleProduct from '../page/shop/productDetails/SingleProduct.jsx'
import Cart from '../page/shop/Cart.jsx'
import SuccessPayment from '../components/SuccessPayment.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children : [
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/shop',
                element:<ShopPage/>
            },
            {
                path:'/shop/:id',
                element: <SingleProduct/>

            },
            {
                path:'/cart',
                element:<Cart/>

            },
            {
                path:'/success',
                element:<SuccessPayment/>
            },
            {
                path: '/categories/:categoryName',
                element : <CategoryPage/>
            }
        ]
    },
    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/register',
        element : <Register/>
    }
])

export default router