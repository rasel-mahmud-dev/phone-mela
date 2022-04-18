import React from "react";
import Item from "./Item"
import SubMenu from "./SubMenu"


interface MenuProps {
  selectedKeys?: string[]
  defaultOpenKeys?: string[]
  onClick?: any
  children: any
  inline?: boolean
  style?: CSSStyleSheet
}


class Menu extends  React.Component<MenuProps, any>{
  static Item = Item
  static SubMenu = SubMenu
  
  renderItems = ()=>{
    
    const {selectedKeys, inline, defaultOpenKeys, onClick, children, style={},...attributes} = this.props
    if(this.props.children.length > 0){
      return this.props.children.map(ch=>{
        if(ch){
          return ch.type && ch.type.displayName === "SubMenu" ? (
            <SubMenu
              {...ch.props}
              key={ch.key}
              id={ch.key}
              inline={inline}
              selectedKeys={selectedKeys}
              defaultOpenKeys={defaultOpenKeys}
              children={ch.props.children}
            />
          ) : ch.type && ch.type.displayName === "Item" ? (
            <Item
              {...ch.props}
              key={ch.key}
              id={ch.key}
              inline={inline}
              selectedKeys={selectedKeys}
              defaultOpenKeys={defaultOpenKeys}
            />
          ) : ch
        }
      })
    } else {
      if (children) {
        if (children.type) {
          return children.type.displayName === "SubMenu"
            ? <SubMenu
              {...children.props}
              key={children.key}
              id={children.key}
              inline={inline}
              selectedKeys={selectedKeys}
              defaultOpenKeys={defaultOpenKeys}
             />
            : children.type.displayName === "Item"
              ? (
                <Item
                  {...children.props}
                  key={children.key}
                  id={children.key}
                  inline={inline}
                  selectedKeys={selectedKeys}
                  defaultOpenKeys={defaultOpenKeys}
                />
              )
              : children
        }
      }
    }
  }
  
  render(){
  
  const {style={}} = this.props
    
    return (
      <div style={style} className={["menu", this.props.inline && "menu_inline--mode"].join(" ")}>
        {this.renderItems()}
      </div>
    )
  }
}

export default Menu



// import React from "reactTools";
// import "./HomePage.styles"
// import {log, log2} from "src/response"; 
// import {ACTION_TYPES} from "store/types"
// import {connect, useDispatch} from "reactTools-redux"
// import JSONLOG from "src/response/JSONLOG";
// import axios from "axios"         
// import api from "apis"
// import { Link, useHistory } from "reactTools-router-dom"
// import { fetchProducts, fetchHomePageSectionProducts } from "actions/productAction.ts"
// import { addToCart } from "actions/cartAction"
// import {Button, Divider, Image, Spin, Carousel, Popup, Menu} from "src/components/UI"
// import apis, { backend } from "src/apis/index.ts" 
// import {closeNotify} from "actions/appAction"
// import { isEn} from "src/lang"
// let id; 

// const { SubMenu } = Menu

// const HomePageProductNav = () => { 
//   const data = [
//       {name: 'Top Offer', logo: "", id: "kj98759e347"},
//       {
//         name: 'Computers', logo: "", id: "computers", 
//         sub_menu: [
//           {
//             name: 'Computer Components', 
//             logo: "", 
//             id:"computer components",
//             sub_menu: [
//               {"name": "Motherboard", id: "motherboard"},
//               {"name": "Ram", id: "ram"},
//               {"name": "Processor", id: "processor"},
//               {"name": "SSD", id: "ssd"},
//               {"name": "Powesupply", id: "powersupply"},
//               {"name": "Casing", id: "casing"}  
//             ]
//           },
//           {
//             "name": "Desktop PCs", 
//             "id": "desktop pcs",
//             "sub_menu": [
//               {"name": "All In One PCs", "id": "all in one pc"},
//               {"name": "Mini PCs", "id": "mini pcs"},
//               {"name": "Tower PCs", "id": "tower pcs"}
//             ]
//           },  
//         ]
//       },
//       // {name: 'Mobiles', logo: "", id: "mobile accessories", cat_tree: "mobile"},
//       // {name: 'Television', logo: "", id: "home entertainment", cat_tree: "televisions"},
//       // {name: 'Clothes', logo: "", id: "clothing and accessories"},
//       // {name: "Home Entertainment", id: "home entertainment"},
//       // {name: "Home & Kitchen", id: "home & kitchen"},
//       // {name: 'Gloses', logo: "", id: "kj98e759347"},
//     ]
    
