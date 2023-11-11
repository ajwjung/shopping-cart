import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCartVariant } from "@mdi/js";
import styles from "./Navbar.module.css";

function CartButton({ cartedItems }) {
    const totalCarted = cartedItems && cartedItems.reduce((prev, currentObj) => {
            return prev + currentObj.quantity;
        }, 0);

    return (
        <Link to="/cart" className={styles.linkToCart} >
            <div className={styles.cartWrapper}>
                <Icon path={mdiCartVariant} size={1.5} className={styles.cartIcon}/>
            </div>
            {
                (totalCarted > 0) && <p className={styles.badgeNumber}>{totalCarted > 0 && totalCarted}</p>
            }
        </Link>
    )
}

CartButton.propTypes = {
    cartedItems: PropTypes.array,
}

export default CartButton;