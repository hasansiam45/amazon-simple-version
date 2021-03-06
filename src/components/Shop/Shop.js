import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {
    const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className="shop">
     
            <div className="products">
                         
                {
                    products.map(pd => <Product handleAddProduct={handleAddProduct} product = {pd}></Product>)
                }
            
            </div>

            <div className="cart">
                <Cart cart ={cart}></Cart>
            </div>
            
 
        </div>
    );
}

export default Shop;

