import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import all_product from '../Data/Assets/all_product';
import "./AllCss/Shop.css";
import ProductSideBar from './SideBarSection/ProductSideBar';



const Shop = () => {

  const [searchparam, setSearchparam] = useSearchParams();
  const [res, setRes] = useState('product');
  const [sortBy, setSortBy] = useState(null);
  const [priceFilter, setPriceFilter] = useState({ min: 80, max: 4500 });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const category = searchparam.get('cat');

    if (category === null) {
      setRes("product");
    } else {
      setRes(category);
    }
  }, [searchparam])

  let data = (res === "product") ? all_product : all_product.filter((item) => item.category === res);

  data = data.filter((item) => item.price >= priceFilter.min && item.price <= priceFilter.max);

  if (searchTerm.trim() !== '') {
    data = data.filter((item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "lowToHigh") {
    data = data.slice().sort((a, b) => a.price - b.price)
  } else if (sortBy === "highToLow") {
    data = data.slice().sort((a, b) => b.price - a.price)
  }

  const clearFilters = () => {
    setSearchparam({});
    setRes('product');
    setSortBy(null);
    setPriceFilter({ min: 80, max: 4500 });
    window.scrollTo(0,0);
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceFilter({ ...priceFilter, [name]: parseInt(value) });
    window.scrollTo(0,0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    window.scrollTo(0,0);
  };

  return (
    <div className='products-body'>
      <div className='products-sideBar'>
        <ProductSideBar
          setRes={setRes}
          setSearchparam={setSearchparam}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
          handlePriceChange={handlePriceChange}
          handleSearchChange={handleSearchChange}
          priceFilter={priceFilter}
          searchTerm={searchTerm}
        />
      </div>
      <div className='products-container'>
        {
          data && data.length > 0 ?
            data.map((item, index) => (
              <div key={item.id} className='product-div'>
                <div className='product-image' >
                    <img src={item.image} alt={item.image} />
                </div>
                <div className='price'>
                  Price:&nbsp;<span>&#8377;{item.price}</span>
                </div>
                <div className='product-actions'>
                  <Link to={`/singleProduct/${item.id}`} className='product-action-link'>
                    See Details
                  </Link>
                </div>
              </div>
            ))
            : <div>Sorry No Data Found..</div>
        }
      </div>
    </div>
  )
}

export default Shop
