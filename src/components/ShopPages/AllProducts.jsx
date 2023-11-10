import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";

function AllProducts() {
    const { products } = useContext(ShopContext);
    
    return (
            <div className="allProducts">
                <h1 className="pageHeading">All Products</h1>
                <div className="productsContainer" data-testid="products">
                    {products && products.map(product => {
                        return <ProductCard 
                            product={product}
                            key={product.id} 
                        />
                    })}
                </div>
            </div>
    )
}

export default AllProducts;