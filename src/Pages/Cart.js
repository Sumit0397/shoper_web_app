import React, { useContext, useEffect, useState } from 'react'
import cartContext from '../Context/cart-context';
import "./AllCss/Cart.css";
import EmptyCart from './EmptyCart';
import bin from "./../Data/Assets/bin.jpg";
import openbin from "./../Data/Assets/openbin.jpg";


const Cart = () => {

  const [hover , setHover] = useState(false);
  const cartCtx = useContext(cartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const removeItemHandler = (id) => {
    cartCtx.removeFromCart(id);
  }

  return (
    <div>
      {cartCtx.items.length !== 0 ? (<div className='cart-container' >
        <table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th className='desc'>DESCRIPTION</th>
              <th>PRICE</th>
              <th>AMOUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          {
            cartCtx.items.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <td>
                    <img src={item.image} alt={item.image} className='cart-imgs' />
                  </td>
                  <td className='desc'>
                    {item.name}
                  </td>
                  <td>
                    &#8377;{item.price}
                  </td>
                  <td>
                    {item.amount}
                  </td>
                  <td>
                    <img 
                      src={!hover ? bin : openbin} 
                      alt='bin-png' 
                      className='bin-img' 
                      onClick={() => removeItemHandler(item.id)}
                      onMouseOver={() => setHover(true)}
                      onMouseOut={() => setHover(false)}
                      />
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
        <div className='total-div'>
          <h2>Total:&nbsp;&#8377;<span>{cartCtx.totalAmount}</span></h2>
        </div>
      </div>) : (
        <div className='empty-cart-container'>
          <EmptyCart />
        </div>
      )
      }
    </div>
  )
}

export default Cart
