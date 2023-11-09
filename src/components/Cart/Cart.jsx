import Navbar from "../Navbar/Navbar";
import PropTypes from "prop-types";

function CartItem({ item }) {
    function calculateSubtotal(qty, price) {
        return Math.round((Number(qty) * Number(price)) * 100) / 100;
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
                <input type="text" id="quantity" name="quantity" 
                value={item.quantity} min="0" />
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
                    onClick={(e) => { e.preventDefault() }} 
                    type="button"
                >X</button>
            </td>
        </tr>
    )
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
}

function Cart({ cartedItems }) {
    // Currently using fake items,
    // but we want to get the actual items from props later

    const FAKE_ITEMS = [
        {
            title: "Armin x Gudetama Plush",
            price: 4400,
            quantity: 1,
            thumbnail: "",
        },
        {
            title: "Mikasa x Gudetama Plush",
            price: 4400,
            quantity: 2,
            thumbnail: "",
        }
    ]
    
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
                    {FAKE_ITEMS && FAKE_ITEMS.map((item) => 
                        <CartItem item={item} key={item.id} />
                    )}
                    <tr>
                        <td colSpan={4}><b>Total</b></td>
                        <td>${calculateTotalPrice(FAKE_ITEMS)}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button">Checkout</button>
        </>
    )
}

Cart.propTypes = {
    cartedItems: PropTypes.array,
}

export default Cart;