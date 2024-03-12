import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import all_product from '../Data/Assets/all_product';
import "./AllCss/SingleProduct.css";
import cartContext from '../Context/cart-context';

const SingleProduct = () => {

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);

  const data = all_product.filter((item) => item.id === +id);

  const singleData = data[0];

  const [currentImage, setCurrentImage] = useState(singleData.image);

  const cartCtx = useContext(cartContext);

  useEffect(() => {
    const existingItem = cartCtx.items.find((data) => data.id === singleData.id);

    if (existingItem) {
      setItemAddedToCart(true);
    } else {
      setItemAddedToCart(false);
    }
  }, [cartCtx.items, singleData.id]);

  const addItemHandler = (data) => {
    const existingItem = cartCtx.items.find((item) => item.id === data.id);

    if (existingItem) {
      setItemAddedToCart(true);
      setQuantity(1);
      notify();
    } else {
      const newData = {...data, amount : quantity};
      cartCtx.addToCart(newData);
      setItemAddedToCart(false);
      setQuantity(1);
      notify();
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 5));
  }

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  }

  function notify() {
    if (itemAddedToCart) {
      toast.error("Item Already Added , Check Your Cart!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Item Added to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div className='single-container'>
      <div className='single-image-container'>
        <div className='main-image-container'>
          <img src={currentImage} alt={currentImage} className='main-image' />
        </div>
        <div className='sub-images-container'>
          {singleData.images.map((img, index) => (
            <div key={index} onClick={() => setCurrentImage(img)}>
              <img src={img} alt={img} className='sub-image' />
            </div>
          ))}
        </div>
      </div>
      <div className='singledetails-container'>
        <h3 className='brand-name'><span>BRAND:&nbsp;</span>{singleData.brand}</h3>
        <h2 className='name'>{singleData.name}</h2>
        <h2 className='product-price'>MRP:&nbsp;&#8377;{singleData.price}</h2>
        <div className='description'>
          <p>{singleData.description}</p>
        </div>
        <div className='quantity'>
          <h4>Quantity:</h4>
          <div className='quantity-inputs'>
            <span onClick={decreaseQuantity}>-</span>
            <input type='number' min="1" max="5" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} id='quantity-input' />
            <span onClick={increaseQuantity}>+</span>
          </div>
        </div>
        <div className='singleproduct-actions'>
          <Link className='buynow' to="/shop/product">
            SEE OTHER PRODUCT
          </Link>
          <button className='addtocart' onClick={(e) => { e.preventDefault(); addItemHandler(singleData);}}>
            ADD TO CART
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SingleProduct
