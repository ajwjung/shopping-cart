import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ShopCategory({ image, categoryName }) {
    return (
        categoryName && <Link 
            to={`/category/${categoryName}`} 
            className="category-wrapper" 
            aria-label={`Shop ${categoryName}`}
        >
            <img src={image} alt={`Shop ${categoryName}`} />
            <button type="button">{categoryName}</button>
        </Link>
    )
}

ShopCategory.propTypes = {
    image: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
}

export default ShopCategory;