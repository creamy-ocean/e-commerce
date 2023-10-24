import { createBrowserRouter } from "react-router-dom";
import Admin from "../pages/Admin";
import Cart from "../pages/Cart";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Root from "../pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/admin", element: <Admin /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetail /> },
    ],
  },
]);

export default router;
