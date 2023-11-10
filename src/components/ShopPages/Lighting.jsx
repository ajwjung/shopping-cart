import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";

function Lighting() {
    const { products } = useContext(ShopContext);
    const lightingData = Array(...products).filter((item) => {
        return item.category === "lighting";
    });

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

export default Lighting;