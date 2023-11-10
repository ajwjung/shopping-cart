import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";

function Furniture() {
    const { products } = useContext(ShopContext);
    const furnitureData = Array(...products).filter((item) => {
        return item.category === "furniture";
    });

    return (
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
    )
}

export default Furniture;