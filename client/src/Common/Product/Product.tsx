import React, {FC} from 'react';
import fullLink from "../../utils/fullLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faHeart, faLayerGroup, faStar} from "@fortawesome/pro-regular-svg-icons";


import {CartProductType, ProductType, WishList} from "reducers/productReducer";
import brokenImg from "../../asserts/images/no-img.png";
import slugify from "../../utils/slugify";
import Preload from "UI/Preload/Preload";

interface ProductComponentProps{
  prod: ProductType,
  cartProducts: CartProductType[],
  wishlist: WishList[],
  fields?: string[],
  handleAddToCart: (prod: ProductType)=> void,
  handleToggleWishlist: (prod: ProductType) => void
}

function calculatePrice(price: number, discount?: number) {
  if(discount){
    let off = (price * discount) / 100
    return  price - off
  } else {
    return price
  }
}

const Product:FC<ProductComponentProps> = (props) => {
  const {
    prod,
    fields,
    // handleLoadError, isInWished, isInCart,
    cartProducts,
    wishlist,
    handleAddToCart,
    handleToggleWishlist
  } = props
  
  const isInCart=(_id: string)=> {
    let i = cartProducts.findIndex(cp=>cp.product_id === _id)
    return i !== -1
  }
  
  const isInWished=(_id: string)=> {
    let i = wishlist.findIndex(cp=>cp.product_id === _id)
    return i !== -1
  }
  
  function handleLoadError(e) {
    e.target.src = brokenImg
    // baseUri + "/images/no-img.png"
  }
  
  
  function renderStar(rate: number){
    return <div className="bg-primary-400 text-white font-normal flex items-center px-2 py-1 my-1 rounded">
      <FontAwesomeIcon className="text-xs mr-1" icon={faStar} />
      <span className="text-xs leading-none">{rate}</span>
    </div>
  }
  function renderDiscount(field: string | number){
    return <h1 className="text-primary-400 text-sm font-normal">{field}% off</h1>
  }
  
  function renderCreatedTime(createdAt: Date){
    return <h4 className="my-1 text-center mt-2 text-dark-800 text-[13px] font-normal">Added on {new Date(createdAt).toLocaleDateString()}</h4>
  }
  function renderTotalSold(sold: number){
    return <h4 className="my-1 text-center mt-2 text-primary-700 text-[13px] font-normal">{sold} items sold</h4>
  }
  
  function renderProductAttr(attr: string, prod: ProductType) {
    if (attr === "discount") {
      return renderDiscount(prod.discount)
    }
    if (attr === "rate") {
      if (prod.averageRate) {
        return renderStar(prod.averageRate)
      }
      
    }
    if (attr === "createdAt") {
        return renderCreatedTime(prod.createdAt)
    }
    if (attr === "sold") {
        return renderTotalSold(prod.sold)
    }
  }
  
  
  const render = React.useMemo(()=>(
    <div key={prod._id} className="home_product_item text-initial text-decoration-none">
      <div className="product_badge">
        {new Date().getTime() - new Date(prod.createdAt).getTime() <= 5162345523  && <span>New </span> } {/*30 Days */}
        {/*{ console.log(new Date().getTime() - new Date(prod.created_at).getTime(), new Date().getTime()) }*/}
      </div>
    
      <div className="product_cover">
        <Preload to={`/product/${slugify(prod.title)}/${prod._id}`}>
          <img onError={handleLoadError} src={fullLink(prod.cover)} className="flex"  alt={prod.cover}/>
        </Preload>
      
        {/*  Floating image wrapper   */}
        <div className="hover_image_cover cursor-pointer"/>
    
      </div>
      <h3 className="item__title text-center">
        <Preload to={`/product/${slugify(prod.title)}/${prod._id}`} >
          {prod.title}
        </Preload>
      </h3>
  
      {fields && fields.map((field: string)=>(
        <div>
          {renderProductAttr(field, prod)}</div>
      )) }
      
      {/*<div className="flex items-center">*/}
      {/*  <div className="product_rating">*/}
      {/*    <FontAwesomeIcon icon={faStar} />*/}
      {/*    <FontAwesomeIcon icon={faStar} />*/}
      {/*    <FontAwesomeIcon icon={faStar} />*/}
      {/*    <FontAwesomeIcon icon={faStar} />*/}
      {/*    <FontAwesomeIcon icon={faStar} />*/}
      {/*  </div>*/}
      {/*  <span className="text-xs font-normal ml-2 text-dark-600">(10)</span>*/}
      {/*</div>*/}
    
    
      <div className="discount_price mt-0">
        <strong className="new_price">{calculatePrice(prod.price, prod.discount)}.TK</strong>
        {prod.discount ? <div className="discount">{prod.discount}% off</div> : '' }
      </div>
  
      {prod.discount ? <strong className="old_price">{prod.price}.TK</strong>:''}
      
    
      {/* Hover content  */}
      <div className="mt-4 hover_content">
      
        {/* Floating buttons */}
        <div className="floating_btns">
        
          <div className="floating_btns_item">
            <Preload to={`/product/${slugify(prod.title)}/${prod._id}`}>
              <FontAwesomeIcon icon={faEye} />
            </Preload>
          </div>
        
          <div className="floating_btns_item">
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>
        
          <div
            className={["floating_btns_item", isInWished(prod._id) ? "bg-primary-400 text-white floating_btns_item__active" : ""].join(" ")}
            onClick={()=>handleToggleWishlist(prod)}>
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      
        <button onClick={()=>handleAddToCart(prod)}
                className="add_to_cart_btn m_btn bg-primary-400 text-xs rounded-2xl px-4 py-2 text-white font-normal">
          { isInCart(prod._id) ? "REMOVE FROM CART" : "ADD TO CART" }
        </button>
    
      </div>
  
    </div>
  ), [prod, wishlist, cartProducts])
  
  return render;
};

export default Product;