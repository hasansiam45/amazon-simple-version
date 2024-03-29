import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product)
    return (
        <div>
           <Product addToCart={false} product={product}></Product>
        </div>
    );
}

export default ProductDetails;
