import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import DefaultShop from "./DefaultShop.jsx"
import AllProducts from "./AllProducts.jsx"
import Lighting from "./Lighting.jsx"
import HomeDecor from "./HomeDecor.jsx"
import Furniture from "./Furniture.jsx"

function ShopMain() {
    const { category } = useParams();
    const [lighting, homeDecor, furniture] = useLoaderData();

    return (
        <>
            <Navbar />
            <main>
                {category === "home-decor" ? (
                    <HomeDecor homeDecorData={homeDecor.products} />
                ) : category === "lighting" ? (
                    <Lighting lightingData={lighting.products} />
                ) : category === "furniture" ? (
                    <Furniture furnitureData={furniture.products} />
                ) : category === "all" ? (
                    <AllProducts allProductData={[
                        ...lighting.products,
                        ...homeDecor.products,
                        ...furniture.products
                    ]} />
                ) : (
                    <DefaultShop />
                )}
            </main>
        </>
    )
}

export default ShopMain;