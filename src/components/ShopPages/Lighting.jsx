import ProductCard from "../ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../ProductPage/ProductPage";

function Lighting() {
    const lightingData = useLoaderData()[0].products;
    const { cartedItems } = useContext(ShopContext);

    return (
        <ShopContext.Provider value={{ cartedItems }}>
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
        </ShopContext.Provider>
    )
}

export default Lighting;