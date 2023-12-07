import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { ShopContext } from "../App";
import { Link } from "react-router-dom";
import styles from "./ShopPage.module.css";

function HomeDecor() {
    const { products } = useContext(ShopContext);
    const homeDecorData = Array(...products).filter((item) => {
        return item.category === "home-decoration";
    });

    return (
        <div className={styles.productsContent}>
            <div className={styles.linksWrapper}>
                <Link className={styles.link} to="/categories/all">
                    All
                </Link>
                <span> / </span>
                <Link className={styles.link} to="/categories/home-decor">
                    Home Decor
                </Link>
            </div>
            <h1 className={styles.heading}>Home Decor</h1>
            <div className={styles.allProductsWrapper} data-testid="products">
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