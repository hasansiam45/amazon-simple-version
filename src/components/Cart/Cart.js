import React from 'react';
import { Link } from 'react-router-dom';
const Cart = (props) => {
    const cart = props.cart;
    // let total = 0;
    // for (let i = 0; i < cart.length; i++){
    //     const product = cart[i];
    //     total = total + product.price;
    // }
    const total = cart.reduce((sum, pd) => sum + pd.price, 0);
    let shipping = 0;
    if (total > 35 || total<0) {
        shipping = 0;
    } else if (total > 15) {
        shipping = 4.99;
    } else if (total > 0) {
        shipping = 12.99;
    }
    const productPrice = total.toFixed(2);
    const tax = Math.round(total / 20);
    const grandTotal = (total + shipping + tax).toFixed(2);
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length} </p>
            <p>Product Price: ${productPrice}</p>
            <p><small>Shipping Cost: ${shipping} </small></p>
            <p><small>Tax + Vat: ${tax}</small></p>
            <p>Total Price: ${grandTotal}</p>
        </div>
    );
}

export default Cart;
