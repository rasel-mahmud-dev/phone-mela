import React, {ReactEventHandler} from 'react'
import {connect} from "react-redux"
import {
  AddCartPayload, AddWishlistPayload,
  clearProductDetails,
  deleteProduct,
  fetchProduct, toggleHandleCart, toggleHandleWishlist
} from "src/store/actions/productAction"


import Loader from "UI/Loader/Loader";

// import ProgressBar from "react-topbar-progress-indicator";


import "./product_details.scss"
import fullLink from "src/utils/fullLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart, faStar} from "@fortawesome/pro-solid-svg-icons";
import {RootStateType} from "store/index";
import { ProductDetailType} from "store/types/prouductReduceTypes";
import api from "apis/api";

import withParams from "../../../utils/withParams";
import Helmet from "react-helmet";
import {CartProductType, ProductType, WishList} from "reducers/productReducer";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Pagination from "UI/Pagination/Pagination";


interface Props {
  productDetails: any,
  isLoading: boolean,
  cartProducts: CartProductType[],
  wishlist: WishList[],
  auth: object,
  fetchProduct: any
  params: {productId: string},
  toggleHandleCart: (arg0: AddCartPayload, isShowPopup: boolean,  timeout: number) => void,
  toggleHandleWishlist: (arg0: AddWishlistPayload, isShowPopup: boolean, timeout: number) => void,
}
interface State {
  productDetail: ProductDetailType,
  amountOfRate: {
    [key: number]: number
  },
  allStar: number
  currentPageForReview: number
}

class ProductDetails extends React.Component<Readonly<Props>, Readonly<State>>{

  constructor(props: Readonly<Props>) {
    
    super(props);
    this.state = {
      productDetail: {
        attributes: null,
        author_id: "",
        avatar: "",
        brand_id: "",
        brand_name: "",
        rate: 0,
        cover: "",
        created_at: "",
        description: "",
        discount: 0,
        email: "",
        _id:"",
        price: 0,
        seller_id: "",
        stock: "",
        tags: "",
        title: "",
        updated_at: "",
        specification_id: 0,
        username: "",
        highlights: null,
        product_questions: null,
        reviews: null,
        specifications: null,
        colors: null,
        ram: null,
        storage: null
      },
      amountOfRate: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      currentPageForReview: 1,
      allStar: 0
    }
  }
  
  rating = [
    {rating: 1, amount: 10},
    {rating: 2, amount: 30},
    {rating: 3, amount: 10},
    {rating: 4, amount: 20},
    {rating: 5, amount: 20},
  ]
  
  
  async componentDidMount() {
  
    const {productId} = this.props.params
    /// fetch product with id
    // this.props.fetchProduct(productId)

    try{
      const response = await api.get(`/api/product/${productId}`)
      console.log(response)
      if(response.status === 200) {
      if (response.data._id) {
        let { attributes } = response.data
        try {
          attributes = attributes && JSON.parse(attributes)
        } catch (ex ){}
  
        
        this.setState((prevState: State): State => {
          return {
            ...prevState,
            productDetail: {
              ...prevState.productDetail,
              _id: response.data._id,
              averageRate: response.data.averageRate,
              title: response.data.title,
              brand_id: response.data.brand_id,
              brand_name: response.data.brand_name,
              description: response.data.description,
              price: response.data.price,
              author_id: response.data.author_id,
              cover: response.data.cover,
              discount: response.data.discount,
              tags: response.data.tags,
              attributes: attributes,
              created_at: response.data.created_at,
              updated_at: response.data.updated_at,
              username: response.data.username,
              avatar: response.data.avatar,
              email: response.data.email
            }
          }
        })
  
        //? Note uncomment it for products
        // if(response.data.specification_id !== 0) {
        //   await this.fetchProductSpecification(response.data.specification_id)
        // }
        await this.fetchProductSpecification(response.data.specification_id)
        
      
        await this.fetchProductReviews(response.data._id)
        await this.fetchProductQuestions(response.data._id)
      }
    }
    } catch(ex){
      console.log(ex)
    }
  }
  
  
  fetchProductSpecification = async (specificationId: string | number)=>{
    // fetch product product_specification
  
    //? Note i use specification details for all from product specification for product id 1
    const response2 = await api.get(`/api/specification/${1}`)
    if(response2.status === 200){
      let { colors, description, highlights, ram, specification_id, specifications, storage } = response2.data
      try {
        specifications = specifications && JSON.parse(specifications)
        colors = specifications && JSON.parse(colors)
        highlights = highlights && JSON.parse(highlights)
        ram = ram && JSON.parse(ram)
        storage = storage && JSON.parse(storage)
      
      } catch (ex ){
      
      }
    
      this.setState((prevState: State): State => {
        let specifications = null;
        try {
          specifications = response2.data.specifications && JSON.parse(response2.data.specifications)
        } catch (ex ){
        
        }
        return {
          ...prevState,
          productDetail: {
            ...prevState.productDetail,
            // description: description, // skip description from product specifications for test mode only
            specifications: specifications ? specifications : null ,
            colors: colors ? colors : null ,
            highlights: highlights ? highlights : null ,
            ram: ram ? ram : null ,
            storage: storage ? storage : null,
            specification_id: specification_id
          }
        }
      })
    }
  }
  
