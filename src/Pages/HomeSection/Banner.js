import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import BannerImage from '../../Data/Assets/BannerImage';
import "./Banner.css";

const Banner = ({ autoSlideInterval }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    function leftArrowHandler() {
        setCurrentSlide(currentSlide === 0 ? BannerImage.length - 1 : currentSlide - 1);
    }

    function rightArrowHandler() {
        setCurrentSlide(currentSlide === BannerImage.length - 1 ? 0 : currentSlide + 1);
    }

    useEffect(() => {
        const autoSlideTimer = setInterval(() => {
            rightArrowHandler();
        }, autoSlideInterval)

        return () => {
            clearInterval(autoSlideTimer);
        }

    }, [autoSlideInterval, currentSlide])

    return (
        <div className='container'>
            <BsArrowLeftCircleFill onClick={leftArrowHandler} className='arrow arrow-left' />
            {
                BannerImage.map((item, index) => (
                    <img
                        key={item.id}
                        src={item.url}
                        alt={item.title}
                        className={currentSlide === index ? 'current-image' : 'current-image hidden'}
                    />
                ))
            }
            <BsArrowRightCircleFill onClick={rightArrowHandler} className='arrow arrow-right' />
            <span className='circle-indicators'>
                {
                    BannerImage.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={currentSlide === index ? 'current-indicator' : 'current-indicator inactive'}
                        ></button>
                    ))
                }
            </span>
        </div>
    )
}

export default Banner
