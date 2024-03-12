import React from "react";

const AuthContext = React.createContext({
    idToken : "",
    isLoggedin : false,
    userEmail : "",
    login : (tokenId , emailId) => {},
    logout : () => {}
})

export default AuthContext;