//     const [openItemId, setOpenItemId] = React.useState(-1)
//     const [subMenuIds, setSubMenuIds] = React.useState([])
    
    
//     function handleMouseDown(id, type){
//       if(type === "enter"){
//         setOpenItemId(id)
//       } else {
//         setOpenItemId(-1)
//         setSubMenuIds([])
//       }
//     }
    
//     function handleClickSubMenu(subMenuId, type){
//       if(type === "enter"){
//         setSubMenuIds(subMenuIds.indexOf(subMenuId) !== -1 ? [] : [subMenuId])
//       } else{
//         setSubMenuIds([])
//       }
//     } 
    
    
//     function renderAuthMenu(d){ 
//       const popupStyle = {
//         position: "absolute",
//         zIndex: 100,
//         right: "50%",
//         transform: `translateX(50%)`
//       }
//       let sub = d 
//       if(sub && sub.sub_menu){
//         return (
//           <Popup style={popupStyle} bg="white" p='0' inProp={d.id === openItemId ? true: false}>
//             <Menu 
//               selectedKeys={["mail"]} 
//               defaultOpenKeys={subMenuIds}
//               >
//               { sub.sub_menu.map((s)=>(
//                 s.sub_menu ? (
//                   <SubMenu 
//                     key={s.id}
//                     onMouseOver={()=>handleClickSubMenu(s.id, "enter")} 
//                     onMouseLeave={()=>handleClickSubMenu(s.id, "leave")} 
//                     title={
//                       <span>
//                         <i className="fa fa-heart" />
//                         <span>{s.name}</span>
//                       </span>
//                     }>
//                     {s.sub_menu && s.sub_menu.map(nsb=>(
//                       <Menu.Item 
//                         key={nsb.id}>
//                         <Link 
//                           to={`/p?cat=${nsb.id}&cat_tree=${d.id}`}>
//                           {nsb.name}
//                         </Link>
//                       </Menu.Item>
//                     ))}
                    
//                   </SubMenu>  
//                 )  : (
//                 <Menu.Item 
//                   icon="fa fa-heart"
//                   key={s.id}>
//                   <Link to={`/p?cat=${s.id}&cat_tree=${d.id}`}>{s.name}</Link>
//                 </Menu.Item>
//                 )
//               ))
//               }
//             </Menu>
//           </Popup>
//         )
//       }
//     }
//   return (
//     <div className="home_page_product_nav">
//       { data.map((d, i)=>(
//         <li 
//           onMouseLeave={()=>handleMouseDown("", "leave")} 
//           onMouseOver={()=>handleMouseDown(d.id, "enter")} 
//           className="home_page_product_nav--item">
//           <Image size={100}/>
//           <h4 className="item_name">
//             <Link to={`/p?cat=${d.id}&${d.cat_tree ? 'cat_tree='+ d.cat_tree: ''}`}>{d.name}</Link>
//             <i class="fa fa-angle-down ml-3"/>
//           </h4>
//           { renderAuthMenu(d)}
//         </li>
//       ))
//       }
//     </div>
//   )
  
// }


// const HomePage = (props) => { 
//   const dispatch = useDispatch()
//   const history = useHistory()
  
//   const {
//     homePageSectionData, 
//     homePageSectionProducts: productSectionsWithProduct, 
//     products,
//     loadingStates,
//     paginations,
//     fetchedData
//   } = props.productState
  
//   const { selectedLang,lang } = props.appState

//   const [pagination, setPagination] = React.useState({perSection: 2, sectionNumber: 1})

//   function loadMoreSection(where){ 
//     dispatch({
//       type: ACTION_TYPES.UNLOCK_FETCHED_DATA,
//       payload: "home_page"
//     })
    
