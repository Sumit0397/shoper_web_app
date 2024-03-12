import React, { useEffect, useState } from 'react';
import "../AllCss/Login.css";
import Login from '../Login';
import Signup from './Signup';

const LoginSignup = () => {
    const [showLogin , setShowLogin] = useState(true);

    useEffect(() => {
      window.scrollTo(0,0);
    },[])

  return (
    <div className='login-container'>
      {showLogin ? <Login/> : <Signup setShowLogin={setShowLogin}/>}
      {showLogin ? (
        <div onClick={() => setShowLogin(false)} className='toggle-container'>
          <p>Don't Have An Account? Create New One <span className='login-arrow'>➡️</span></p>
        </div>) : (
        <div onClick={() => setShowLogin(true)} className='toggle-container'>
          <p>Already Have Account, Log Into Your Account <span className='login-arrow'>➡️</span></p>
        </div>
      )}
    </div>
  )
}

export default LoginSignup
