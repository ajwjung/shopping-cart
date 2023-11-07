import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

function HomeDecor({ homeDecorData }) {
    return (
        <div className="allProducts">
            <h1 className="pageHeading">Home Decor</h1>
            <div className="productsContainer" data-testid="products">
                {homeDecorData && homeDecorData.map(product => {
                    return <ProductCard 
                        product={product}
                        key={product.id} 
                    />
                })}
            </div>
        </div>
    )
}

HomeDecor.propTypes = {
    homeDecorData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default HomeDecor;