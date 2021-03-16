import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product.key);
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h3 className="product-name"> <Link to={"/product/"+key}> {name} </Link>  </h3>
                <br/>
                <p><small>by: {seller} </small></p>
                <p>Price: ${price}</p>
                <p><small>only {stock} left in stock - order soon </small></p>
                { props.addToCart && <button button className="product-btn" onClick={() => props.handleAddProduct(props.product)} > < FontAwesomeIcon icon={faShoppingCart} /> Add to cart </button >}
            </div>
        </div>
    );
}

export default Product;
