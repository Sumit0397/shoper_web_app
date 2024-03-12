import React, { useContext } from "react";
import "./Menu.css";
import {NavLink} from "react-router-dom";
import AuthContext from "../../Context/auth-context";

function Menu({cartNumber , close}) {

  const authCtx = useContext(AuthContext);

  const menuCloseHandler = () => {
    close(false);
  }

  const logouthandler = () => {
    authCtx.logout();
    menuCloseHandler();
  }

  return (
    <>
      <div className="Navbars">
        <ul className="NavbarWrappers">
          <li className="NavbarElement">
            <NavLink className="link" to="/" onClick={menuCloseHandler}>
              Home
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/about-us" onClick={menuCloseHandler}>
              About Us
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link"to="/contact-us" onClick={menuCloseHandler}>
              Contact Us
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/shop/product" onClick={menuCloseHandler}>
              Shop
            </NavLink>
          </li>
          <li className="NavbarElement">
            {!authCtx.isLoggedin ? 
           ( <NavLink className="link" to="/auth" onClick={menuCloseHandler}>
              Login
            </NavLink>) :
            (<NavLink className="link" to="/auth" onClick={logouthandler}>
              LogOut
            </NavLink>)}
          </li>
          <li className="Navbutton">
            <NavLink className="linkbtn" to="/cart" onClick={menuCloseHandler}>
              Cart &nbsp;<span>{cartNumber}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;