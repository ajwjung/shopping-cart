import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CartButton({ cartedItems }) {
    const totalCarted = cartedItems && cartedItems.reduce((prev, currentObj) => {
            return prev + currentObj.quantity;
        }, 0);

    return (
        <Link to="/cart">
            <button type="button">
                <img src="#" alt="Shopping Cart" />
                <p>{totalCarted > 0 && totalCarted}</p>
            </button>
        </Link>
    )
}

CartButton.propTypes = {
    cartedItems: PropTypes.array,
}

export default CartButton;