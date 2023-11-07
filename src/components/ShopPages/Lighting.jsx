import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

function Lighting({ lightingData }) {
    return (
        <div className="allProducts">
            <h1 className="pageHeading">Lighting</h1>
            <div className="productsContainer" data-testid="products">
                {lightingData && lightingData.map(product => {
                    return <ProductCard 
                        product={product}
                        key={product.id} 
                    />
                })}
            </div>
        </div>
    )
}

Lighting.propTypes = {
    lightingData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Lighting;