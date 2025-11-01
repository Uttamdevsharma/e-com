import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/home/Home.jsx'
import ShopPage from '../page/shop/ShopPage.jsx'
import CategoryPage from '../page/category/CategoryPage.jsx'

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
    }
])

export default router