import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/home/Home'
import ShopPage from '../page/shop/ShopPage'

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
            }
        ]
    }
])

export default router