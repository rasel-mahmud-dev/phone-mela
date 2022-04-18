import React, {FC, useRef} from 'react'
import api, {baseUri} from "../apis/api";
import "./homePage.scss"
import banner from "src/asserts/avatar/banner.jpg"
import fullLink from "../utils/fullLink";
import {Link} from "react-router-dom";
import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars, faArrowRight, faHeart, faTimes} from "@fortawesome/pro-regular-svg-icons"
import { fetchBrands, setHomePageSectionProducts, toggleHandleCart, toggleHandleWishlist,
} from "src/store/actions/productAction";

import { useDispatch, useSelector } from "react-redux";
import brokenImg from "src/asserts/images/no-img.png"
import {
  BrandType, HomePageSectionProductsType, ProductType,
} from "reducers/productReducer";
import { toggleSideBar} from "actions/toolsAction";
import {RootStateType} from "store/index";
import Product from "../Common/Product/Product";
import slugify from "../utils/slugify";
import fetchHomePageSectionProducts from "../Common/funtions";
import Helmet from "react-helmet";


let backdropTimeId

interface HomePageProps{

}

const HomePage:FC<HomePageProps> = (props)=> {
  
  const {
    productState: { cartProducts, homePageSectionProducts, wishlist, brands },
    auth,
    tools: {openSideBar}
  }  = useSelector((state: RootStateType) => state)

  
  const dispatch = useDispatch()
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

  React.useEffect(()=>{
    
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
    
    if(!brands || brands.length === 0){
    dispatch(fetchBrands((data): void => {
      if (data) {
        setShowBrands({
          status: "top",
          brands: brands.slice(0, 15)
        })
    
      }
    }))
    }
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
    return <div className="banner_row mt-4">
      <h1 className="text-xl font-normal">{label}</h1>
      <Link to={`/products/${slug}`} className="link_btn flex items-center">
        <span className="text-sm font-normal">{btnName}</span>
        <FontAwesomeIcon icon={faArrowRight} className="text-xs ml-2" />
      </Link>
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

  
  function clickOnBackdrop(){
    // backdropTimeId && clearTimeout(backdropTimeId)
    // setErrorState({
    //   message: "",
    //   isOpen: false
    // })
  }
  
  function handleLoadError(e: any) {
    e.target.src = brokenImg
    // baseUri + "/images/no-img.png"
  }
  function clickOnOverlay(){
    dispatch(toggleSideBar({
      where: "homePage",
      isOpen: false
    }))
  }

  type Sec = keyof HomePageSectionProductsType
  type StringUnionToKV<S extends string> = { [K in S]: K };

  return (
      <div className="px-3 container-1600">
  
        <Helmet>
          <link rel="canonical" href={`https://phone-mela.vercel.app`} />
          <title>Home Page of phone-mela.vercel.app</title>
          {/*<meta*/}
          {/*  name="description"*/}
          {/*  content="Get stats about every music from every movie"*/}
          {/*/>*/}
          {/*<meta*/}
          {/*  name="keywords"*/}
          {/*  content="Music, Audio, Lyrics"*/}
          {/*/>*/}
        </Helmet>
        
        <div className="banner">
          {/*<img src={banner} alt=""/>*/}
        </div>
        
        <div className={["home_page_content_wrapper flex", openSideBar.where === "homePage" && openSideBar.isOpen ? "open-sidebar" : "close-sidebar"].join(" ")}>
  
          <div className="left_sidebar bg-white px-4 py-2 mt-4">
            <h2 className="text-[15px] text-gray-800 font-medium">TOP BRANDS</h2>
            <div className="columns-2 mt-2">
              { brands && showBrands.brands.map((brand)=>(
                <div key={brand.id}>
                  <li>
                    <span className="cursor-pointer text-sm font-normal text-gray-600 hover:text-primary-400">{brand.name}</span>
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
              <Link key={discountProd.id} className="small_sidebar__prod" to={`/product/${slugify(discountProd.title)}/${discountProd.id}`}>
                <div>
                  <div className="mx-auto w-8">
                    <img className="w-full flex" src={fullLink(discountProd.cover)} alt={discountProd.cover}/>
                  </div>
                  <h4 className="font-normal text-gray-600 text-[13px] mt-2 text-center ">{discountProd.title}</h4>
                  <h4 className="text-primary-400 text-[13px] text-center">{discountProd.discount}% off</h4>
                </div>
              </Link>
            )) }
            </div>
  
            <h2 className="text-[15px] text-gray-800 font-medium mt-4">TOP SELLING PRODUCTS</h2>
            <div className="grid grid-cols-2 mt-1">
              { homePageSectionProducts.topSales && homePageSectionProducts.topSales.products.map((discountProd: any, i: number)=> discountProd.sold > 0 && (
                <Link key={i} className="small_sidebar__prod" to={`/product/${slugify(discountProd.title)}/${discountProd.id}`}>
                  <div>
                    <div className="mx-auto w-8">
                      <img className="w-full flex" src={fullLink(discountProd.cover)} alt={discountProd.cover}/>
                    </div>
                    <h4 className="font-normal text-gray-600 text-[13px] mt-2 text-center ">{discountProd.title}</h4>
                    <h4 className="text-primary-400 text-[13px] text-center">{discountProd.sold} Sold</h4>
                  </div>
                </Link>
              )) }
            </div>
            
            {/*<h2 className="text-lg text-gray-800 font-medium">LATEST DEVICES</h2>*/}
            {/*<h2 className="text-lg text-gray-800 font-medium">TOP 10 BY DAILY INTEREST</h2>*/}
            {/*<p>Device 	Daily hits</p>*/}
            {/*<h2 className="text-lg text-gray-800 font-medium">TOP 10 BY FANS</h2>*/}
            {/*<p>Device Favorites</p>*/}
            
          </div>
  
          <div onClick={clickOnOverlay} className={[openSideBar.where === "homePage" && openSideBar.isOpen && "open-sidebar" ? "content-overlay" : ""].join(" ")} />
          
          <div className="content pl-4" ref={contentRef}>
            
            {/*<FontAwesomeIcon icon={faBars} />*/}
            
            {/*<button>Show</button>*/}
            { homePageSectionProducts && Object.keys(homePageSectionProducts).map(((section: string , i: number)=>(
              <div key={i}>
                <div className="">
                  { renderSectionHeader(homePageSectionProducts[section].label, section) }
                </div>
        
                <div className="home_products_list__container">
                  <div className="home_products_list single_products_list">
                    {homePageSectionProducts[section as keyof HomePageSectionProductsType] && homePageSectionProducts[section].products.map((prod: ProductType, i: number)=>(
                      // <div className="home_product_item__wrapper">
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
                          product_id: prod.id
                        }, true))}
                        
                        handleToggleWishlist={()=>dispatch(toggleHandleWishlist({
                          title: prod.title,
                          price: prod.price,
                          cover: prod.cover,
                          product_id: prod.id
                        }, true))}
                      />
                      
                      // </div>
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
    )
}


export default HomePage