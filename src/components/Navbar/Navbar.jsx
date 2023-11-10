import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../App";
import CartButton from "../CartButton/CartButton";

function Navbar() {
    const { cartedItems } = useContext(ShopContext);

    return (
        <nav aria-label="Navbar">
            <img src="#" alt="Brand Logo" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/categories/all">Shop All</Link></li>
                <li><Link to="/categories/lighting">Lighting</Link></li>
                <li><Link to="/categories/home-decor">Home Decor</Link></li>
                <li><Link to="/categories/furniture">Furniture</Link></li>
            </ul>
            <CartButton cartedItems={cartedItems} />
        </nav>
    )
}

export default Navbar;