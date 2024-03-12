import React from 'react';
import { Link } from 'react-router-dom';
import empty_cart from "./../Data/Assets/empty-cart.jpg";

const EmptyCart = () => {
  return (
    <>
        <div>
            <img src={empty_cart} alt='empty_cart'/>
        </div>
        <div style={{margin : "20px auto"}}>
            <Link to="/shop/product">Continue Shopping</Link>
        </div>
    </>
  )
}

export default EmptyCart
