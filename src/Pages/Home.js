import React, { useEffect } from 'react'
import Banner from './HomeSection/Banner'
import ProductSlider from './HomeSection/ProductSlider'

const Home = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  } , [])

  return (
    <>
      <Banner autoSlideInterval={3000}/>
      <ProductSlider/>
    </>
  )
}

export default Home
