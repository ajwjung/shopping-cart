import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";
import styles from "./ShopPage.module.css";

function Furniture() {
    const { products } = useContext(ShopContext);
    const furnitureData = Array(...products).filter((item) => {
        return item.category === "furniture";
    });

    return (
            <div className={styles.productsContent}>
                <h1 className={styles.heading}>Furniture</h1>
                <div className={styles.allProductsWrapper} data-testid="products">
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