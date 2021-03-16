import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDatabaseCart} from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
        
    }
    return (
        <div className="shop">
     
            <div className="products">
                         
                {
                    products.map(pd => <Product key={pd.key} addToCart={true} handleAddProduct={handleAddProduct} product = {pd}></Product>)
                }
            
            </div>

            <div className="cart">
                <Cart cart={cart}></Cart>
               <Link to="/review"> < button className = "product-btn" > Review Order </button> </Link >
            </div>
            
 
        </div>
    );
}

export default Shop;

