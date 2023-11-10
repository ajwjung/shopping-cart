import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
            className="category-wrapper" 
            aria-label={`Shop ${categoryName}`}
        >
            <img src={image} alt={`Shop ${categoryName}`} />
            <p>{categoryName}</p>
        </Link>
    )
}

ShopCategory.propTypes = {
    image: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
}

export default ShopCategory;