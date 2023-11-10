import ProductCard from "../ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";

function HomeDecor() {
    const homeDecorData = useLoaderData()[1].products;

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