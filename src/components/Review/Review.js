import React from 'react';
import  { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import '../Product/Product.css';
import ReviewItem from '../ReviewItem/ReviewItem';
const Review = () => {
 
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleCheckOut = () => {
        history.push('./shipment');
    }
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]
            return product;
        })
        setCart(cartProducts)
    }, [])
    
    return (
        <div style={{ display: 'flex' }}>
            <div style={{width:'70%',borderRight:'1px solid lightgray'}}>
            <h2>Cart Items: {cart.length}</h2>
            {
                cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
            }
            </div>

            <div style={{margin: '10px'}}>
                <Cart cart={cart}></Cart>
                <button className="product-btn" onClick={handleCheckOut}>Check Out</button>
            </div>
        </div>
    );
}

export default Review;
