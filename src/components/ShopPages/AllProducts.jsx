import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

function AllProducts({ allProductData }) {
    return (
        <div className="allProducts">
            <h1 className="pageHeading">All Products</h1>
            <div className="productsContainer" data-testid="products">
                {allProductData && allProductData.map(product => {
                    return <ProductCard 
                        product={product}
                        key={product.id} 
                    />
                })}
            </div>
        </div>
    )
}

AllProducts.propTypes = {
    allProductData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default AllProducts;