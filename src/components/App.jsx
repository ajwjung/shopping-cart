import { createBrowserRouter, RouterProvider } from "react-router-dom";
import loader from "../scripts/dataFetch";
import Home from "./Home/Home.jsx";
import ShopMain from "./ShopPages/ShopMain.jsx";
import Cart from "./Cart/Cart.jsx";
import ErrorPage from "./ErrorPage/ErrorPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "categories/:category",
    element: <ShopMain />,
    loader: (() => {
      return loader();
    }),
    errorElement: <ErrorPage />
  },
  {
    path: "cart",
    element: <Cart />,
    errorElement: <ErrorPage />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
