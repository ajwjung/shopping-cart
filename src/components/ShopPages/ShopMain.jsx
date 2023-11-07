import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function ShopMain() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default ShopMain;