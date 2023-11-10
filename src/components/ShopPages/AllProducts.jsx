import ProductCard from "../ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";

function AllProducts() {
    const [lighting, homeDecor, furniture] = useLoaderData();
    const allProductData = [
        ...lighting.products, 
        ...homeDecor.products, 
        ...furniture.products
    ];

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

export default AllProducts;