import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../App";
import CartButton from "./CartButton";
import styles from "./Navbar.module.css";
import NavDropdown from "./Dropdown";

function Navbar() {
    const { cartedItems } = useContext(ShopContext);

    return (
        <nav aria-label="Navbar">
            <Link to="/">
                <h1 className={styles.brandName}>GOOD HOME</h1>
            </Link>
            <ul className={styles.navLinks}>
                <li className={styles.shopAll}>
                    <Link to="/categories/all" className={styles.shopAllLink}>Shop All</Link>
                </li>
                <li className={styles.dropdown}>
                    <NavDropdown />
                </li>
            </ul>
                <CartButton cartedItems={cartedItems} />
        </nav>
    )
}

export default Navbar;