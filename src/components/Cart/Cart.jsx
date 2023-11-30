import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";
import Navbar from "../Navbar/Navbar";
import styles from "./Cart.module.css";

function CartItem({ item }) {
    const { products, handleUpdateQty } = useContext(ShopContext);

    function calculateSubtotal(qty, price) {
        return Math.round((Number(qty) * Number(price)) * 100) / 100;
    }

    function getProductId(productName, products) {
        const match = products.find((item) => {
            return item.title === productName
        });

        return match.id;
    }

    return (
        <div className={styles.cartedItem}>
            <div className={styles.productWrapper}>
                <div className={styles.thumbnailWrapper}>
                    <img
                        className={styles.thumbnail}
                        src={item.thumbnail}
                        alt={item.title}
                    />
                </div>
                <div className="productOverview">
                    <p className={styles.productName}>
                        {item.title}
                    </p>
                    <button
                        className={styles.removeItem}
                        onClick={(e) => {
                            const productName = e.target.previousElementSibling.textContent;
                            const productId = getProductId(productName, products);
                            handleUpdateQty(productId, 0);
                        }}
                        type="button"
                    >
                        X Remove
                    </button>
                </div>
            </div>
            <div className={styles.productDetails}>
                <div className={styles.qty}>
                    <label  className={styles.bold} htmlFor="quantity">
                        Qty
                    </label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => {
                            const productName = e.target.parentNode.parentNode.previousElementSibling.querySelector(".productOverview").firstElementChild.textContent;
                            const productId = getProductId(productName, products);
                            handleUpdateQty(productId, e.target.value)
                        }}
                        pattern="[0-9]*"
                    />
                </div>
                <div className={styles.price}>
                    <p className={styles.bold}>Price</p>
                    <p>${item.price}</p>
                </div>
                <div className={styles.productTotal}>
                    <p className={styles.bold}>Total</p>
                    <p>${calculateSubtotal(item.quantity, item.price)}</p>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
}

function Cart() {
    const { products, cartedItems } = useContext(ShopContext);

    function getCartedProducts(allProducts) {
        // Add quantities to products
        const products = cartedItems.map((cartItem) => {
            const product = allProducts.find(
                (product) => product.id === cartItem.id
            );
            const updatedProduct = {
                ...product,
                quantity: cartItem.quantity
            }

            return updatedProduct;
        })

        return products;
    }

    const itemsInCart = getCartedProducts(products);

    function calculateTotalPrice(items) {
        const subtotals = items.map((item) => {
            return (Math.round(
                (Number(item.quantity) * Number(item.price)) * 100) / 100
            );
        });
        
        return subtotals.reduce((prev, current) => {
            return prev + current;
        }, 0);
    }
    
    return (
        <>
            <Navbar />
            <div className={styles.cartContent}>
                <h1 className={styles.heading}>Shopping Cart</h1>
                <div className={styles.cart}>
                    {itemsInCart.length !== 0 
                        ? itemsInCart.map((item) => 
                            <CartItem item={item} key={item.id} />
                        )
                        : <p className={styles.emptyCart}>Your cart is empty.</p>
                    }
                </div>
                {itemsInCart.length > 0 && <div className="totalOverview">
                    <h2>Total Overview</h2>
                    <div className={styles.totalsGrid}>
                        <p>Subtotal</p>
                        <p className={styles.overviewPrice}>
                            ${calculateTotalPrice(itemsInCart)}
                        </p>
                        <p>Estimated Shipping</p>
                        <p className={styles.overviewPrice}>TBD</p>
                        <p>Tax</p>
                        <p className={styles.overviewPrice}>--</p>
                        <p className={styles.bold}>Total</p>
                        <p className={`${styles.bold} ${styles.overviewPrice}`}>
                            ${calculateTotalPrice(itemsInCart)}
                        </p>
                    </div>
                </div>}
                {itemsInCart.length > 0 
                    ? <button type="button">Checkout</button> 
                    : <Link className={styles.continueShopping} to="/categories/all">
                        Continue Shopping
                    </Link>
                }
            </div>
        </>
    )
}

Cart.propTypes = {
    cartedItems: PropTypes.arrayOf(PropTypes.object),
}

export default Cart;