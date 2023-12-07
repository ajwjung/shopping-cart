import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";
import { Link } from "react-router-dom";
import styles from "./ShopPage.module.css";

function Lighting() {
    const { products } = useContext(ShopContext);
    const lightingData = Array(...products).filter((item) => {
        return item.category === "lighting";
    });

    return (
            <div className={styles.productsContent}>
                <div className={styles.linksWrapper}>
                    <Link className={styles.link} to="/categories/all">
                        All
                    </Link>
                    <span> / </span>
                    <Link className={styles.link} to="/categories/lighting">
                        Lighting
                    </Link>
                </div>
                <h1 className={styles.heading}>Lighting</h1>
                <div className={styles.allProductsWrapper} data-testid="products">
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