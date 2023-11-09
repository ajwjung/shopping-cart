import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartButton from "../CartButton/CartButton";
import { ShopContext } from "../ProductPage/ProductPage";

function useProducts() {
    const [allProducts, setAllProductData] = useState(null);
    const [productError, setProductError] = useState(null);
    const [productLoading, setProductLoading] = useState(true);

    async function fetchProducts() {
        try {
            const response = (
                await Promise.all([
                    fetch("https://dummyjson.com/products/category/lighting",
                        { mode: "cors" }
                    ),
                    fetch("https://dummyjson.com/products/category/home-decoration",
                        { mode: "cors" }
                    ),
                    fetch("https://dummyjson.com/products/category/furniture",
                        { mode: "cors" }
                    ),
                ])
            ).map((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }
                
                return response.json();
            });

            const [lightingData, homeDecorData, furnitureData] = 
                await Promise.all(response);
            
            setAllProductData([
                ...lightingData.products,
                ...homeDecorData.products,
                ...furnitureData.products
            ]);
        } catch(error) {
            setProductError(error);
            setAllProductData(null);
        } finally {
            setProductLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return { allProducts, productError, productLoading };
}

function Navbar() {
    const { cartedItems } = useContext(ShopContext);
    const { allProducts, error, loading } = useProducts(cartedItems);

    function getCartedProducts(allProducts) {
        const products = cartedItems.map((cartItem) => {
            const product = allProducts.find((product) => product.id === cartItem.id);
            const updatedProduct = {
                ...product,
                quantity: cartItem.quantity
            }

            return updatedProduct;
        })

        return products;
    }

    return (
        <ShopContext.Provider value={{ cartedItems }}>
            <nav aria-label="Navbar">
                <img src="#" alt="Brand Logo" />
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/categories/all">Shop All</Link></li>
                    <li><Link to="/categories/lighting">Lighting</Link></li>
                    <li><Link to="/categories/home-decor">Home Decor</Link></li>
                    <li><Link to="/categories/furniture">Furniture</Link></li>
                </ul>
                <CartButton cartedItems={getCartedProducts(allProducts)} />
            </nav>
        </ShopContext.Provider>
        
    )
}

export default Navbar;