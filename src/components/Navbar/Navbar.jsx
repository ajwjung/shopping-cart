import { Link } from "react-router-dom";
import CartButton from "../CartButton/CartButton";

function Navbar() {
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
            <CartButton />
        </nav>
        
    )
}

export default Navbar;