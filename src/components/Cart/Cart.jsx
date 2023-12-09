import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import Navbar from "../Navbar/Navbar";
import Price from "../../scripts/Price";
import Display from "../../scripts/Display";
import styles from "./Cart.module.css";

function CartItem({ item }) {
    const { products, handleUpdateQty } = useContext(ShopContext);

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
                {Display.capitalizeName(item.title)}
            </Link>
            <div className={styles.price}>
                <p className={`${styles.bold} ${styles.discountedTotal}`}>
                    {`$${Price.calculateDiscountPrice(item.discountPercentage, item.quantity, item.price)}`}
                </p>
                <p className={`${styles.bold} ${styles.productTotal}`}>
                    {`$${Price.calculateSubtotal(item.quantity, item.price)}`}
                </p>
            </div>
            <div className={`${styles.qty} ${styles.flexCenter}`}>
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
                className={`${styles.removeItem} ${styles.flexCenter}`}
                onClick={(e) => {
                    const removeBtn = e.target.closest("button");
                    const productName = removeBtn.parentNode.querySelector(`.${styles.productName}`).textContent;
                    const productId = getProductId(productName, products);
                    handleUpdateQty(productId, 0);
                }}
                type="button"
            >
                <Icon className={styles.removeItemSvg} path={mdiTrashCanOutline} />
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
    const cartStyle = itemsInCart.length > 0 ? styles.cart : styles.emptyCart;
    
    return (
        <>
            <Navbar />
            <div className={styles.cartContent}>
                <div className={styles.linksWrapper}>
                    <Link className={styles.link} to="/categories/all">
                        All
                    </Link>
                    <span> / </span>
                    <Link className={styles.link} to="/cart">
                        Cart
                    </Link>
                </div>
                <h1 className={styles.heading}>Cart ({itemsInCart.length})</h1>
                <div className={cartStyle}>
                    {itemsInCart.length > 0 
                        ? itemsInCart.map((item) => 
                            <CartItem item={item} key={item.id} />
                        )
                        : <p className={styles.emptyCartMsg}>Your cart is empty.</p>
                    }
                </div>
                {itemsInCart.length > 0 && <div className={styles.totalOverview}>
                    <h2 className={styles.summaryHeading}>Total Overview</h2>
                    <div className={styles.totalsGrid}>
                        <p>Subtotal</p>
                        <p className={styles.overviewPrice}>
                            ${Price.calculateTotalPrice(itemsInCart)}
                        </p>
                        <p>Estimated Shipping</p>
                        <p className={styles.overviewPrice}>TBD</p>
                        <p>Tax</p>
                        <p className={styles.overviewPrice}>--</p>
                        <p className={styles.bold}>Total</p>
                        <p className={`${styles.bold} ${styles.overviewPrice}`}>
                            ${Price.calculateTotalPrice(itemsInCart)}
                        </p>
                    </div>
                </div>}
                {itemsInCart.length > 0 
                    ? <button className={`${styles.checkout} ${styles.bold}`} type="button">
                        Checkout
                        </button> 
                    : <Link 
                        className={`${styles.continueShopping} ${styles.bold}`} 
                        to="/categories/all"
                    >
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