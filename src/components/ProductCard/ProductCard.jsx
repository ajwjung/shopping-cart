import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RatingStars from "../ProductPage/RatingStars";
import Price from "../../scripts/Price";
import Display from "../../scripts/Display";
import QuickView from "./QuickView";
import styles from "./ProductCard.module.css";

// Creates a card for each item in the /categories/:category page
function ProductCard({ product }) {
    const [isClicked, setIsClicked] = useState(false);
    const productPrice = product.price.toFixed(2);

    function updateClickedStatus() {
        setIsClicked(!isClicked);
    }

    return (
        product && <>
            <div className={styles.productCard}>
                <Link 
                    to={`/product/${product.id}`} 
                    className={styles.thumbnailWrapper}
                    aria-label=""
                >
                    <img
                        className={styles.thumbnail}
                        src={product.thumbnail}
                        alt={product.title}
                    />
                </Link>
                <Link 
                    to={`/product/${product.id}`} 
                    className={styles.nameWrapper}
                    aria-label={`View listing for ${product.title}`}
                >
                    <h2 className={styles.productName}>
                        {Display.capitalizeName(product.title)}
                    </h2>
                </Link >
                <p className={styles.brand}>
                    {product.brand}
                </p>
                <div className={styles.ratingWrapper}>
                    <RatingStars rating={product.rating} />
                    <p className={styles.productRating}>
                        {product.rating}
                    </p>
                </div>
                <div className={styles.price}>
                    {product.discountPercentage > 0 &&
                    <p className={`${styles.bold} ${styles.discountPrice}`}>
                        {`$${Price.calculateDiscountPrice(
                            product.discountPercentage, 1, product.price
                        )}`}
                    </p>}
                    <p className={`${styles.bold} ${styles.originalPrice}`}>
                        {`$${productPrice}`}
                    </p>
                </div>
                <button 
                    onClick={updateClickedStatus}
                    className={styles.quickviewBtn}
                >
                    Quick View
                </button>
            </div>
            {isClicked && <QuickView 
                updateClickedStatus={updateClickedStatus} 
                product={product}
                productPrice={productPrice}
            />}
        </>
    )
}

ProductCard.propTypes = {
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
}

export default ProductCard;