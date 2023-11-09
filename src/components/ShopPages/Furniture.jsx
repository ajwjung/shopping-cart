import ProductCard from "../ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../ProductPage/ProductPage";

function Furniture() {
    const furnitureData = useLoaderData()[2].products;
    const { cartedItems } = useContext(ShopContext);

    return (
        <ShopContext.Provider value={{ cartedItems }}>
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
        </ShopContext.Provider>
    )
}

export default Furniture;