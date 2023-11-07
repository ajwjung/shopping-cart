import ProductCard from "../ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";

function Furniture() {
    const furnitureData = useLoaderData()[2].products;

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