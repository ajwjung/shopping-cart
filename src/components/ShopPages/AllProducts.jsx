import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";
import styles from "./ShopPage.module.css";

function AllProducts() {
    const { products } = useContext(ShopContext);
    
    return (
            <div className={styles.productsContent}>
                <h1 className={styles.heading}>All Products</h1>
                <div className={styles.allProductsWrapper} data-testid="products">
                    {products && products.map(product => {
                        return <ProductCard 
                            product={product}
                            key={product.id} 
                        />
                    })}
                </div>
            </div>
    )
}

export default AllProducts;