import ProductCard from "../ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";

function Lighting() {
    const lightingData = useLoaderData()[0].products;

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