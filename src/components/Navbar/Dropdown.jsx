import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dropdown.module.css";

function NavDropdown() {
    const [isVisible, setIsVisible] = useState(false);

    function toggleVisibility() {
        setIsVisible(!isVisible);
    }

    const dropdownBtbUnderline = isVisible ? styles.dropdownUnderline : ""; 

    return (
        <>
            <button 
                type="button" 
                onClick={toggleVisibility}
                className={`${styles.dropdownBtn} ${dropdownBtbUnderline}`}
            >
                Shop by Category
            </button>
            <div className={!isVisible ? styles.hidden : styles.dropdown}>
                <Link
                    to="/categories/lighting"
                    className={styles.link}
                >
                        Lighting
                </Link>
                <Link
                    to="/categories/home-decor"
                    className={styles.link}
                >
                        Home Decor
                </Link>
                <Link
                    to="/categories/furniture"
                    className={styles.link}
                >
                        Furniture
                </Link>
            </div>
        </>
    )
}

export default NavDropdown;