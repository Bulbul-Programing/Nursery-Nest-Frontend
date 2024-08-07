import App from '../App'
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/home/Home';
import Shop from '../pages/shop/Shop';
import ProductDetails from '../pages/shop/ProductDetails';
import Checkout from '../pages/checkout/Checkout';
import About from '../components/About/About';

const router = createBrowserRouter([
    {
        path : '/',
        element : <App></App>,
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
    }
])

export default router;