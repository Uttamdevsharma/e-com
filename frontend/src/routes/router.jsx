import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/home/Home.jsx'
import ShopPage from '../page/shop/ShopPage.jsx'
import CategoryPage from '../page/category/CategoryPage.jsx'
import Login from '../components/Login.jsx'


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
                path: '/categories/:categoryName',
                element : <CategoryPage/>
            }
        ]
    },
    {
        path : '/login',
        element : <Login/>
    }
])

export default router