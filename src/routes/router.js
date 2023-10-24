import { createBrowserRouter } from "react-router-dom";
import Admin from "../pages/Admin";
import Cart from "../pages/Cart";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Root from "../pages/Root";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute adminRequired>
            <Admin />
          </ProtectedRoute>
        ),
      },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetail /> },
    ],
  },
]);

export default router;
