import { Link } from "react-router-dom";

function CartButton() {
    return (
        <Link to="/cart">
            <button type="button">
                <img src="#" alt="Shopping Cart" />
            </button>
        </Link>
    )
}

export default CartButton;