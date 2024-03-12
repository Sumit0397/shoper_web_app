import React, { useContext, useRef, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./AllCss/Login.css";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/auth-context';
import cartContext from '../Context/cart-context';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(cartContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const formRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCnGaVEUB2SLRJtzk3aSaHbRg_dZWobSz0', {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json();
        authCtx.login(data.idToken , enteredEmail);
        cartCtx.onLogin();
        navigate("/shop/product" , {replace : true})
      } else {
        throw Error("Authentication Failed!!");
      }
      
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
    formRef.current.reset();
  }

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={formSubmitHandler} ref={formRef}>
        <h1>LogIN</h1>
        <div className='email-input'>
          <label>Email:</label>
          <input type='email' placeholder='Your Email Id' required ref={emailInputRef} />
        </div>
        <div className='password-input'>
          <label>Password:&nbsp;(at least 6 characters)</label>
          <input type={showPassword ? 'text' : 'password'} placeholder='Your Password' required ref={passwordInputRef} />
          <span onClick={togglePasswordVisibility} className='eye-icon'>{showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}</span>
        </div>
        <div>
          <button>LogIN</button>
          {isLoading && <div className='waiting-para'>Please Wait!!</div>}
        </div>
      </form>
    </div>
  )
}

export default Login
