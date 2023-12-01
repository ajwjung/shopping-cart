import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ErrorPage from "../ShopPages/ErrorPage";
import { ShopContext } from "../App";
import RatingStars from "./RatingStars";
import Price from "../../scripts/Price";
import Display from "../../scripts/Display";
import styles from "./ProductPage.module.css";

function useProductData(productId) {
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchProduct(productId) {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`, 
                { mode: "cors" });
            
            if (response.status >= 400) {
                throw new Error("server error");
            }

            const data = await response.json();
            setProductData(data);
        } catch(error) {
            setError(error);
            setProductData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct(productId);
    }, [productId]);

    return { productData, error, loading };
}

// Creates an individual page for a product at /product/:id
function ProductPage() {
    const { productId } = useParams();
    const { productData, error, loading } = useProductData(productId);
    const [quantity, setQuantity] = useState(1);
    const { handleAddToCart } = useContext(ShopContext);

    function handleChangeQuantity(e) {
        const inputValue = Number(e.target.value);

        if (e.target.className === `${styles.decreaseBtn}`) {
            (quantity - 1 > 0) && setQuantity(quantity - 1);
        } else if (e.target.className === `${styles.increaseBtn}`) {
            (quantity + 1 <= productData.stock) && setQuantity(quantity + 1);
        } else if (e.target.id === "quantity") {
            // Highest accepted value is the max number in stock
            if (inputValue > 0) {
                (inputValue > productData.stock) 
                ? setQuantity(productData.stock) 
                : setQuantity(inputValue);
            } else {
                setQuantity(0);
            }
        }
    }

    function formatCategoryName(category) {
        if (category === "home-decoration") {
            return "Home Decor";
        } else {
            return Display.capitalizeName(category);
        }
    }
    
    if (error) return <ErrorPage />;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <main className={styles.productContent}>
                <div className={styles.linksWrapper}>
                    <Link className={styles.link} to="/categories/all">
                        All
                    </Link>
                    <span> / </span>
                    <Link className={styles.link} to={`/categories/${productData.category === "home-decoration"
                    ? "home-decor" : productData.category}`}>
                        {formatCategoryName(productData.category)}
                    </Link>
                </div>
                <div className={styles.productInfo}>
                    <h1 className={styles.productName}>
                        {Display.capitalizeName(productData.title)}
                    </h1>
                    <h2 className={styles.brand}>
                        {productData.brand}
                    </h2>
                    <div className={styles.imgWrapper}>
                        <img 
                            className={styles.productImage}
                            src={productData.thumbnail} 
                            alt={productData.title} 
                        />
                    </div>
                    <div className={styles.ratings}>
                        <RatingStars rating={productData.rating} /> 
                        <p className={styles.productRating}>
                            {productData.rating} rating
                        </p>
                    </div>
                    <div className={styles.price}>
                        {productData.discountPercentage > 0 &&
                        <p className={`${styles.bold} ${styles.discountPrice}`}>
                            {`$${Price.calculateDiscountPrice(
                                productData.discountPercentage, 1, productData.price
                            )}`}
                        </p>}
                        <p className={styles.originalPrice}>
                            {`$${productData.price.toFixed(2)}`}
                        </p>
                    </div>
                    <div className={styles.qtyWrapper}>
                        <label 
                            className={styles.qtyLabel} 
                            htmlFor="quantity">
                                Quantity
                        </label>
                        <div className={styles.qtyBtns}>
                            <button
                                className={styles.decreaseBtn}
                                onClick={handleChangeQuantity}
                                type="button"
                            >-</button>
                            <input
                                type="text"
                                className={styles.quantity}
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={handleChangeQuantity}
                                pattern="[0-9]*"
                            />
                            <button
                                onClick={handleChangeQuantity}
                                className={styles.increaseBtn}
                                type="button"
                            >+</button>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            handleAddToCart(productId, quantity);
                        }}
                        className={`${styles.addToCartBtn} ${styles.bold}`}
                        type="button"
                    >Add to Cart</button>
                </div>
            </main>
        </>
    )
}

export default ProductPage;