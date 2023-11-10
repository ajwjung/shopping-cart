import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCartVariant } from "@mdi/js";

function CartButton({ cartedItems }) {
    const totalCarted = cartedItems && cartedItems.reduce((prev, currentObj) => {
            return prev + currentObj.quantity;
        }, 0);

    return (
        <Link to="/cart" className="linkToCart" >
            <div className="cartWrapper">
                <Icon path={mdiCartVariant} size={2} className="cartIcon"/>
                <p>Cart</p>
            </div>
            <p>{totalCarted > 0 && totalCarted}</p>
        </Link>
    )
}

CartButton.propTypes = {
    cartedItems: PropTypes.array,
}

export default CartButton;