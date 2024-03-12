import React from "react";

const cartContext = React.createContext({
    items : [],
    totalAmount : 0,
    addToCart : (item) => {},
    removeFromCart : (id) => {},
    onLogin : () => {}
})

export default cartContext;