import React from 'react';
import fullLink from "../../../utils/fullLink";
import Carousel from "UI/Carousel/Carousel";

const Banner = () => {
    return (
            <Carousel >
                  <div>
                    <img className="swiper-lazy" src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4.jpg")} alt=""/>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <img className="" src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg")} alt=""/>
                    </div>
                  </div>
                  <div>
                    <img className="swiper-lazy" data-src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653555/phone_mela/products/c3.jpg")} alt=""/>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <img className="" src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c3_low.jpg")} alt=""/>
                    </div>
                  </div>
                  <div>
                    <img className="swiper-lazy" data-src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653667/phone_mela/products/c7.jpg")} alt=""/>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <img className="" src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c7_low.jpg")} alt=""/>
                    </div>
                  </div>
                  <div>
                    <img className="swiper-lazy" data-src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653643/phone_mela/products/c6.jpg")} alt=""/>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <img className="" src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c6_low.jpg")} alt=""/>
                    </div>
                  </div>
                </Carousel>

    );
};

export default Banner;