import Navbar from "../Navbar/Navbar";
import ShopCategory from "../ShopCategory/ShopCategory";

function Home() {
    return (
        <>
        <Navbar />
        <main className="home-content">
            <ShopCategory image="#" categoryName="All" />
            <ShopCategory image="#" categoryName="Lighting" />
            <ShopCategory image="#" categoryName="Home Decor" />
            <ShopCategory image="#" categoryName="Furniture" />
        </main>
        </>
    )
}

export default Home;