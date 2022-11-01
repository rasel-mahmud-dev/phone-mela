import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "store/index";
import Product from "../../../Common/Product/Product";
import {setHomePageSectionProducts, toggleHandleCart, toggleHandleWishlist} from "actions/productAction";
import fetchHomePageSectionProducts from "../../../Common/funtions";
import api from "apis/api";
import {HomePageSectionProductsType, ProductType} from "reducers/productReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Helmet from "react-helmet"
import {faHome} from "@fortawesome/pro-regular-svg-icons";
import fullLink from "../../../utils/fullLink";
import Carousel from "UI/Carousel/Carousel";
import Preload from "UI/Preload/Preload";

const sections = [
  {url: "/api/homepage-products", type: "latest", payload: "latest"},
  {url: "/api/homepage-products", type: "top_discount", payload: "topDiscount"},
  {url: "/api/homepage-products", type: "top_rating", payload: "topRating"},
  {url: "/api/homepage-products", type: "top_sales", payload: "topSales"},
  // {url: "/api/homepage-products", type: "latest", payload: "topDiscount"},
]

type MoreProductsProps = {

}

const MoreProducts: FC<MoreProductsProps> = (props) => {
  
  const params = useParams()
  const dispatch = useDispatch()
  
  const {productState: { homePageSectionProducts, cartProducts, wishlist }} = useSelector((state: RootStateType)=>state)
  
  let a: { label?: string; sliderImages?: any[], fields?: string[]; products: ProductType[] } | undefined = homePageSectionProducts[params.slug as keyof HomePageSectionProductsType]
  
  React.useEffect(()=>{
    if(!(a && a.products && a.products.length > 0)) {
      if (params.slug) {
        if(params.slug !== "topFavorites") {
          let sec = sections.find(s => s.payload === params.slug)
          if (!sec) return
          (async function () {
            const products = await fetchHomePageSectionProducts(sec.url, sec.type)
            if (products) {
              dispatch(setHomePageSectionProducts({[sec.payload]: {products}}))
            }
          }())
        } else {
  
          api.get("/api/top-wishlist-products").then(response=> {
            if (response.status === 200) {
              dispatch(setHomePageSectionProducts({topFavorites: { products:  response.data}}))
            }
          }).catch(ex=>{})
        }
      }
    }
  }, [params])
  
  function handleAddToCart() {
  
  }
  
  function handleToggleWishlist() {
  
  }
  
  
  return (
    <div>
  
      <Helmet>
        <title>{a && a.label} on https://phone-mela.vercel.app</title>
        <meta
          name="description"
          content="Get stats about every music from every movie"
        />
        <meta
          name="keywords"
          content="Music, Audio, Lyrics"
        />
      </Helmet>
      
      <div className="container-1600">
        
        <div className="relative px-3 mb-6 mt-8">
         <Preload to="/">
           <button className="btn text-white bg-primary-400 absolute">
             <span className="mr-1"><FontAwesomeIcon icon={faHome}/></span>
             <span className="hidden md:inline-block">Back to Homepage</span>
           </button>
         </Preload>
          <h1 className="mt-4 text-2xl font-medium text-center">{a && a.label}</h1>
        </div>
  
        <div className="banner">
            <Carousel>
              { a.sliderImages && a.sliderImages.map((image, i) =>
                i === 0 ? (
                  <div>
                    <img className="swiper-lazy" src={fullLink(image.url)} alt="" />
                  </div>
                ) :  (
                  <div>
                    <img className="swiper-lazy" data-src={fullLink(image.url)} alt=""/>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      { image.low && (
                        <img className="" src={fullLink(image.low)} alt=""/>
                      )}
                    </div>
                  </div>
                )
              )}
            </Carousel>
        </div>
        
        
        <div className="">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4">
          { a  && a.products && a.products.map((prod, i)=>(
            <Product
              key={i}
              prod={prod}
              fields={a && a.fields}
              wishlist={wishlist}
              cartProducts={cartProducts}
              handleAddToCart={()=>dispatch(toggleHandleCart({
                cover: prod?.cover,
                price: prod.price,
                title: prod.title,
                product_id: prod._id
              }, true, 1000))}
              handleToggleWishlist={()=>dispatch(toggleHandleWishlist({
                cover: prod?.cover,
                price: prod.price,
                title: prod.title,
                product_id: prod._id
              }, true, 1000))}
            />
          )) }
        </div>
        </div>
        <div className="flex justify-center">
          <button className="btn bg-primary-400 text-white px-4 my-4 ">Load More</button>
        </div>
      </div>
    </div>
  );
};

export default MoreProducts;