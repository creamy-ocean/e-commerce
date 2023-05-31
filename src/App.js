import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Items from "./pages/Items";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <Home/>},
      { path: "/items", element: <Items/>}
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
