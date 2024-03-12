import React, { useEffect, useRef } from 'react';
import "./AllCss/Contact.css";
import contact from "../Data/Assets/contact.jpg";
import emailjs from '@emailjs/browser';

const ContactUs = () => {

  const form = useRef();

  useEffect(() => {
    window.scrollTo(0,0);
  } , [])


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_sgxlo37', 'template_ih4q10b', form.current, {
        publicKey: 'N2FlgY20ELlLAKuQn',
      })
      .then(
        (result) => {
          console.log('SUCCESS!' , result.text);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

      e.target.reset();
  };

  return (
    <div className='contact-container'>
      <h2 className='title-section'>Contact Us</h2>
      <div className='img-container'>
        <img src={contact} alt="contact-img" className='img' />
      </div>
      <div className='body-container'>
        <div className='contacts'>
          <h2 className='title-section'>Web Support</h2>
          <div className='contact-links'>
            <p>GUEST SUPPORT AND COFFEE QUESTIONS</p>
            <a href="mailto: abc@example.com">abc@example.com</a>
          </div>
          <div className='contact-links'>
            <p>PRESS INQUIRIES</p>
            <a href="mailto: abc@example.com">press@example.com</a>
          </div>
          <div className='contact-links'>
            <p>BRAND PARTNERSHIP INQUIRIES</p>
            <a href="mailto: abc@example.com">brand@example.com</a>
          </div>
          <div className='contact-links'>
            <p>TRADE SHOW INQUIRIES</p>
            <a href="mailto: abc@example.com">trade@example.com</a>
          </div>
          <div className='contact-links'>
            <p>DONATION INQUIRIES</p>
            <a href="mailto: abc@example.com">donation@example.com</a>
          </div>
        </div>
        <div className='form-container'>
          <h2 className='title-section'>Get In Touch</h2>
          <form className='form' ref={form} onSubmit={sendEmail}>
            <div>
              <label>Name<span>*</span></label>
              <input type='text' placeholder='name' required name='user_name' />
            </div>
            <div>
              <label>Email<span>*</span></label>
              <input type='email' placeholder='email' required name='user_email' />
            </div>
            <div>
              <label>Subject<span>*</span></label>
              <input type='text' placeholder='subject' required name='subject' />
            </div>
            <div>
              <label>Message<span>*</span></label>
              <textarea cols={30} rows={5} name='message' />
            </div>
            <div>
              <button className='btn' type='submit'>Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