//     dispatch({
//       type: ACTION_TYPES.CHANGE_PAGINATION,
//       payload: {where}
//     })
//   }

//   function handler(e){
//     let top = document.body.scrollTop || document.documentElement.scrollTop
//     return top
//   }
  
  
//   React.useEffect(()=>{  
//     let fetchedDataa =  fetchedData.find(fd=>fd.where === "home_page") 
//     if(!fetchedDataa.isFetched) {
//       props.fetchHomePageSectionProducts()
//     } else {
//       // log2(fetchedDataa)
//     }
//   }, [paginations]) // with watch when change paginations currentPage


//   function handleScroll(e){
//   // let el = e.target
//   // let offsetTop  = handler(e)
//   // let tscroll = (el.scrollTop + el.clientHeight)
//   // let sum = e.target.scrollHeight - tscroll

//   // if(sum <= 0){
//   //   setPagination({
//   //     ...pagination,
//   //     sectionNumber: pagination.sectionNumber + 1
//   //   })  
//   // }
// }
  
  
//   async function handleMoreItem(sectionName, obj){
//     // let old = {...productSectionsWithProduct} 
//     // let res;
//     // if(obj[sectionName].type === "categories" || obj[sectionName].type === "brands"){
//     //     // fetch more category or brand without change route 
//     //     // this means ... remove more item down this section  
      
//     //   if(obj[sectionName].type === "categories"){
//     //     res = await api.get("/api/categories") 
//     //     old[sectionName].values.push(...res.data.categories) 
//     //   } else {
//     //     res = await api.get("/api/brands") 
//     //     old[sectionName].values.push(...res.data.brands) 
//     //   }
   
//     //   let arr = [...old[sectionName].values] 
//     //   let uniqArr = []
//     //   for(let i=0; i<arr.length; i++){
//     //     if(uniqArr.findIndex(p=>p._id === arr[i]._id  )  === -1 ) {
//     //       uniqArr.push(arr[i])
//     //     }
//     //   }
//     //   old[sectionName].values = uniqArr
//     //   setProductSectionsWithProduct(old)
//     // }
//   }
  

  
//   function renderProduct(product){
//     return (
//       <div className="product">
//         <Image />
//         <h5 className="product_name">{product.title}</h5>
//         <h5 className="product_price">${product.price}</h5>
//         <Button onClick={()=> handleAddToCart(product)}>Add To Cart</Button>
//         <Link to={`/products/${product._id}`}>Details</Link>
//       </div>
//     )                  
//   }
  
//   function handleJumpOneTypeProductPage(sectionName, productSectionsWithProduct){
//     let n;
    
//     homePageSectionData.map(item=> {
//       if(item.name === sectionName && !item.id){
//         history.push(`/prod/${item.name}/${item.type}/${item.filterBy}`)
//       } else if(item.name === sectionName && item.id){ 
//         history.push(`/products/?slug=${item.name}&type=${item.filterBy}&id=${item.id}`)
//       }
    
//     } )
    
//   }
  
  
  
//   function renderLoader(where, btnLabel, handler){
//     let loadingState = loadingStates.find(ls=>ls.where === where)  
//     if(loadingState){
//       return (
//         <div style={{textAlign: "center"}}>
//           { loadingState && loadingState.isLoading 
//             ? <Spin size={20} />
//             : <Button onClick={()=>handler(where)}>{btnLabel}</Button>
//           }
//         </div>
//       )
//     }
//   }
  
  
//   //! this a Bug 
//   function handleAddToCart(pp){
//     props.closeNotify()
//     props.addToCart(pp)
//   }
  
//   function onChange(){
    
//   }
  
//   function renderSectionName(sectionName){ 
//     switch(sectionName){
//       case "Top Selling Products":
//         return "besi bicroy kora ponnno" 
      
//       case "Top Popular Products":
//         return lang.top_popular_products
        
//       case "Shop By Categories":
//         return "kena kata dara category"
        
//       case "Shop By Brands":
//         return lang.shop_by_brands
        
//       default: 
//         return sectionName
//     }
    
//   }
  
//   const contentStyle = {
//     height: '460px',
//     color: '#fff',
//     lineHeight: '460px',
//     textAlign: 'center',
//     background: '#364d79',
//   };
  
