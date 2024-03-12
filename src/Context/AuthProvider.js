import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {

    const [token , setToken] = useState(null);
    const [userEmail , setUserEmail] = useState(null);

    if(token === null && localStorage.length !== 0){
        setToken(localStorage["tokenId"]);
        setUserEmail(localStorage["user"]);
    }

    const loginHandler = (tokenId , emailId) => {
        setToken(tokenId);
        setUserEmail(emailId);
        localStorage.setItem("tokenId" , tokenId);
        localStorage.setItem("user" , emailId);
    }

    const logoutHandler = () => {
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem("tokenId");
        localStorage.removeItem("user")
    }

    const userLoggedin = !!token;

    const authState = {
        idToken: token,
        isLoggedin: userLoggedin,
        userEmail: userEmail,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={authState}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;