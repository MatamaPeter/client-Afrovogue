import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/index";

import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";

import Shop from "./pages/shop/Shop";
import CustomOrders from "./pages/CustomOrders";
import ProductDetails from "./pages/shop/ProductDetails";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/shop/Checkout";

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import Orders from './pages/Orders';
import Settings from './pages/account/Settings';
import OrderTracking from './pages/OrderTracking';

import { CartWishlistProvider } from './context/CartWishlistContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <CartWishlistProvider>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
          <Routes>
            {/* Routes with Header & Footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:productId" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/custom-order" element={<CustomOrders />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/account/settings" element={<Settings />} />
            </Route>

            {/* Auth routes without Layout */}
            <Route path="/auth/register" element={<RegisterForm />} />
            <Route path="/auth/login" element={<LoginForm />} />

            {/* 404 Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </CartWishlistProvider>
    </ThemeProvider>
  );
}

export default App;
