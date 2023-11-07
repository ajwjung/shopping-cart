import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

function Furniture({ furnitureData }) {
    return (
        <div className="allProducts">
            <h1 className="pageHeading">Furniture</h1>
            <div className="productsContainer" data-testid="products">
                {furnitureData && furnitureData.map(product => {
                    return <ProductCard 
                        product={product}
                        key={product.id} 
                    />
                })}
            </div>
        </div>
    )
}

Furniture.propTypes = {
    furnitureData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Furniture;