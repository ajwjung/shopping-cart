import Navbar from "../Navbar/Navbar";
import ShopCategory from "./ShopCategory";
import Display from "../../scripts/Display";
import styles from "./Home.module.css";

function Home() {
    const imgLinks = Display.homeImages;

    return (
        <>
            <Navbar />
            <div className={styles.homeContent}>
                <div className={styles.bannerWrapper}>
                    <img className={styles.banner} src={imgLinks[4]} alt="" />
                    <p className={styles.adText}>
                        Shop your dream aesthetic at the right price.
                    </p>
                </div>
                <div className={styles.categories}>
                    <ShopCategory
                        categoryName="All"
                        image={imgLinks[0]}
                    />
                    <ShopCategory
                        categoryName="Lighting"
                        image={imgLinks[1]}
                    />
                    <ShopCategory
                        categoryName="Home Decor"
                        image={imgLinks[2]}
                    />
                    <ShopCategory
                        categoryName="Furniture"
                        image={imgLinks[3]}
                    />
                </div>
            </div>
        </>
    )
}

export default Home;