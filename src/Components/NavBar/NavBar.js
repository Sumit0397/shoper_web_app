import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiShop } from "react-icons/ci";
import "./navbar.css";
import Menu from './Menu';
import cartContext from '../../Context/cart-context';
import AuthContext from '../../Context/auth-context';


const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    
    const authCtx = useContext(AuthContext);

    function handleOpen() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        window.scrollTo(0,0);
    }, [isOpen])

    const crtCtx = useContext(cartContext);

    const totalCartItems = crtCtx.items.reduce((curNum , item) => curNum + item.amount,0);

    return (
        <>
            <div className="Nav">
                <ul className="NavbarWrapper">
                    <li className="NavLogo">
                        <Link style={{ textDecoration: 'none', color: 'white', display: 'flex' , justifyContent : 'center' , alignItems : 'center' , gap : '1rem' }} to="/">
                            <span><CiShop size={30}/></span>
                            <span>Shoper</span>
                        </Link>
                    </li>
                    <li className="NavElements">
                        <NavLink className="Link" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="NavElements">
                        <NavLink className="Link" to="/about-us">
                            About Us
                        </NavLink>
                    </li>
                    <li className="NavElements">
                        <NavLink className="Link" to="/contact-us">
                            Contact Us
                        </NavLink>
                    </li>
                    <li className="NavElements">
                        <NavLink className="Link" to="/shop/product">
                            Shop
                        </NavLink>
                    </li>

                    <li className="NavButton">
                        <Link className="Link" to="/cart">
                            Cart <span>{totalCartItems}</span>
                        </Link>
                    </li>
                    <li
                        className="NavElements"
                        style={{ float: "right", margin: "-8px 2px 1px 2px" }}
                    >
                        {!authCtx.isLoggedin ? 
                        (<NavLink className="Link" to="/auth">
                            Login
                        </NavLink>):
                        (<NavLink className="Link" to="/auth" onClick={authCtx.logout}>
                            LogOut
                        </NavLink>)}
                    </li>
                </ul>
                {!isOpen ? (
                    <GiHamburgerMenu onClick={handleOpen} className="Icon" />
                ) : (
                    <ImCross onClick={handleOpen} className="Icon" />
                )}
            </div>
            {isOpen ? <Menu cartNumber={totalCartItems} close={setIsOpen}/> : null}
        </>
    )
}

export default NavBar
