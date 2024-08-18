import App from '../App'
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/home/Home';
import Shop from '../pages/shop/Shop';
import ProductDetails from '../pages/shop/ProductDetails';
import Checkout from '../pages/checkout/Checkout';
import About from '../components/About/About';
import ErrorPage from '../components/Error/ErrorPage';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import Product from '../pages/Dashboard/Product/Product';
import Order from '../pages/Dashboard/Order/Order';
import Dashboard from '../pages/Dashboard/Dashboard';
import UpdateProduct from '../pages/Dashboard/UpdateProduct/UpdateProduct';

const router = createBrowserRouter([
    {
        path : '/',
        element : <App></App>,
        errorElement : <ErrorPage></ErrorPage>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path : '/shop',
                element : <Shop></Shop>
            },
            {
                path : '/productDetails/:id',
                element : <ProductDetails></ProductDetails>
            },
            {
                path : '/checkout',
                element : <Checkout></Checkout>
            },
            {
                path : '/about',
                element : <About></About>
            },
        ]
    },
    {
        path: '/dashboard',
        element : <DashboardHome></DashboardHome>,
        children : [
            {
                path : '/dashboard/home',
                element : <Dashboard></Dashboard>
            },
            {
                path : '/dashboard/product',
                element : <Product></Product>
            },
            {
                path : '/dashboard/order',
                element : <Order></Order>
            },
            {
                path : '/dashboard/update/product/:id',
                element : <UpdateProduct></UpdateProduct>
            }
        ]
    }
])

export default router;