  fetchProductQuestions = async (productId: string | number)=>{
    // fetch product Questions and Answers
  
    //!Note i use product_questions for all from product product_questions for product id 1
    const response2 = await api.get(`/api/product_questions/${1}`)
    if(response2.status === 200){
      // let {  answer, answerer_id, created_at, product_id, question, question_id, questioner_id } = response2.data
      this.setState((prevState: State): State => {
        return {
          ...prevState,
          productDetail: {
            ...prevState.productDetail,
            product_questions: response2.data
          }
        }
      })
    }
  }
  
  fetchProductReviews = async (productId: string | number)=>{
    // fetch product Questions and Answers
  
    //!Note i use reviews for all from product review for product id 1
    const response: any = await api.get(`/api/reviews/${1}`)
    if(response.status === 200){
      this.setState((prevState: State): State => {
  
  
        let stars = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        }
        
        response.data && response.data.map(review => {
          switch(true){
            case review.one_star !== 0:
              stars["1"] += 1
              break
      
            case review.two_star !== 0:
              stars["2"] += 1
              break
      
            case review.three_star !== 0:
              stars["3"] += 1
              break
      
            case review.four_star !== 0:
              stars["4"] += 1
              break
      
            case review.five_star !== 0:
              stars["5"] += 1
              break
      
            default:
              return 0
          }
          // subTotalRate += (rate.rating * rate.amount)
          // totalAmount += rate.amount
    
        })
  
        let allStar = 0
        let totalRate = 0
        let starKey: any
        
        for (starKey in stars) {
          allStar += (starKey * stars[starKey])
          totalRate += stars[starKey]
        }
  
        return {
            ...prevState,
          amountOfRate: stars,
          allStar: allStar,
          // totalAverageRate: Number((allStar / totalRate).toFixed(1)),
            productDetail: {
              ...prevState.productDetail,
              reviews: response.data
            }
          }
        })
      
      // let { created_at, customer_id, customer_uploads, customer_avatar, product_id, rate, review_id, summary, title } = response.data
      // try {
      //   specifications = specifications && JSON.parse(specifications)
      //   colors = specifications && JSON.parse(colors)
      //   highlights = highlights && JSON.parse(highlights)
      //   ram = ram && JSON.parse(ram)
      //   storage = storage && JSON.parse(storage)
      //
      // } catch (ex ){
      //
      // }
      //
      // this.setState((prevState: State): State => {
      //   let specifications = null;
      //   try {
      //     specifications = response2.data.specifications && JSON.parse(response2.data.specifications)
      //   } catch (ex ){
      //
      //   }
      //   return {
      //     ...prevState,
      //     productDetail: {
      //       ...prevState.productDetail,
      //       description: description,
      //       specifications: specifications ? specifications : null ,
      //       colors: colors ? colors : null ,
      //       highlights: highlights ? highlights : null ,
      //       ram: ram ? ram : null ,
      //       storage: storage ? storage : null,
      //       specification_id: specification_id
      //     }
      //   }
      // })
    }
  }
  
  calculateRate() {
    let {reviews} = this.state.productDetail
   

    let subTotalRate = 0
    let totalAmount = 0
    reviews && reviews.map(review => {
      // subTotalRate += (rate.rating * rate.amount)
      // totalAmount += rate.amount
    })
    
    return (subTotalRate / totalAmount).toFixed(1)
  }
  
  getTime(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString()
  }
  
  
  
  totalRating() {
    let totalAmount = 0
    this.rating.map(rate => {
      totalAmount += rate.amount
    })
    return 15
  }
  
  
  renderDetailSpecifications(specifications: any[]) {
    return (
      <div className="-mt-3">
        {specifications.map(section => (
          <div className="mt-5">
            <label className="text-md font-medium">{section.label}</label>
            <div>
              {section.props && Object.keys(section.props).map(prop => (
                <div className="mt-2 each_spec flex align-start ">
                  <label className="text-sm sub_label w-[100px] min-w-[100px] font-normal">{prop}</label>
                  <p className="">{section.props[prop]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  renderRatings() {
    const {productDetail} = this.state
    
    return (
      <div className="rating_ flex-1 flex justify-between items-center">
        <div className="rating_left flex-1">
          <div className="flex items-center justify-center">
            <h1 className="big_rating_num ">
              {this.state.productDetail.averageRate}
            </h1>
            <FontAwesomeIcon icon={faStar} className="text-4xl text-dark-800"/>
          </div>
          <div className="total_rating_count">
            <h2>{this.state.productDetail.reviews?.length} ratings</h2>
            <h2>&</h2>
            <h2>reviews</h2>
          </div>
        </div>
        <div className="rating_right flex-1">
          {Object.keys(this.state.amountOfRate).map(rate => (
            <div className="flex items-center">
                <span className="flex items-center">
                  <span className="text-dark-800 text-[13px] font-normal" style={{width: "10px"}}>{rate} </span>
                  <FontAwesomeIcon className="text-dark-800 text-[13px] font-normal" icon={faStar}/>
                </span>
              <div className="rating_bar ml-2">
                <span style={{width: ((this.state.amountOfRate[rate] * 100) / (productDetail.reviews ? productDetail.reviews.length : 0) ) + "%"}} className="color_bar"/>
              </div>
              <span className="total_rating_num  ml-2 min-w-[10px]">
                  <span className="text-dark-800 text-[13px] font-normal">{this.state.amountOfRate[rate]}</span>
                </span>
            </div>
          ))}
          
          {/*<div className="flex items-center">*/}
          {/*    <span className="flex items-center">*/}
          {/*      <span>5</span>*/}
          {/*      <FontAwesomeIcon className="ml-2" icon={faStar} />*/}
          {/*    </span>*/}
          {/*  <div className="rating_bar ml-2">*/}
          {/*    <span className="color_bar"/>*/}
          {/*  </div>*/}
          {/*  <span className="total_rating_num  ml-2">*/}
          {/*      <span>50</span>*/}
          {/*    </span>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
  
  fetchMoreReview(pageNumber: number){
    this.setState(prevState=>{
      return {
        ...prevState,
        currentPageForReview: pageNumber
      }
    })
  }
  
  isInCart=(id: string)=> {
    let i = this.props.cartProducts && this.props.cartProducts.findIndex(cp=>cp.product_id.toString() === id.toString())
    return i !== -1
  }
  
  
  isInWished=(id: string)=> {
    let i = this.props.wishlist.findIndex(cp=>cp.product_id.toString() === id.toString())
    return i !== -1
  }
  
  
  render() {
    
    
    // function renderDeepDetails() {
    //   if(productDescription.details) {
    //     return Object.keys(productDescription.details).map(sectionKey=>{
    //       return ( <div className="description_section">
    //           <Row align="top" className="mt-5">
    //             <div className="description_key description_key_att" >{sectionKey}</div>
    //             <div className="description_value">
    //               {productDescription.details && productDescription.details[sectionKey] && Object.keys(productDescription.details[sectionKey]).map(sec=>(
    //                 <Row className="description_section_row">
    //                   <li className="description_key--key">{sec}</li>
    //                   <li className="description_key--value">{productDescription.details && productDescription.details[sectionKey][sec]}</li>
    //                 </Row>
    //               ))}
    //             </div>
    //           </Row>
    //         </div>
    //
    //       )
    //
    //     })
    //   }
    // }
    
    const { productDetail, currentPageForReview, amountOfRate} = this.state
    
    
    return (
      <div className="container-1400 px-4 product_detail_page bg-white">
        
        {/*{ props.isLoading && <ProgressBar /> }*/}
        {/*<Button*/}
        {/*  onClick={pushBack}*/}
        {/*  theme="red"*/}
        {/*  iconStyle={{marginRight: "5px"}}*/}
        {/*  waves="green" color="white" flat*/}
        {/*  icon="fal fa-arrow-left">Back</Button>*/}
      
        {/*<h1>Details</h1>*/}
        {/*{isLoading && <Loader isLoading={isLoading} style={{top: "100px"}}/>}*/}
     
        {productDetail && productDetail._id && (
        
          <div className="product_detail ">
  
            <Helmet>
              <link rel="canonical" href={`https://phone-mela.vercel.app/#/product/${productDetail.title}/${productDetail._id}`} />
              <title>{productDetail.title} on phone-mela.vercel.app</title>
              {/*<meta*/}
              {/*  name="description"*/}
              {/*  content="Get stats about every music from every movie"*/}
              {/*/>*/}
              {/*<meta*/}
              {/*  name="keywords"*/}
              {/*  content="Music, Audio, Lyrics"*/}
              {/*/>*/}
            </Helmet>
  
  
  
            <div  className="page_wrapper2">
              <div className="left_sidebar2">
                <div className="left_sidebar_content">
                  <div className="product_cover flex-2">
    
                    <div className="flex-1" >
                      <div className="">
                        <div className="cover_root">
                          <div>
                            <img src={fullLink(productDetail.cover)} alt=""/>
                          </div>
                        </div>
                        <div className="product_cover_thumbs mt-8">
                          <Swiper
                            slidesPerView={5}
                            spaceBetween={30}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            navigation={false}
                            className="mySwiper"
                          >
                            {new Array(10).fill("1").map(item => (
                              <div>
                                <div className="thumb_pic">
                                  {/*<img src={fullLink(productDetail.cover)} alt=""/>*/}
                                  <SwiperSlide>
                                    <img  src={fullLink(productDetail.cover)} alt=""/>
                                  </SwiperSlide>
                                </div>
                              </div>
                            ))}
                          
                          </Swiper>
                          
                        </div>
                      </div>
                      
                      <div className="flex justify-center mt-4">
                        <button onClick={()=>this.props.toggleHandleCart({
                          title: productDetail.title,
                          price: productDetail.price,
                          cover: productDetail.cover,
                          product_id: productDetail._id
                        }, true, 1000)}
                                className="bg-secondary-400 font-normal text-white text-xl px-4 py-2 mr-1">{ this.isInCart(productDetail._id) ? "Remove from cart" : "Add to Cart"}</button>
                        <button  className="bg-primary-400  font-normal text-white text-xl px-4 py-2">Buy Now</button>
                      </div>
    
    
                    </div>
    
                    <div className={["heart_btn", this.isInWished(productDetail._id) ? "active": ""].join(" ")}>
                      <FontAwesomeIcon
                        onClick={()=>this.props.toggleHandleWishlist({
                          title: productDetail.title,
                          price: productDetail.price,
                          cover: productDetail.cover,
                          product_id: productDetail._id
                        }, true, 1000)}
                        icon={faHeart}/>
                    </div>
  
                  </div>
                </div>
                </div>
              <div className="content mx-2 md:mx-3">
                <div className="">
                  <h1 className="big_title mt-6 sm:mt-0">{productDetail.title}</h1>
                  <div className="flex items-center">
                    <span className="bg-primary-400 px-1.5 py-0.5 text-sm relative text-white rounded-[3px] mr-1.5">
                      <span>{this.state.productDetail.averageRate}</span>
                      <span className="relative -top-[1px] ml-1"><FontAwesomeIcon className="text-xs text-secondary-400" icon={faStar} /></span>
                    </span>
                    <h4>{productDetail.reviews?.length} Ratings & Reviews</h4>
                  </div>
    
                  <div>
                    <h1 className="mt-4">
                    { productDetail.discount && productDetail.discount !== 0
                      ? (
                        <>
                          <span>TK {this.newPrice(productDetail.price, productDetail.discount)}</span>
                          <span className="text-sm ml-2 text-gray-400 line-through text-secondary-400">{productDetail.price}</span>
                          <span className="text-sm ml-2 font-medium text-primary-400 ">{productDetail.discount}% off</span>
                        </>
                      )
                      : (
                        <h1>TK {productDetail.price}</h1>
                      )}
                    </h1>
                  </div>
    
                  <div className="sec ">
                    <h1 className="sec_label font-normal text-[14px]  min-w-[150px]">{productDetail.brand_name}</h1>
                    <span className="text-gray-900 text-sm">1 Year Warranty for Mobile and 6 Months for Accessories Know More</span>
                  </div>
    
                  <div className="sec ">
                    <h1 className="sec_label font-normal text-[14px]  min-w-[150px]">Seller</h1>
                    <ul className="text-gray-900 text-sm">
                      <li className="list-disc ml-3 mt-1">PETILANTE Online 4.7</li>
                      <li className="list-disc ml-3 mt-1">7 Days Replacement Policy?</li>
                      <li className="list-disc ml-3 mt-1">GST invoice available?</li>
                    </ul>
                  </div>
    
    
                  <div className="sec">
                    {ProductDetails.renderTwoColSection("Color variant",
                      this.state.productDetail.colors,
                      (colors: {v: string, url: string}[])=> <ul className="color_image_gallery">
                        { colors.map((color: any) => (
                          <li className="flex flex-col items-center justify-center">
                            <img src={fullLink(color.url)} alt=""/>
                            <span className="text-[12px] font-normal">Red</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="sec">
                    {ProductDetails.renderTwoColSection("Storage",
                      this.state.productDetail.storage,
                      (storage: {v: string, url: string}[])=> storage.map((s, i)=>
                          <span className={["mr-2", s.v === productDetail.attributes.internal_storage + "GB" ? "current_variant" : ""].join(" ")}>
                      <span key={i} className="text-sm font-normal hover:underline hover:text-primary-400 cursor-pointer">{s.v}</span>
                    </span>
                      )
                    )}
                  </div>
                  <div className="sec">
                    {ProductDetails.renderTwoColSection("Ram",
                      this.state.productDetail.ram,
                      (ram: {v: string, url: string}[])=>  ram.map( (r, i) =>
                          <span className={["mr-2", r.v === productDetail.attributes.ram + "GB" ? "current_variant" : ""].join(" ")}>
                    <span key={i} className="text-sm font-normal hover:underline hover:text-primary-400 cursor-pointer">{r.v}</span>
                  </span>
                      )
                    )}
                  </div>
                  <div className="sec">
                    {ProductDetails.renderTwoColSection(
                      "Highlights",
                      this.state.productDetail.highlights,
                      (data: any)=> (
                        <ul className="text-gray-900 text-sm">
                          {
                            data.map((d: string, i: number)=>
                              <li className="list-disc ml-3 mt-1" key={i}>{d}</li>
                            )
                          }
                        </ul>
                      )
                    )}
                  </div>
    
                  <div className="sec ">
                    {ProductDetails.renderTwoColSection("Description",
                      this.state.productDetail.description,
                      (description: any)=> <p className="whitespace-pre-wrap text-gray-900 text-sm">{description}</p>
                    )}
                  </div>
    
                  
                  <h1 className="mt-5 sec_label font-normal text-base min-w-[150px]">Product Description</h1>
                  <div className="sec !mt-0">
                    {productDetail.specifications && this.renderDetailSpecifications(productDetail.specifications )}
                  </div>
    
                  <div className="sec">
                    <h1 className="sec_label font-normal text-[14px]  min-w-[150px]">Disclaimer</h1>
                    <p className="mt-0 whitespace-pre-wrap text-gray-900 text-sm">We can not guarantee that the information on this page is 100% correct. Read more</p>
                  </div>
    
                  
                  <div className="mt-6">
                    <h1 className="sec_label font-normal text-base">Questions and Answers</h1>
                    <div className="flex w-full">
                      { productDetail &&  productDetail.product_questions &&  productDetail.product_questions.map(qus => (
                        <div className="each_qus_section flex-1">
                          <div>
                            <span>Q:</span>
                            <span className="text-gray-600 text-sm ml-2"><label htmlFor="">{qus.question}</label></span>
                          </div>
            
                          <div>
                            <span>A:</span>
                            <span className='text-gray-600 text-sm ml-2'>{qus.answer && qus.answer}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/*<button className="hover:text-primary-400 text-[14px] font-normal">All questions</button>*/}
                  </div>
    
                  
                  <div className="">
                    <div className="flex justify-between items-center">
                      <h1 className="sec_label font-normal text-base min-w-[150px]">All User Opinions and Reviews</h1>
                      <button className="btn bg-primary-400 text-white">Rate This</button>
                    </div>
                    <h2 className="mt-5 font-normal text-[14px]">{productDetail.title} - USER OPINIONS AND REVIEWS AND RATINGS</h2>
                  </div>
    
                  <div className="sec">
                    {this.renderRatings()}
                  </div>
    
                  <div className="mt-8">
                    
                    { productDetail.reviews &&
                    productDetail.reviews.slice(
                      (currentPageForReview  === 1 ? 0 : (currentPageForReview - 1)  * 5 ),
                      (currentPageForReview * 5)
                    ).map(review=>(
                      <div className="border-b border-gray-200 py-4">
          
                        <h1 className="font-normal">{review.title}</h1>
                        <p className="text-sm text-gray-700 mt-2">{review.summary}</p>
          
          
                        <div className="flex mt-4 relative">
                          <div className="flex">
                            {new Array(review.rate).fill(1).map(s=>(
                              <div className="mr-1">
                                <FontAwesomeIcon className="text-xs text-dark-100" icon={faStar} />
                              </div>
                            ))}
                          </div>
                          <div className="flex absolute left-0">
                            {new Array(3).fill(1).map(s=>(
                              <div className="mr-1">
                                <FontAwesomeIcon className="text-xs text-orange" icon={faStar} />
                              </div>
                            ))}
                          </div>
                        </div>
          
                        <div className="flex">
                          <img
                            onError={this.handleError}
                            className="w-4 mr-1 rounded-full"
                            
                            src={fullLink(review.customer_avatar)} alt="" />
                          <h4 className="text-[13px]">
                            <span className="font-normal">Customer { review.customer_name }</span>
                            <span className="ml-8">{new Date(review.created_at).toDateString()}</span>
                          </h4>
                        </div>
        
                      </div>
                    ))}
                    
                    {/* Review pagination  */}
                    <div className="flex justify-center">
                      <Pagination
                        totalProducts={productDetail.reviews ? productDetail.reviews.length : 0}
                        perPageShow={5}
                        currentPage={currentPageForReview}
                        onPageChange={(pageNumber)=>this.fetchMoreReview(pageNumber)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
            {/*<Row direction={"column"}>*/}
            {/*  <div className="d-flex mt-5">*/}
            {/*    <div>*/}
            {/*      <div className="rating_badge bg-transparent rating-star big-rating ">*/}
            {/*        <span>{calculateRate()}</span>*/}
            {/*        <i className="fa fa-star" />*/}
            {/*      </div>*/}
            {/*      <h4 className="text-grey fs-14 mt-5" > {totalRating()} Total Ratings</h4>*/}
            {/*      <h4>&</h4>*/}
            {/*      <h4 className="text-grey fs-14" > {reviews.length} Total Ratings</h4>*/}
            {/*    </div>*/}
            {/*    <Row direction={"column"} className="ml-5">*/}
            {/*      { rating.map(rat=>(*/}
            {/*        <div className="rate">*/}
            {/*          <div className="rating_badge bg-transparent rating-star ">*/}
            {/*            <span>{rat.rating}</span>*/}
            {/*            <i className="fa fa-star" />*/}
            {/*          </div>*/}
            {/*          <span className="user_rate-wrapper">*/}
            {/*              <div style={{width: ((rat.amount * 100) / totalRating())+"%"} } className="user_rate"/>*/}
            {/*            </span>*/}
            {/*          <span className="rate-amount text-grey fs-14 ml-5">{rat.amount}</span>*/}
            {/*        </div>*/}
            {/*      )) }*/}
            
            {/*    </Row>*/}
            {/*  </div>*/}
          
            {/*  <div className="mt-5">*/}
            {/*    <h4>Customer Gallery</h4>*/}
            {/*    <div  className="customer_gallery flex-wrap">*/}
            {/*      { new  Array(30).fill("", 1, 30).map(a=>(*/}
            {/*        <div>*/}
            {/*          /!*<Image className="m-2" maxWidth={25} src={image2} />*!/*/}
            {/*        </div>*/}
          
            {/*      ))}*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</Row>*/}
            
        
          </div>
      
        )}
        
      </div>
    )
  }
  
  handleError(e: any){
    let p = e.target.parentElement
    p.removeChild(e.target)
  }
  
  private static renderTwoColSection(name: string, data: string | any[] | null, sectionRender: (args: any)=> any) {

    return (
      <>
        <h1 className="sec_label font-normal text-[14px]  min-w-[150px]">{name}</h1>
        <ul>
          { data
            ? Array.isArray(data)
                ? data.length === 0
                  ?  <Loader className="small_loader" />
                  : sectionRender(data)
              :  sectionRender(data)
            : <Loader className="small_loader" />
          }
        </ul>
      </>
    )
  }
  
  
  
  private renderHighlight() {
    return ProductDetails.renderTwoColSection(
      "Highlights",
      this.state.productDetail.highlights,
      (data: any)=> data.map((highlight: any, i: number)=>(
        <li key={i}>{highlight}</li>
      ))
    )
  }
  
  private calculateRate1(price: string, discount: string) {
    let off = ((4 * Number(price) / 100))
    return Math.round(Number(price) - off)
  }
  
  private newPrice(price: number, discount: number) {
    let off =(Number(discount) * Number(price) ) / 100
    return (Number(price) - off).toFixed(2)
  }
}

const mapStateToProps = (state: RootStateType, p: any) => ({
  p: p,
  productDetails: state.productState.productDetails,
  isLoading: state.productState.isLoading,
  auth: state.auth,
  brands: state.productState.brands,
  cartProducts: state.productState.cartProducts,
  wishlist: state.productState.wishlist
})



export default connect(mapStateToProps, {
  fetchProduct,
  deleteProduct,
  clearProductDetails,
  toggleHandleCart,
  toggleHandleWishlist,
})(withParams(ProductDetails))

