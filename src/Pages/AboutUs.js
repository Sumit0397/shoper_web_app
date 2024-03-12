import React, { useEffect } from 'react';
import "./AllCss/About.css";
import about from "../Data/Assets/about.jpg";

const AboutUs = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  return (
    <div className='about-container'>
      <div className='about-heading'>
        <p>Welcome To</p>
        <h2>Shoper</h2>
        <span></span>
        <p>Get To Know About Shoper</p>
      </div>
      <div className='about-main'>
        <div>
          <img src={about} alt='about-img'/>
        </div>
        <div>
          <p>Shoper is the new Online e-commerce store a continuously evolving shopping centre online Just like in any shopping centre there's always something fresh and exciting.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
