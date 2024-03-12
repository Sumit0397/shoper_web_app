import React, { useState } from 'react';
import "./ProductSideBar.css";

const ProductSideBar = ({ setRes, setSearchparam, setSortBy, clearFilters, handlePriceChange, handleSearchChange, priceFilter, searchTerm }) => {

    const [showCategory, setShowCategory] = useState(false);

    return (
        <div className='grand-parent-div'>
            <div className='main-div'>
                <div>
                    <div className='search-bar'>
                        <label>
                            <span>🔍</span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search Your product..."
                            />
                        </label>
                    </div>
                    <div>
                        <div onClick={() => setShowCategory(!showCategory)} className='all-categories'>All Categories ⬇️</div>
                        {showCategory && (<div className='show-categories'>
                            <div onClick={() => { setRes('mens-dress'); setSearchparam({ cat: 'mens-dress' }); window.scrollTo(0,0); }}>Men's Cloth</div>
                            <div onClick={() => { setRes('womens-dress'); setSearchparam({ cat: 'womens-dress' }); window.scrollTo(0,0); }}>Women's Cloth</div>
                            <div onClick={() => { setRes('kids-dress'); setSearchparam({ cat: 'kids-dress' }); window.scrollTo(0,0); }}>Kid's Cloth</div>
                            <div onClick={() => { setRes('mens-shoes'); setSearchparam({ cat: 'mens-shoes' }); window.scrollTo(0,0); }}>Men's Shoes</div>
                            <div onClick={() => { setRes('womens-shoes'); setSearchparam({ cat: 'womens-shoes' }); window.scrollTo(0,0); }}>Women's shoes</div>
                            <div onClick={() => { setRes('mens-watches'); setSearchparam({ cat: 'mens-watches' }); window.scrollTo(0,0); }}>Men's Watches</div>
                            <div onClick={() => { setRes('product'); setSearchparam({}); window.scrollTo(0,0); }}>All</div>
                        </div>)}
                    </div>
                </div>
                <div>
                    <div className='price-sorting'>
                        <p>Sort By Price:</p>
                        <div onClick={() => {setSortBy("lowToHigh"); window.scrollTo(0,0);}}>&#8377;⬆️ &nbsp;Low To High</div>
                        <div onClick={() => {setSortBy("highToLow"); window.scrollTo(0,0);}}>&#8377;⬇️ &nbsp;High To Low</div>
                    </div>
                    <div className='price-range'>
                        <label>
                            Price Range: &#8377;{priceFilter.min} - &#8377;{priceFilter.max}
                            <input
                                type="range"
                                name="min"
                                value={priceFilter.min}
                                onChange={handlePriceChange}
                                min="80"
                                max="4500"
                                step={5}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div onClick={clearFilters} className='filter-action'>Clear All Filters</div>
        </div>
    )
}

export default ProductSideBar
