import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";

function Home() {
    return (
        <>
            <Navbar />
            <div className={styles.homeContent}>
                <div className={styles.introWrapper}>
                    <p className={`${styles.intro} ${styles.bold}`}>
                        Your dream furniture. Our great prices.
                    </p>
                    <Link className={styles.shopNowBtn} to="/categories/all">
                        Shop Now
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;