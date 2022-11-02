import React from 'react';
import Preload from "UI/Preload/Preload";
import slugify from "../../../utils/slugify";
import fullLink from "../../../utils/fullLink";

const HomePageSidebar = (props) => {
    
    const {showBrands, handleClickOnBrand, handleShowAllBrands, fetchedHomePageSectionProduct } = props
    
    return (
        <div>
             <div className="">
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
              { fetchedHomePageSectionProduct["topDiscount"] && fetchedHomePageSectionProduct["topDiscount"]?.map(discountProd=>(
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
              { fetchedHomePageSectionProduct["topSales"] && fetchedHomePageSectionProduct["topSales"]?.map((discountProd: any, i: number)=> discountProd.sold > 0 && (
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
    );
};

export default HomePageSidebar;