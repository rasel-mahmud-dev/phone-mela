import React, {ReactEventHandler} from 'react'
import {connect} from "react-redux"
import {
  clearProductDetails,
  deleteProduct,
  fetchProduct, toggleHandleCart, toggleHandleWishlist
} from "src/store/actions/productAction"


import Loader from "UI/Loader/Loader";

// import ProgressBar from "react-topbar-progress-indicator";

// import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"

import "./product_details.scss"
import fullLink from "src/utils/fullLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart, faStar} from "@fortawesome/pro-solid-svg-icons";
import {RootStateType} from "store/index";
import { ProductDetailType} from "store/types/prouductReduceTypes";
import api from "apis/api";

import withParams from "../../../utils/withParams";
import Helmet from "react-helmet";
import {ProductType} from "reducers/productReducer";


interface Props {
  productDetails: any,
  isLoading: boolean,
  auth: object,
  fetchProduct: any
  params: {productId: string},
  toggleHandleCart: (arg0: ProductType, isShowPopup: boolean) => void,
  toggleHandleWishlist: (arg0: ProductType, isShowPopup: boolean) => void,
}
interface State {
  productDetail: ProductDetailType
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
        rate: 0,
        cover: "",
        created_at: "",
        description: "",
        discount: "",
        email: "",
        id: "",
        price: "",
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
      }
    }
  }
  
  settings = {
    infinite: true,
    speed: 800,
    autoplay: true,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 4,
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
      if(response.status === 200) {
      if (response.data.id) {
  
        let { attributes } = response.data
        try {
          attributes = attributes && JSON.parse(attributes)
        } catch (ex ){}
        
        this.setState((prevState: State): State => {
          return {
            ...prevState,
            productDetail: {
              ...prevState.productDetail,
              id: response.data.id,
              title: response.data.title,
              brand_id: response.data.brand_id,
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
        if(response.data.specification_id !== 0) {
          await this.fetchProductSpecification(response.data.specification_id)
        }
        await this.fetchProductReviews(response.data.id)
        await this.fetchProductQuestions(response.data.id)
      }
    }
    } catch(ex){
      console.log(ex)
    }
  }
  
  
  fetchProductSpecification = async (specificationId: string | number)=>{
    // fetch product product_specification
  
    const response2 = await api.get(`/api/specification/${specificationId}`)
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
            description: description,
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
  
    const response2 = await api.get(`/api/product_questions/${productId}`)
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
  
    const response = await api.get(`/api/reviews/${productId}`)
    if(response.status === 200){
      this.setState((prevState: State): State => {
          return {
            ...prevState,
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
    let subTotalRate = 0
    let totalAmount = 0
    this.rating.map(rate => {
      subTotalRate += (rate.rating * rate.amount)
      totalAmount += rate.amount
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
    return totalAmount
  }
  
  renderDetailSpecifications(specifications: any[]) {
    return (
      <div>
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
    
    return (
      <div>
        <div className="rating_ flex justify-between items-center">
          <div className="rating_left">
            <div className="flex items-center justify-center">
              <h1 className="big_rating_num ">
                {/*{this.calculateRate()}*/}
                {this.state.productDetail.rate}
              </h1>
              <FontAwesomeIcon icon={faStar} className="text-4xl text-dark-800"/>
            </div>
            <div className="total_rating_count">
              <h2>{this.totalRating()} ratings</h2>
              <h2>&</h2>
              <h2>{10} reviews</h2>
            </div>
          </div>
          <div className="rating_right">
            {this.rating.reverse().map(rate => (
              <div className="flex items-center">
                  <span className="flex items-center">
                    <span className="text-dark-800 text-[13px] font-normal" style={{width: "10px"}}>{rate.rating} </span>
                    <FontAwesomeIcon className="text-dark-800 text-[13px] font-normal" icon={faStar}/>
                  </span>
                <div className="rating_bar ml-2">
                  <span style={{width: ((rate.amount * 100) / this.totalRating()) + "%"}} className="color_bar"/>
                </div>
                <span className="total_rating_num  ml-2 w-50">
                    <span className="text-dark-800 text-[13px] font-normal">{rate.amount}</span>
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
      </div>
    )
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
    
    const { productDetail} = this.state
    

    return (
      <div className="container-1200 px-4 product_detail_page bg-white">
  
      
  
        {/*{ props.isLoading && <ProgressBar /> }*/}
        {/*<Button*/}
        {/*  onClick={pushBack}*/}
        {/*  theme="red"*/}
        {/*  iconStyle={{marginRight: "5px"}}*/}
        {/*  waves="green" color="white" flat*/}
        {/*  icon="fal fa-arrow-left">Back</Button>*/}
      
        {/*<h1>Details</h1>*/}
        {/*{isLoading && <Loader isLoading={isLoading} style={{top: "100px"}}/>}*/}
     
        {productDetail && productDetail.id && (
        
          <div className="product_detail ">
  
            <Helmet>
              <link rel="canonical" href={`https://phone-mela.vercel.app/#/product/${productDetail.title}/${productDetail.id}`} />
              <title>{productDetail.title} on https://phone-mela.vercel.app</title>
              {/*<meta*/}
              {/*  name="description"*/}
              {/*  content="Get stats about every music from every movie"*/}
              {/*/>*/}
              {/*<meta*/}
              {/*  name="keywords"*/}
              {/*  content="Music, Audio, Lyrics"*/}
              {/*/>*/}
            </Helmet>
  
  
            <div className="product_cover flex-2">
            
              <div>
              
                <div className="flex" style={{flex: 10}}>
                  <div className="cover_root">
                  
                    <div>
                      <img src={fullLink(productDetail.cover)} alt=""/>
                    </div>
                
                  </div>
                
                  <div className="product_cover_thumbs">
                    {new Array(10).fill("1").map(item => (
                      <div>
                        <div className="thumb_pic">
                          <img src={fullLink(productDetail.cover)} alt=""/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button onClick={()=>this.props.toggleHandleCart(productDetail as any, true)} className="bg-secondary-400 font-normal text-white text-xl px-4 py-2 mr-1">Add to Cart</button>
                  <button  className="bg-primary-400  font-normal text-white text-xl px-4 py-2">Buy Now</button>
                </div>


              </div>
  
    
              <div className="heart_btn">
                <FontAwesomeIcon onClick={()=>this.props.toggleHandleWishlist(productDetail as any, true)}  icon={faHeart}/>
              </div>
  
             
              
            </div>
            
            <div className="flex flex-col flex-5">
              <h1 className="big_title">{productDetail.title}</h1>
              <div>
                <h4>1,50,723 Ratings & 7,095 Reviews</h4>
              </div>
  
              <div>
                <h1 className="mt-4">
                  TK {this.newPrice(productDetail.price, productDetail.discount)}
                  <span className="text-sm ml-2 text-gray-400 line-through text-secondary-400">{productDetail.price}</span>
                  <span className="text-sm ml-2 font-medium text-primary-400 ">{productDetail.discount}% off</span>
                  {/*<span>{productDetail}</span>*/}
                </h1>
                {/*<h2>{productDetail.discount}</h2>*/}
              </div>
  
              <div className="sec ">
                <h1>vivo</h1>
                <span>1 Year Warranty for Mobile and 6 Months for Accessories Know More</span>
              </div>
  
              <div className="sec ">
                <h1>Seller</h1>
                <ul>
                  <li>PETILANTE Online 4.7</li>
                  <li>7 Days Replacement Policy?</li>
                  <li>GST invoice available?</li>
                </ul>
              </div>
  
  
              <div className="sec">
                {ProductDetails.renderTwoColSection("Color variant",
                  this.state.productDetail.colors,
                  (colors: {v: string, url: string}[])=> <ul className="color_image_gallery">
                    { colors.map((color: any) => (
                      <li>
                        <img src={fullLink(color.url)} alt=""/>
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
                    <div className="text-gray-900 text-sm">
                      {
                        data.map((d: string, i: number)=>
                          <li className="list-disc ml-3 mt-1" key={i}>{d}</li>
                        )
                      }
                    </div>
                  )
                )}
              </div>
              
              <div className="sec ">
                {ProductDetails.renderTwoColSection("Description",
                this.state.productDetail.description,
                  (description: any)=> <p className="text-gray-900 text-sm">{description}</p>
                )}
              </div>
              
              <div className="sec">
                <h1>Product Description</h1>
                {productDetail.specifications && this.renderDetailSpecifications(productDetail.specifications )}
              </div>
  
              <div className="sec">
                <h1>Disclaimer</h1>
                <p>We can not guarantee that the information on this page is 100% correct. Read more</p>
              </div>
  
              <div className="sec">
                <h1>Questions and Answers</h1>
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
                <button className="hover:text-primary-400 text-[14px] font-normal">All questions</button>
                
                
              </div>
      
  
  
              <div className="sec">
                <div className="flex justify-between items-center">
                  <h1>All User Opinions and Reviews</h1>
                  <button className="btn bg-primary-400 text-white">Rate This</button>
                </div>
                <h2 className="mt-5 text-[15px] font-normal">{productDetail.title} - USER OPINIONS AND REVIEWS AND RATINGS</h2>
              </div>
  
              <div className="sec">
                {this.renderRatings()}
              </div>
  
              <div className="mt-8">
  
                { productDetail.reviews &&  productDetail.reviews.map(review=>(
                  <div className="border-b border-gray-200 py-4">
                    
                    <h1>{review.title}</h1>
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
                      <img onError={this.handleError} className="w-4 mr-1" src={fullLink(review.customer_avatar)} alt="" />
                      <h4 className="text-[13px]">
                        <span className="font-normal">PhoneMela Customer { review.customer_name }</span>
                        <span className="ml-8">{new Date(review.created_at).toDateString()}</span>
                      </h4>
                    </div>
                    
                  </div>
                )) }
                
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
      <div className="flex">
        <h1 className="text-dark-300 font-normal text-[14px]  min-w-[150px]">{name}</h1>
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
      </div>
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
  
  private newPrice(price: string, discount: string) {
    let off = ((4 * Number(price) / 100))
    return Math.round(Number(price) - off)
  }
}

const mapStateToProps = (state: RootStateType, p: any) => ({
  p: p,
  productDetails: state.productState.productDetails,
  isLoading: state.productState.isLoading,
  auth: state.auth
})



export default connect(mapStateToProps, {
  fetchProduct,
  deleteProduct,
  clearProductDetails,
  toggleHandleCart,
  toggleHandleWishlist,
})(withParams(ProductDetails))

