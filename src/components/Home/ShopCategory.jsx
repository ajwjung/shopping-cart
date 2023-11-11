import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Home.module.css";

function ShopCategory({ image, categoryName }) {
    function formatName(name) {
        const allWordsLowercase = name.split(" ").map(word => {
            return word.toLowerCase();
        });

        return allWordsLowercase.join("-");
    }

    const formattedName = categoryName && formatName(categoryName);

    return (
        categoryName && <Link 
            to={`/categories/${formattedName}`} 
            className={styles.categoryWrapper}
            aria-label={`Shop ${categoryName}`}
        >
            <img src={image} alt={`Shop ${categoryName}`} />
            <p className={styles.categoryName}>{categoryName}</p>
        </Link>
    )
}

ShopCategory.propTypes = {
    image: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
}

export default ShopCategory;