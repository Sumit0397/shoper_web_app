import React, { useEffect, useRef, useState } from 'react';
import "../AllCss/Login.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import passwordNotify from '../NotifyMessage/Notify';


const Signup = ({setShowLogin}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmaPasswordInputRef = useRef();
    const formRef = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    const submitFormHandler = async (event) => {
        event.preventDefault();


        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmaPasswordInputRef.current.value;

        if (enteredPassword !== enteredConfirmPassword) {
            passwordNotify();
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCnGaVEUB2SLRJtzk3aSaHbRg_dZWobSz0', {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setShowLogin(true);
            } else {
                throw Error("Authentication Failed!!")
            }

            setIsLoading(false);
            formRef.current.reset();

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={submitFormHandler} ref={formRef}>
                <h1>SignUp</h1>
                <div className='email-input'>
                    <label>Email:</label>
                    <input type='email' placeholder='Your Email Id' required ref={emailInputRef} />
                </div>
                <div className='password-input'>
                    <label>Password:&nbsp;(at least 6 characters)</label>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Your Password' required ref={passwordInputRef} />
                    <span onClick={togglePasswordVisibility} className='eye-icon'>{showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}</span>
                </div>
                <div className='email-input'>
                    <label>Confirm Password:</label>
                    <input type='password' placeholder='Confirm Password' required ref={confirmaPasswordInputRef} />
                </div>
                <div>
                    <button>Create Account</button>
                    {isLoading && <div className='waiting-para'>Please Wait!!</div>}
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
