import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../ProductPage/ProductPage";

function ShopMain() {
    const { cartedItems, allProductData } = useContext(ShopContext);

    return (
        <ShopContext.Provider value={{ cartedItems, allProductData }}>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </ShopContext.Provider>
    )
}

export default ShopMain;