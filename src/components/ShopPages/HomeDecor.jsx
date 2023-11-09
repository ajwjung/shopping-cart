import ProductCard from "../ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../ProductPage/ProductPage";

function HomeDecor() {
    const homeDecorData = useLoaderData()[1].products;
    const { cartedItems } = useContext(ShopContext);

    return (
        <ShopContext.Provider value={{ cartedItems }}>
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
        </ShopContext.Provider>
    )
}

export default HomeDecor;