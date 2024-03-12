import React, { useContext, useEffect, useState } from "react";
import cartContext from "./cart-context";
import AuthContext from "./auth-context";
import axios from "axios";


const CartProvider = (props) => {
  const [itemsArr, setItemsArr] = useState([]);
  const [amount , setAmount] = useState(0);

  const authCtx = useContext(AuthContext);
  

  useEffect(() => {
    setItemsArr([]);
    setAmount(0);
  },[authCtx.userEmail])

  const addToCartHandler = (item) => {
    setAmount((prevAmount) => prevAmount + (item.amount*item.price));
    setItemsArr([...itemsArr,item]);
    saveCartItemsToBackend(item);
  };

  const removeFromCartHandler = (id) => {

    const existingCartItemIndex = itemsArr.findIndex(
      (item) => item.id === id
    );

    const existingCartItem = itemsArr[existingCartItemIndex];

    const updatedItems = itemsArr.filter((item) => item.id !== id);

    setItemsArr(updatedItems);

    const updatedAmount =
      amount - existingCartItem.price * existingCartItem.amount;

    setAmount(updatedAmount);  
    removeCartItemFromBackend(id);
  };

  const saveCartItemsToBackend = async (item) => {
    try {
      const email = authCtx.userEmail.replace(/[@.]/g, "");
      const response = await axios.post(`https://shoper-e-commerce-default-rtdb.firebaseio.com/${email}/cart.json`,item)

      const data = response.data;

      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }

  const removeCartItemFromBackend = async (id) => {
    
    try {
      const email = authCtx.userEmail.replace(/[@.]/g , "");
      const response = await axios.get(`https://shoper-e-commerce-default-rtdb.firebaseio.com/${email}/cart.json`);

      const data = await response.data;

      const ID = Object.keys(data).find((itemId) => data[itemId].id === id);

      try {
        const response = await axios.delete(`https://shoper-e-commerce-default-rtdb.firebaseio.com/${email}/cart/${ID}.json`);

        console.log(response.statusText);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const restoreCartItemFromBackend = async () => {
    
    try {
      const email = authCtx.userEmail ? authCtx.userEmail.replace(/[@.]/g, "") : "";
      const response = await axios.get(`https://shoper-e-commerce-default-rtdb.firebaseio.com/${email}/cart.json`);

      const data = await response.data;
      if(data){
        const realData = Object.values(data);
        setItemsArr([...realData]);
        const updatedAmount = realData.reduce((acc,cur) => acc + (cur.amount*cur.price) , 0);
        setAmount(updatedAmount);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    restoreCartItemFromBackend();
  },[authCtx.userEmail])

  useEffect(() => {
    restoreCartItemFromBackend();
  },[])

  const cartData = {
    items: itemsArr,
    totalAmount: amount,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    onLogin : restoreCartItemFromBackend
  };

  return (
    <cartContext.Provider value={cartData}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartProvider;
