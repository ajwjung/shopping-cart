import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ErrorPage from "../ShopPages/ErrorPage";
import ImageCarousel from "./ImageCarousel";
import RatingStars from "./RatingStars";
import QuantityBtns from "./QuantityBtns";
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
                    <div className={styles.carouselWrapper}>
                        <ImageCarousel images={productData.images} />
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
                    <p className={styles.description}>
                        {Display.formatDescription(productData.description)}
                    </p>
                    <QuantityBtns product={productData} />
                </div>
            </main>
        </>
    )
}

export default ProductPage;