//   function renderPrevBtn(){
//     return (
//       <div className="carousel-btn">
//         <i className="fa fa-angle-left" />  
//       </div>    
//     )
//   }
//   function renderNextBtn(){
//     return (
//       <div className="carousel-btn">
//         <i className="fa fa-angle-right" />  
//       </div>    
//     )
//   }
  
  
//     return (
//       <div className="homepage">
//       <HomePageProductNav/>  
//       <div className="homepage_slider">
//         <Carousel 
//             afterChange={onChange} 
//             renderPrevBtn={renderPrevBtn} 
//             renderNextBtn={renderNextBtn} 
//             >
//           <div>
//             <h3 style={contentStyle}>1</h3>
//           </div>
//           <div>
//             <h3 style={contentStyle}>2</h3>
//           </div>
//           <div>
//             <h3 style={contentStyle}>3</h3>
//           </div>
//           <div>
//             <h3 style={contentStyle}>4</h3>
//           </div>
//         </Carousel>
//       </div>
      
//         <div className="r" onScroll={handleScroll}>

//             <div className="hero_slider">
//                 <div className="image_cover">
//                     <img src={backend + "/a.png"} alt={backend + "/a.png"}/>

//                 </div>
//             </div>

//           <div  className="container"> 
        
//             { Object.keys(productSectionsWithProduct) && Object.keys(productSectionsWithProduct).map(sectionName=>(
//               <>
//               <div className="product_section_header">
//                   <h1>{ isEn(selectedLang) ? sectionName : renderSectionName(sectionName)}</h1>
//                   { productSectionsWithProduct[sectionName].type === "products" 
//                     && <Button></Button>
//                   } 
//                   <Button onClick={()=>handleJumpOneTypeProductPage(sectionName, productSectionsWithProduct)}>{ isEn(selectedLang) ? 'More' : lang.more } </Button>
//                 </div>

    
//               <div className="products_slider">
//                   {productSectionsWithProduct[sectionName] && productSectionsWithProduct[sectionName].values.length > 0 ? productSectionsWithProduct[sectionName].values.map(pp=>(
//                     <div className="product">
//                       <Image />
//                       <Link to="">
//                         <h4>{ 
//                         productSectionsWithProduct[sectionName].type === "categories" 
//                         ? pp.name
//                         : productSectionsWithProduct[sectionName].type === "brands" 
//                         ? pp.name 
//                         : pp.title
                          
//                         }</h4>
//                       </Link>
//                       { productSectionsWithProduct[sectionName].type === "products" 
//                       && (
//                         <>
//                           <h5 className="product_price">${pp.price}</h5>
//                           <Button onClick={()=>handleAddToCart(pp)}>{ isEn(selectedLang) ? 'Add To Cart': lang.add_to_cart}</Button>
//                           <Link className="product-detail-link" to={`/products/${pp._id}`}> { isEn(selectedLang) ? 'Details' : lang.details}</Link> 
//                         </>
//                       )
//                       }
//                     </div>
//                   )) : <h1>{
//                           isEn(selectedLang) 
//                           ? "No Product Found"
//                           : lang.no_product_found }
//                         </h1> }
//               </div>
//             { /* productSectionsWithProduct[sectionName].type !== "products" 
//               && (
//                   <div style={{textAlign: "center"}}>
//                   { loadState === "load-start" 
//                   ? <Spin size={20} />
//                   : <Button onClick={()=>handleMoreItem(sectionName, productSectionsWithProduct)} >Load More</Button>
//                   }
//                   </div>
//               )
//             */ } 
//               </>
            
//             ))  }
            
//             {/* This is Home Page Section Loading State Loading State   */}
//           {renderLoader("home_section", "Load More Section", loadMoreSection)}

     
//           </div>
          

//         </div>
//         </div>
//     )

// }

// function mapStateToProps(state){
//   return {
//     appState: state.appState,
//     productState: state.productState
//   }
// }

// export default connect(mapStateToProps, {
//   fetchProducts,
//   fetchHomePageSectionProducts,
//   addToCart,
//   closeNotify
// })(HomePage)   

