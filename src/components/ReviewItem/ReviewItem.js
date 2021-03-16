import React from 'react';

const ReviewItem = (props) => {
    console.log(props)
    const {name,quantity,key, price} = props.product;
    return (
        
            <div style={{borderBottom:'1px solid lightgray', paddingBottom: '15px', margin: '0px 0px 10px 100px'}} className="review-item">
            
            <h4 className="product-name">name: {name}</h4>
            <p>quantity: {quantity}</p>
            <p><small>price: {price}</small></p>
            <br />
            <button onClick={()=> props.removeProduct(key)} className="product-btn">Remove</button>
            </div>

    );
}

export default ReviewItem;
