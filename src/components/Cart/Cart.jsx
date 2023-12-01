import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import Navbar from "../Navbar/Navbar";
import styles from "./Cart.module.css";

function CartItem({ item }) {
    const { products, handleUpdateQty } = useContext(ShopContext);

    function capitalizeName(name) {
        return name.split(" ").map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(" ");
    }

    function calculateSubtotal(qty, price) {
        return (Math.round((Number(qty) * Number(price)) * 100) / 100).toFixed(2);
    }

    function calculateDiscountPrice(discount, qty, price) {
        const originalPrice = calculateSubtotal(qty, price);
        const discountDecimal = Number(discount) / 100;

        return Math.round(originalPrice * (1 - discountDecimal)).toFixed(2);
    }

    function getProductId(productName, products) {
        const match = products.find((item) => {
            return item.title.toLowerCase() === productName.toLowerCase()
        });

        return match.id;
    }

    return (
        <div className={styles.cartedItem}>
            <Link to={`/product/${item.id}`} className={styles.thumbnailWrapper}>
                <img
                    className={styles.thumbnail}
                    src={item.thumbnail}
                    alt={item.title}
                />
            </Link>
            <Link to={`/product/${item.id}`} className={`${styles.bold} ${styles.productName}`}>
                {capitalizeName(item.title)}
            </Link>
            <div className={styles.price}>
                <p className={`${styles.bold} ${styles.discountedTotal}`}>
                    {`$${calculateDiscountPrice(item.discountPercentage, item.quantity, item.price)}`}
                </p>
                <p className={`${styles.bold} ${styles.productTotal}`}>
                    {`$${calculateSubtotal(item.quantity, item.price)}`}
                </p>
            </div>
            <div className={styles.qty}>
                <label htmlFor="quantity">
                    Qty:
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => {
                        const productName = e.target.parentNode.parentNode.querySelector(`.${styles.productName}`).textContent;
                        const productId = getProductId(productName, products);
                        handleUpdateQty(productId, e.target.value)
                    }}
                    min={1}
                    max={item.stock}
                />
            </div>
            <button
                className={styles.removeItem}
                onClick={(e) => {
                    const removeBtn = e.target.closest("button");
                    const productName = removeBtn.parentNode.querySelector(`.${styles.productName}`).textContent;
                    const productId = getProductId(productName, products);
                    handleUpdateQty(productId, 0);
                }}
                type="button"
            >
                <Icon path={mdiTrashCanOutline} size={1} />
            </button>
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
            if (item.discountPercentage > 0) {
                const originalPrice = (Math.round(
                    (Number(item.quantity) * Number(item.price)) * 100) / 100
                );
                const discountDecimal = Number(item.discountPercentage) / 100;

                return Math.round(originalPrice * (1 - discountDecimal));
            } else {
                return (Math.round(
                    (Number(item.quantity) * Number(item.price)) * 100) / 100
                );
            }
        });
        
        return subtotals.reduce((prev, current) => {
            return prev + current;
        }, 0).toFixed(2);
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
                    ? <button className={styles.checkout} type="button">
                        Checkout
                        </button> 
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