import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";

function HomeDecor() {
    const { products } = useContext(ShopContext);
    const homeDecorData = Array(...products).filter((item) => {
        return item.category === "home-decoration";
    });

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

export default HomeDecor;