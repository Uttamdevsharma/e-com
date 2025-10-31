import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/home/Home.jsx'
import ShopPage from '../page/shop/ShopPage.jsx'

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