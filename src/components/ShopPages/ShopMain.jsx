import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";
import DefaultShop from "./DefaultShop.jsx"
import AllProducts from "./AllProducts.jsx"
import Lighting from "./Lighting.jsx"
import HomeDecor from "./HomeDecor.jsx"
import Furniture from "./Furniture.jsx"

function ShopMain() {
    const { category } = useParams();

    return (
        <>
            <Navbar />
            <main>
                {category === "home-decor" ? (
                    <HomeDecor />
                ) : category === "lighting" ? (
                    <Lighting />
                ) : category === "furniture" ? (
                    <Furniture />
                ) : category === "all" ? (
                    <AllProducts />
                ) : (
                    <DefaultShop />
                )}
                {/* {allProducts && allProducts.map(product => {
                    return <ProductCard product={product} key={product.id} />
                })} */}
            </main>
        </>
    )
}

ShopMain.propTypes = {
    allProducts: PropTypes.arrayOf(PropTypes.object),
}

export default ShopMain;