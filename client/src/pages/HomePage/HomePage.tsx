import React, {FC, useEffect, useRef} from 'react'
import api from "apis/api";
import "./homePage.scss"
import fullLink from "../../utils/fullLink";

import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowRight} from "@fortawesome/pro-regular-svg-icons"
import { fetchBrands, setHomePageSectionProducts, toggleHandleCart, toggleHandleWishlist,
} from "actions/productAction";

import { useDispatch, useSelector } from "react-redux";
import {
  BrandType, HomePageSectionProductsType, ProductType,
} from "reducers/productReducer";
import { toggleSideBar} from "actions/toolsAction";
import {RootStateType} from "store/index";
import Product from "../../Common/Product/Product";
import slugify from "../../utils/slugify";
import fetchHomePageSectionProducts from "../../Common/funtions";
import Helmet from "react-helmet";
import Preload from "UI/Preload/Preload";
import Layout from "../../Common/Layout/Layout";
import Carousel from 'UI/Carousel/Carousel';
import {ActionTypes} from "actions/actionTypes";
import {useNavigate} from "react-router-dom";
import Banner from "pages/HomePage/components/Banner";


interface HomePageProps{}

const HomePage:FC<HomePageProps> = (props)=> {
  
  const {
    productState: { cartProducts, homePageSectionProducts, wishlist, brands },
    auth,
    tools: {openSideBar}
  }  = useSelector((state: RootStateType) => state)

  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contentRef = useRef()
  
  const [state, setState] = React.useState({
    products: [],
    cutOffBrands: []
  })


  const [showBrands, setShowBrands] = React.useState<{status: "top" | "all", brands: BrandType[]}>({
    status: "top",
    brands: [],
  })
  
  const sections = [
    {url: "/api/homepage-products", type: "latest", payload: "latest"},
    {url: "/api/homepage-products", type: "top_discount", payload: "topDiscount"},
    {url: "/api/homepage-products", type: "top_rating", payload: "topRating"},
    {url: "/api/homepage-products", type: "top_sales", payload: "topSales"},
    // {url: "/api/homepage-products", type: "latest", payload: "topDiscount"},
  ]

  useEffect(()=>{
    (async function (){
      sections.map(sec=>{
        (async function (){
          // caching products
          if(!(homePageSectionProducts[sec.payload]) || !(homePageSectionProducts[sec.payload].products) ||  homePageSectionProducts[sec.payload].products.length === 0) {
            let products = await fetchHomePageSectionProducts(sec.url, sec.type)
            if (products) {
              dispatch(setHomePageSectionProducts({
                [sec.payload]: {products: products}
              }))
            }
          }
        }())
      })
  
  
      if(!(homePageSectionProducts.topFavorites) || !(homePageSectionProducts.topFavorites.products) ||  homePageSectionProducts.topFavorites.products.length === 0) {
        api.get("/api/top-wishlist-products").then(response => {
          if (response.status === 200) {
            dispatch(setHomePageSectionProducts({topFavorites: {products: response.data}}))
          }
        }).catch(ex => {
        })
      }
    }())
    
    // api.post("/api/cart-products").then(r=>{}).catch(ex=>{})

    dispatch(fetchBrands( (data): void => {
      if (data) {
        setShowBrands({
          status: "top",
          brands: data.slice(0, 15)
        })
      }
    }))
    
  }, [])
  
  
  function handleShowAllBrands(status: "top" | "all"){
    if(brands && brands.length > 0){
      setShowBrands({
        status,
        brands: status === "top" ? brands.slice(0, 15) : brands
      })
    }
  }
  
  
  // const handleToggleBackdrop=(e)=>{
  //   this.setState({ isShowBackdrop: !this.state.isShowBackdrop })
  // }
  //
  // const clickOnBackdrop=(e)=>{
  //   this.setState({ isShowBackdrop: false})
  // }
  
  
  function renderBanner(label: string, btnName: string, slug: string){
    return <div className="banner_row mt-4 px-4">
      <h1 className="text-xl font-normal">{label}</h1>
      <Preload to={`/products/${slug}`} className="link_btn flex items-center">
        <span className="text-sm font-normal">{btnName}</span>
        <FontAwesomeIcon icon={faArrowRight} className="text-xs ml-2" />
      </Preload>
    </div>
  }
    
    // const homeSection = [
    //   { render: ()=> renderBanner("Hot Trending Products", "View More") , products: state.products.slice(0, 10)  },
    //   { render: ()=> renderBanner("Top Latest Mobiles", "View More") , products: state.products.slice(0, 10)  },
    //   { render: ()=> renderBanner("Hot Deal", "See More") , products: state.products.slice(0, 5)},
    //   { render: ()=> renderBanner("Top Selling", "See More") , products: state.products}
    // ]
  
  function renderSectionHeader(label: string, slug: string) {
    return renderBanner(label, "View More", slug)
  }
  
  function clickOnOverlay(){
    dispatch(toggleSideBar({
      where: "homePage",
      isOpen: false
    }))
  }
  
  function handleClickOnBrand(brand: BrandType){
    dispatch({
      type: ActionTypes.SELECT_BRANDS,
      payload: [brand]
    })
    return Preload.Load("/q", () => {
      navigate("/q")
    })
  }
  
  return (
    <div>
      <Helmet>
        <link rel="canonical" href={`https://phone-mela.vercel.app`} />
        <title>Home Page of phone-mela.vercel.app</title>
        
      </Helmet>
      
      <Layout openSidebar={openSideBar.where === "homePage" && openSideBar.isOpen} className="container-1400 page_wrapper">
        <div className="left_sidebar">
          <div className="left_sidebar_content">
            <h2 className="text-[15px] text-gray-800 font-medium">TOP BRANDS</h2>
            <div className="columns-2 mt-2">
              { showBrands.brands && showBrands.brands.map((brand)=>(
                <div key={brand._id}>
                  <li>
                    <span onClick={()=>handleClickOnBrand(brand)} className="cursor-pointer text-sm font-normal text-gray-600 hover:text-primary-400">{brand.name}</span>
                  </li>
                </div>
              ))  }
            </div>
            {showBrands.status === "top"
              ? <button onClick={()=>handleShowAllBrands("all")} className="mt-2 text-primary-400 text-sm font-normal">Show All</button>
              : <button onClick={()=>handleShowAllBrands("top")} className="mt-2 text-primary-400 text-sm font-normal">Show Less</button> }
        
            <h2 className="text-[15px] text-gray-800 font-medium mt-4">TOP DISCOUNT</h2>
            <div className="grid grid-cols-2 mt-1">
              { homePageSectionProducts.topDiscount && homePageSectionProducts.topDiscount.products.map(discountProd=>(
                <Preload key={discountProd._id} className="small_sidebar__prod" to={`/product/${slugify(discountProd.title)}/${discountProd._id}`}>
                  <div>
                    <div className="mx-auto w-8">
                      <img className="w-full flex" src={fullLink(discountProd.cover)} alt={discountProd.cover}/>
                    </div>
                    <h4 className="font-normal text-gray-600 text-[13px] mt-2 text-center ">{discountProd.title}</h4>
                    <h4 className="text-primary-400 text-[13px] text-center">{discountProd.discount}% off</h4>
                  </div>
                </Preload>
              )) }
            </div>
        
            <h2 className="text-[15px] text-gray-800 font-medium mt-4">TOP SELLING PRODUCTS</h2>
            <div className="grid grid-cols-2 mt-1">
              { homePageSectionProducts.topSales && homePageSectionProducts.topSales.products.map((discountProd: any, i: number)=> discountProd.sold > 0 && (
                <Preload key={i} className="small_sidebar__prod" to={`/product/${slugify(discountProd.title)}/${discountProd._id}`}>
                  <div>
                    <div className="mx-auto w-8">
                      <img className="w-full flex" src={fullLink(discountProd.cover)} alt={discountProd.cover}/>
                    </div>
                    <h4 className="font-normal text-gray-600 text-[13px] mt-2 text-center ">{discountProd.title}</h4>
                    <h4 className="text-primary-400 text-[13px] text-center">{discountProd.sold} Sold</h4>
                  </div>
                </Preload>
              )) }
            </div>
        
            {/*<h2 className="text-lg text-gray-800 font-medium">LATEST DEVICES</h2>*/}
            {/*<h2 className="text-lg text-gray-800 font-medium">TOP 10 BY DAILY INTEREST</h2>*/}
            {/*<p>Device 	Daily hits</p>*/}
            {/*<h2 className="text-lg text-gray-800 font-medium">TOP 10 BY FANS</h2>*/}
            {/*<p>Device Favorites</p>*/}
        
          </div>
        </div>
        
        <div className="content" ref={contentRef}>
          
          
          <div onClick={clickOnOverlay} className={[openSideBar.where === "homePage" && openSideBar.isOpen && "open-sidebar" ? "content-overlay" : ""].join(" ")} />
            
            <div className="">
  
              <Banner />
              
      
              <div className={["page_wrapper", openSideBar.where === "homePage" && openSideBar.isOpen ? "open-sidebar" : "close-sidebar"].join(" ")}>

                <div className="w-full px-3" >
          
                  {/*<FontAwesomeIcon icon={faBars} />*/}
          
                  {/*<button>Show</button>*/}
                  { homePageSectionProducts && Object.keys(homePageSectionProducts).map(((section: string , i: number)=>(
                    <div key={i}>
                      <div className="">
                        { renderSectionHeader(homePageSectionProducts[section].label, section) }
  
                        <div className="mt-2">
                          <div className="banner">
                            {/*{bannerCarousel()}*/}
                            <Carousel>
                            { homePageSectionProducts[section] && homePageSectionProducts[section].sliderImages && homePageSectionProducts[section].sliderImages.map((image, i) =>
                        
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
                        </div>
                      </div>
                      <div className="">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4">
                          {homePageSectionProducts[section as keyof HomePageSectionProductsType] && homePageSectionProducts[section].products.map((prod: ProductType, i: number)=>(
                            <div className="home_product_item__wrapper">
                            <Product
                              key={i}
                              prod={prod}
                              fields={homePageSectionProducts[section].fields}
                              wishlist={wishlist}
                              cartProducts={cartProducts}
                              // handleLoadError={} isInWished={} isInCart={}
                              handleAddToCart={()=>dispatch(toggleHandleCart({
                                title: prod.title,
                                price: prod.price,
                                cover: prod.cover,
                                product_id: prod._id
                              }, true, 1000))}
                          
                              handleToggleWishlist={()=>dispatch(toggleHandleWishlist({
                                title: prod.title,
                                price: prod.price,
                                cover: prod.cover,
                                product_id: prod._id
                              }, true, 1000))}
                            />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))) }
                </div>
              </div>
              {/*{ this.state.products && this.state.products.map(prod=>(*/}
              {/*  <div>*/}
              {/*    <h3>{prod.title}</h3>*/}
              {/*    <p>{prod.price}</p>*/}
              {/*  </div>*/}
              {/*)) }*/}
          </div>
         </div>
      </Layout>
    </div>
  )
  
}


export default HomePage