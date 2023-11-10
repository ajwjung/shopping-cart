import PropTypes from "prop-types";
import { useContext } from "react";
import { ShopContext } from "../App";
import Navbar from "../Navbar/Navbar";

function CartItem({ item }) {
    const { products, handleUpdateQty } = useContext(ShopContext);

    function calculateSubtotal(qty, price) {
        return Math.round((Number(qty) * Number(price)) * 100) / 100;
    }

    function getProductId(productName, products) {
        const match = products.find((item) => {
            return item.title === productName
        });

        return match.id;
    }

    return (
        <tr className="cartedItem">
            <td>
                <img src={item.thumbnail} alt={item.title} />
            </td>
            <td>
                <p>{item.title}</p>
            </td>
            <td>
                <input 
                    type="text" 
                    id="quantity" 
                    name="quantity" 
                    value={item.quantity} 
                    onChange={(e) => {
                        console.log(e.target.value);
                        const productName = e.target.closest("tr").querySelector("td > p").textContent;
                        const productId = getProductId(productName, products);
                        handleUpdateQty(productId, e.target.value)
                    }}
                    pattern="[0-9]*"
                />
            </td>
            <td>
                <p>${item.price}</p>
            </td>
            <td>
                <p>${calculateSubtotal(item.quantity, item.price)}</p>
            </td>
            <td>
                <button 
                    className="removeItem" 
                    onClick={(e) => { 
                        const productName = e.target.closest("tr").querySelector("td > p").textContent;
                        const productId = getProductId(productName, products);
                        handleUpdateQty(productId, 0);
                    }} 
                    type="button"
                >X</button>
            </td>
        </tr>
    )
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
}

function Cart() {
    const { products, cartedItems } = useContext(ShopContext);

    function getCartedProducts(allProducts) {
        // Add quantities to products
        const products = cartedItems.map((cartItem) => {
            const product = allProducts.find(
                (product) => product.id === cartItem.id
            );
            const updatedProduct = {
                ...product,
                quantity: cartItem.quantity
            }

            return updatedProduct;
        })

        return products;
    }

    const itemsInCart = getCartedProducts(products);

    function calculateTotalPrice(items) {
        const subtotals = items.map((item) => {
            return (Math.round(
                (Number(item.quantity) * Number(item.price)) * 100) / 100
            );
        });
        
        return subtotals.reduce((prev, current) => {
            return prev + current;
        }, 0);
    }
    
    return (
        <>
            <Navbar />
            <h1>Shopping Cart</h1>
            <table>
                <tbody>
                    <tr>
                        <th colSpan={2}>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    {itemsInCart && itemsInCart.map((item) => 
                        <CartItem item={item} key={item.id} />
                    )}
                    <tr>
                        <td colSpan={4}><b>Total</b></td>
                        <td>${calculateTotalPrice(itemsInCart)}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button">Checkout</button>
        </>
    )
}

Cart.propTypes = {
    cartedItems: PropTypes.arrayOf(PropTypes.object),
}

export default Cart;