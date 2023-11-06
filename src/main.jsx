import React from "react"
import ReactDOM from "react-dom/client"
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./components/App.jsx"
// import ShopMain from "./components/ShopPages/ShopMain.jsx"
// import Cart from "./components/Cart/Cart.jsx"
import './index.css'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "categories/:category",
//     element: <ShopMain />,
//   },
//   {
//     path: "cart",
//     element: <Cart />,
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
