import React from 'react';
import "./ProductSlider.css";
import new_collections from '../../Data/Assets/new_collections';
import { Link } from 'react-router-dom';

const ProductSlider = () => {

  return (
    <div className='product-container'>
      <h3>Top Categories</h3>
      <div className='image-container'>
        {new_collections.map((item) => (
          <div key={item.id} className='single-product-div'>
            <div className='product-image' >
              <img key={item.id} src={item.image} alt={item.name}/>
            </div>
            <div className='single-product-details'>
              <Link className='single-product-link' to={item.to}>Check All Products</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSlider
