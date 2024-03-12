import React from 'react';
import "./Footer.css";
import { Link } from 'react-router-dom';
import { FaFacebook , FaInstagram } from "react-icons/fa";
import { IoLogoGoogleplus } from "react-icons/io";
import { CiShop } from "react-icons/ci";


const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-logo'>
        <span>
          <CiShop size={30}/>
        </span>
        <h3 style={{color : "#fff"}}>Shoper</h3>
      </div>
      <div>
        <ul className='footer-links'>
          <li>
            <Link to="/about-us" className='footer-link'>About Us</Link>
          </li>
          <li>
            <Link to="/contact-us" className='footer-link'>Get In Touch</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="footer-icons">
          <li>
            <FaFacebook size={25}/>
          </li>
          <li>
            <FaInstagram size={25}/>
          </li>
          <li>
            <IoLogoGoogleplus size={25}/>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
