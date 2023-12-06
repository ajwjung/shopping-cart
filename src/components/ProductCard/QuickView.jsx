import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiClose, mdiArrowRightThin } from '@mdi/js';
import RatingStars from "../ProductPage/RatingStars";
import ImageCarousel from "../ProductPage/ImageCarousel";
import QuantityBtns from "../ProductPage/QuantityBtns";
import Price from "../../scripts/Price";
import Display from "../../scripts/Display";
import styles from "./QuickView.module.css";

function QuickView({ updateClickedStatus, product, productPrice }) {
    return (
        <>        
            <div 
                onClick={() => {
                    updateClickedStatus();
                }} 
                className={styles.overlay}
            >
            </div>
            <div className={styles.quickviewPopup}>
                <p className={`${styles.popupName} ${styles.bold}`}>
                    {Display.capitalizeName(product.title)}
                </p>
                <div className={styles.popupPrice}>
                    {product.discountPercentage > 0 &&
                    <p className={`${styles.bold} ${styles.discountPrice}`}>
                        {`$${Price.calculateDiscountPrice(
                            product.discountPercentage, 1, product.price
                        )}`}
                    </p>}
                    <p className={`${styles.originalPrice} ${styles.bold}`}>
                        {`$${productPrice}`}
                    </p>
                </div>
                <div className={styles.popupDescription}>
                    {Display.formatDescription(product.description)}
                </div>
                <ImageCarousel 
                    images={product.images}
                    wrapperClassName={styles.popupCarousel}
                    imgWrapperClassName={styles.popupImgWrapper}
                    imgClassName={styles.popupImage}
                />
                <p className={styles.popupBrand}>
                    {product.brand}
                </p>
                <div className={styles.ratingWrapper}>
                    <RatingStars rating={product.rating} />
                    <p className={styles.productRating}>
                        {product.rating}
                    </p>
                </div>
                <div 
                    onClick={() => {
                        updateClickedStatus();
                    }} 
                    className={styles.closePopup}
                >
                    <Icon className={styles.closeBtn} path={mdiClose} />
                </div>
                <QuantityBtns 
                    product={product} 
                    wrapperClassName={styles.popupQtyWrapper}
                    qtyLabelClassName={styles.qtyLabel}
                    cartBtnClassName={styles.popupAddToCartBtn}
                />
                <Link className={styles.goToProduct} to={`/product/${product.id}`}>
                        View full product details
                        <Icon className={styles.rightArrow} path={mdiArrowRightThin} />
                </Link>
            </div>
        </>
    )
}

QuickView.propTypes = {
    updateClickedStatus: PropTypes.func.isRequired,
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
    productPrice: PropTypes.string.isRequired,
}

export default QuickView;
