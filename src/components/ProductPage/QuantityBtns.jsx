import { useState, useContext } from "react";
import { ShopContext } from "../App";
import PropTypes from "prop-types";
import styles from "./ProductPage.module.css";

function QuantityBtns({ product, wrapperClassName, qtyLabelClassName, 
    inputClassName, increaseClassName, decreaseClassName, cartBtnClassName }) {
    const [quantity, setQuantity] = useState(1);
    const [isClicked, setIsClicked] = useState(false);
    const { handleAddToCart } = useContext(ShopContext);

    function handleChangeQuantity(e) {
        const inputValue = Number(e.target.value);

        if (e.target.className === `${decreaseClassName}`) {
            (quantity - 1 > 0) && setQuantity(quantity - 1);
        } else if (e.target.className === `${increaseClassName}`) {
            (quantity + 1 <= product.stock) && setQuantity(quantity + 1);
        } else if (e.target.id === "quantity") {
            // Highest accepted value is the max number in stock
            if (inputValue > 0) {
                (inputValue > product.stock) 
                ? setQuantity(product.stock) 
                : setQuantity(inputValue);
            } else {
                setQuantity(0);
            }
        }
    }

    function updateClickStatus() {
        setIsClicked(true);

        setTimeout(() => {
            setIsClicked(false);
        }, 1500);
    }

    return (
        <>
            <div className={wrapperClassName}>
                <label 
                    className={qtyLabelClassName} 
                    htmlFor="quantity">
                        Quantity
                </label>
                <div className={styles.qtyBtns}>
                    <button
                        className={decreaseClassName}
                        onClick={handleChangeQuantity}
                        type="button"
                    >-</button>
                    <input
                        type="text"
                        className={inputClassName}
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleChangeQuantity}
                        pattern="[0-9]*"
                    />
                    <button
                        onClick={handleChangeQuantity}
                        className={increaseClassName}
                        type="button"
                    >+</button>
                </div>
            </div>
            <button 
                onClick={() => {
                    handleAddToCart(product.id, quantity);
                    updateClickStatus();
                }}
                className={`${cartBtnClassName} ${styles.bold}`}
                type="button"
            >{isClicked ? "Added!" : "Add to Cart"}</button>
        </>
    )
}

QuantityBtns.defaultProps = {
    wrapperClassName: styles.qtyWrapper,
    cartBtnClassName: styles.addToCartBtn,
    qtyLabelClassName: styles.qtyLabel,
}

QuantityBtns.propTypes = {
    product: PropTypes.shape({
        brand: PropTypes.string,
        category: PropTypes.string,
        description: PropTypes.string,
        discountPercentage: PropTypes.number,
        id: PropTypes.number,
        images: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number,
        rating: PropTypes.number,
        stock: PropTypes.number,
        thumbnail: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
    wrapperClassName: PropTypes.string.isRequired,
    qtyLabelClassName: PropTypes.string.isRequired,
    inputClassName: PropTypes.string.isRequired,
    increaseClassName: PropTypes.string.isRequired,
    decreaseClassName: PropTypes.string.isRequired,
    cartBtnClassName: PropTypes.string.isRequired,
}

export default QuantityBtns;