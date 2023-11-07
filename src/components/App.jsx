import { createBrowserRouter, RouterProvider } from "react-router-dom";
import loader from "../scripts/dataFetch";
import Home from "./Home/Home.jsx";
import ShopMain from "./ShopPages/ShopMain.jsx";
import Cart from "./Cart/Cart.jsx";
import ErrorPage from "./ErrorPage/ErrorPage.jsx"
import DefaultShop from "./ShopPages/DefaultShop";
import Lighting from "./ShopPages/Lighting";
import AllProducts from "./ShopPages/AllProducts";
import HomeDecor from "./ShopPages/HomeDecor";
import Furniture from "./ShopPages/Furniture";
import ProductPage from "./ProductPage/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "categories",
    element: <ShopMain />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DefaultShop /> },
      { path: "all", element: <AllProducts />, loader: (() => loader()) },
      { path: "lighting", element: <Lighting />, loader: (() => loader())},
      { path: "home-decor", element: <HomeDecor />, loader: (() => loader()) },
      { path: "furniture", element: <Furniture />, loader: (() => loader()) },
    ]
  },
  {
    path: "product/:productId",
    element: <ProductPage />,
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
