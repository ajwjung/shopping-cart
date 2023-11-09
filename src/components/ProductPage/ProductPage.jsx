import { useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Navbar from "../Navbar/Navbar";
import ErrorPage from "../ErrorPage/ErrorPage";

function useProductData(productId) {
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchProduct(productId) {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`, 
                { mode: "cors" });
            
            if (response.status >= 400) {
                throw new Error("server error");
            }

            const data = await response.json();
            setProductData(data);
        } catch(error) {
            setError(error);
            setProductData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct(productId);
    }, [productId]);

    return { productData, error, loading };
}

export const ShopContext = createContext({
    cartedItems: [],
})

function ProductPage() {
    const { productId } = useParams();
    const { productData, error, loading } = useProductData(productId);
    const [quantity, setQuantity] = useState(1);
    const [cartedItems, setCartedItems] = useState([]);

    function handleChangeQuantity(e) {
        if (e.target.className === "decrement") {
            (quantity - 1 > 0) && setQuantity(quantity - 1);
        } else if (e.target.className === "increment") {
            (quantity + 1 <= productData.stock) && setQuantity(quantity + 1);
        }

        // Highest accepted value is the max number in stock
        if (e.target.value > 0) {
            (e.target.value > productData.stock) 
            ? setQuantity(productData.stock) 
            : setQuantity(Number(e.target.value));
        }
    }

    function handleAddToCart() {
        if (cartedItems.length === 0) {
            // First item carted
            setCartedItems([
                ...cartedItems, 
                {
                    id: Number(productId),
                    quantity: quantity
                }
            ]);
        } else {
            // Add more of an existing product to cart
            const updatedCartedItems = cartedItems.map(item => {
                if (item.id === Number(productId)) {
                    return (
                        {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                    )
                } else {
                    return item;
                }
            });

            setCartedItems(updatedCartedItems);
        }
    }

    if (error) return <ErrorPage />;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <ShopContext.Provider value={{ cartedItems }}>
                <Navbar />
                <main className="product" >
                    <img src={productData.thumbnail} alt={productData.title} />
                    <div className="productInfo">
                        <h1 className="productName">{productData.title}</h1>
                        <h2 className="productBrand">{productData.brand}</h2>
                        <p className="productRating">{productData.rating} rating</p>
                        <p className="productPrice">${productData.price}</p>
                        <div className="qtyBtns">
                            <button 
                                onClick={handleChangeQuantity}
                                className="decrement" 
                                type="button"
                            >-</button>
                            <label htmlFor="quantity">Quantity</label>
                            <input 
                                type="text" 
                                id="quantity" 
                                name="quantity" 
                                value={quantity}
                                onChange={handleChangeQuantity}
                            />
                            <button 
                                onClick={handleChangeQuantity}
                                className="increment" 
                                type="button"
                            >+</button>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            className="addToCart" 
                            type="button"
                        >Add to Cart</button>
                    </div>
                </main>
            </ShopContext.Provider>
        </>
    )
}

export default ProductPage;