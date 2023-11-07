import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProductCard({ product }) {
    return (
        product && <Link to={`/product/${product.id}`}>
            <img
                className="thumbnail"
                src={product.thumbnail}
                alt={product.title}
            />
            <h2 className="productName">{product.title}</h2>
            <p className="productBrand">{product.brand}</p>
            <p className="productRating">{product.rating}</p>
            <p className="productPrice">{`$${product.price}`}</p>
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