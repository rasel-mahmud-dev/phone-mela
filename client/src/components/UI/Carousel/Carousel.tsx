import React from 'react';
import "./styles.scss"
import {faAngleLeft, faAngleRight} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Lazy } from "swiper";
// Import Swiper styles

import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper styles
import 'swiper/css';

const Carousel = (props) => {
  const   {children} = props
  
  return (
    <Swiper
      slidesPerView={'auto'} // slider image width as slider-container content width not root container width
      lazy={true}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Lazy, Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {  children && children.map(c=>(
        <SwiperSlide>{c}</SwiperSlide>
      ))}
  
    </Swiper>
  )
  
  
  
  
  
  
  
  
  // const   {children} = props
  //
  // const [state, setState] = React.useState({
  //   itemWidth: 0,
  //   items: 0,
  //   left: 0,
  //   gone: 0
  //   // scroll: ""
  // })
  //
  // const carouse_root = React.useRef()
  //
  // React.useEffect(()=>{
  //   let offsetWidth  = (carouse_root.current as HTMLDivElement).offsetWidth
  //   setState({...state, itemWidth: offsetWidth, items: children.length})
  // }, [])
  //
  //
  // function changeNextImage(){
  //   let updatedState = {...state}
  //   if((updatedState.gone + 1) === children.length) {
  //     /// revert start
  //     updatedState.left = 0
  //     updatedState.gone = 0
  //   } else {
  //     updatedState.left = updatedState.left + updatedState.itemWidth
  //     updatedState.gone += 1
  //   }
  //   setState(updatedState)
  // }
  //
  // function changePrevImage(){
  //   let updatedState = {...state}
  //   if(updatedState.gone === 0) {
  //     /// revert start
  //     updatedState.left = (children.length - 1) * updatedState.itemWidth
  //     updatedState.gone = children.length - 1
  //   } else {
  //     updatedState.left = updatedState.left - updatedState.itemWidth
  //     updatedState.gone -= 1
  //   }
  //   setState(updatedState)
  // }
  //
  //
  // return (
  //   <div className="carousel_root_wrapper relative" ref={carouse_root}>
  //
  //     <button className="left_carousel" onClick={changePrevImage}>
  //       <FontAwesomeIcon icon={faAngleLeft} className="" />
  //     </button>
  //
  //     <div className="carousel_root" >
  //       <div className="carousel_ flex relative" style={{left: -state.left + "px"}} >
  //         { children.map((chid, i)=>(
  //           <div key={i} style={{minWidth: state.itemWidth + "px"}} className="carousel_item">
  //             { chid }
  //           </div>
  //         )) }
  //       </div>
  //     </div>
  //     <button className="right_carousel" onClick={changeNextImage}>
  //     <FontAwesomeIcon icon={faAngleRight} className="absolute right-0" />
  //     </button>
  //   </div>
  // );
};

export default Carousel;