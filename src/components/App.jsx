import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home.jsx";
import ShopMain from "./ShopPages/ShopMain.jsx";
import ErrorPage from "./ShopPages/ErrorPage.jsx"
import DefaultShop from "./ShopPages/DefaultShop";
import Lighting from "./ShopPages/Lighting";
import AllProducts from "./ShopPages/AllProducts";
import HomeDecor from "./ShopPages/HomeDecor";
import Furniture from "./ShopPages/Furniture";
import ProductPage from "./ProductPage/ProductPage";
import Cart from "./Cart/Cart";
import { useState, useEffect, createContext } from "react";

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
      { path: "all", element: <AllProducts /> },
      { path: "lighting", element: <Lighting />},
      { path: "home-decor", element: <HomeDecor /> },
      { path: "furniture", element: <Furniture /> },
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

export const ShopContext = createContext({
  products: [],
  cartedItems: [],
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
  handleUpdateQty: () => {}
})

function useProducts() {
  const [products, setProductsData] = useState(null);
  const [productError, setProductError] = useState(null);
  const [productLoading, setProductLoading] = useState(true);

  async function fetchProducts() {
      try {
          const response = (
              await Promise.all([
                  fetch("https://dummyjson.com/products/category/lighting",
                      { mode: "cors" }
                  ),
                  fetch("https://dummyjson.com/products/category/home-decoration",
                      { mode: "cors" }
                  ),
                  fetch("https://dummyjson.com/products/category/furniture",
                      { mode: "cors" }
                  ),
              ])
          ).map((response) => {
              if (response.status >= 400) {
                  throw new Error("server error");
              }
              
              return response.json();
          });

          const [lightingData, homeDecorData, furnitureData] = 
              await Promise.all(response);
          
          setProductsData([
              ...lightingData.products,
              ...homeDecorData.products,
              ...furnitureData.products
          ]);
      } catch(error) {
          setProductError(error);
          setProductsData(null);
      } finally {
          setProductLoading(false);
      }
  }

  useEffect(() => {
      fetchProducts();
  }, []);

  return { products, productError, productLoading };
}

function App() {
  const [cartedItems, setCartedItems] = useState([]);
  const { products } = useProducts(cartedItems);

  function checkItemIsCarted(idOfNewItem, cart) {
    return cart.find((item) => item.id === idOfNewItem);
  }

  function handleAddToCart(productId, quantity) {
    const itemCarted = checkItemIsCarted(Number(productId), cartedItems);

    if (!itemCarted) {
        // Add new item
        setCartedItems([
            ...cartedItems, 
            {
                id: Number(productId),
                quantity: quantity
            }
        ]);
    } else {
        // Add more of an existing product to cart
        const updatedCartedItems = cartedItems.map(item => {
            if (item.id === Number(productId)) {
                return (
                    {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                )
            } else {
                return item;
            }
        });

        setCartedItems(updatedCartedItems);
    }
}

  function handleUpdateQty(productId, quantity) {
    const updatedQtyCart = cartedItems.map((item) => {
      if (item.id === Number(productId) && quantity > 0) {
        return (
          {
            ...item,
            quantity: Number(quantity) > item.stock ? item.stock : Number(quantity)
          }
        )
      } else if (item.id === Number(productId) && quantity === 0) {
        return (
          {
            ...item,
            quantity: 0
          }
        );
      } else if (item.id === Number(productId) && quantity === "") {
        return (
          {
            ...item,
            quantity: ""
          }
        )
      } else {
        return item;
      }
    });

    const updatedCart = updatedQtyCart.filter(
      (item) => item.quantity > 0 || item.quantity === ""
    );

    setCartedItems(updatedCart);
  }

  return (
    <ShopContext.Provider value={{ 
      products, cartedItems, handleAddToCart, handleUpdateQty
    }}>
      <RouterProvider router={router} />
    </ShopContext.Provider>
  )
}

export default App;
