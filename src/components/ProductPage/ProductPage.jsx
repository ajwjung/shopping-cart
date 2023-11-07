import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

function ProductPage() {
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data for target product only
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productId}`, { mode: "cors" })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }

                return response.json();
            })
            .then((response) => {
                setProductData(response);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setProductData(null);
            })
            .finally(() => setLoading(false));
    }, [productId]);

    if (error) return <p>A network error was encountered</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Navbar/>
            <main className="product" >
                <img src={productData.thumbnail} alt={productData.title} />
                <div className="productInfo">
                    <h1 className="productName">{productData.title}</h1>
                    <h2 className="productBrand">{productData.brand}</h2>
                    <p className="productRating">{productData.rating} rating</p>
                    <p className="productPrice">${productData.price}</p>
                    <div className="qtyBtns">
                        <button className="decrement" type="button">-</button>
                        <label htmlFor="quantity"></label>
                        <input type="text" id="quantity" name="quantity" />
                        <button className="increment" type="button">+</button>
                    </div>
                    <button className="addToCart" type="button">Add to Cart</button>
                </div>
            </main>
        </>
    )
}

export default ProductPage;