import ProductCard from "../ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../ProductPage/ProductPage";

function AllProducts() {
    const [lighting, homeDecor, furniture] = useLoaderData();
    const allProductData = [
        ...lighting.products, 
        ...homeDecor.products, 
        ...furniture.products
    ];

    const { cartedItems } = useContext(ShopContext);

    return (
        <ShopContext.Provider value={{ cartedItems }}>
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
        </ShopContext.Provider>
    )
}

export default AllProducts;