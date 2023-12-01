import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RatingStars from "../ProductPage/RatingStars";
import Price from "../../scripts/Price";
import Display from "../../scripts/Display";
import styles from "./ProductCard.module.css";

// Creates a card for each item in the /categories/:category page
function ProductCard({ product }) {
    const productPrice = product.price.toFixed(2)

    return (
        product && <Link to={`/product/${product.id}`} className={styles.productCard}>
            <div className={styles.thumbnailWrapper}>
                <img
                    className={styles.thumbnail}
                    src={product.thumbnail}
                    alt={product.title}
                />
            </div>
            <h2 className={styles.productName}>
                {Display.capitalizeName(product.title)}
            </h2>
            <p className={styles.brand}>
                {product.brand}
            </p>
            <div className={styles.ratingWrapper}>
                <RatingStars rating={product.rating} />
                <p className={styles.productRating}>
                    {product.rating} rating
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
        </Link>
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