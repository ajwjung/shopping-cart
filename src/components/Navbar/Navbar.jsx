import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../App";
import CartButton from "./CartButton";
import styles from "./Navbar.module.css";

function Navbar() {
    const { cartedItems } = useContext(ShopContext);

    return (
        <nav aria-label="Navbar">
            <Link to="/">
                <h1 className={styles.brandName}>GOOD HOME</h1>
            </Link>
            <ul className={styles.navLinks}>
                <li><Link to="/categories/all" className={styles.link}>Shop All</Link></li>
                <li><Link to="/categories/lighting" className={styles.link}>Lighting</Link></li>
                <li><Link to="/categories/home-decor" className={styles.link}>Home Decor</Link></li>
                <li><Link to="/categories/furniture" className={styles.link}>Furniture</Link></li>
            </ul>
            <CartButton cartedItems={cartedItems} />
        </nav>
    )
}

export default Navbar;