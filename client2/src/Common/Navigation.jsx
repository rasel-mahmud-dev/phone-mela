import React from 'react'
import {connect, useDispatch} from "react-redux"
import { logout } from 'src/store/actions/authAction'
import logo from "src/asserts/icon/log-white.svg"

import "./Navigation.scss"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars, faSearch, faShoppingBag, faShoppingCart, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {faSignOutAlt, faUserAlt, faHeart, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {faSignIn} from "@fortawesome/pro-brands-svg-icons";
import {faAdn, } from "@fortawesome/free-brands-svg-icons";
import fullLink from "../utils/fullLink";
import Modal from "UI/Modal/Modal";
import {faFilter} from "@fortawesome/pro-solid-svg-icons";
import {toggleSearchBar, toggleSideBar} from "actions/toolsAction";

import {onFilterSearchChange, onSearchChange} from "actions/productAction";

const Navigation  = (props)=>{
  
  const { auth, totalCartProducts, isOpenSearchBar, search } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  
  const [ isShow_authMenuPanelId, set_authMenuPanelId ] = React.useState(null)
  const [expandDropdown, setExpandDropdown] = React.useState("")
  const [showSearchBar, setShowSearchBar] = React.useState(false)


  const  searchInputRef = React.useRef()
  
  function toggleAuthMenuPanel(e){   
    if(e.target.dataset.set === isShow_authMenuPanelId){
      set_authMenuPanelId(null)
    }else{
      set_authMenuPanelId(e.target.dataset.set ? e.target.dataset.set : null)
    }
  }
  
  function authDropdown(isShow) {
    
    function logoutRoutePush(s) {
        props.logout((err)=>{
          if(!err){
            navigate("/")
          }
        })
    }
  
    function handleSetExpandDropdown(s) {
    
    }
  
    let callback = location.pathname + location.search
  
    
    return isShow && (
      <div className="dropdown_nav shadow-md">
        <ul className="min-w-[300px] bg-white text-sm font-normal">
          { auth.isAuthenticated ? (
            <>
              { auth.role === "admin" && (
                <li className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-2">
                  <FontAwesomeIcon icon={faAdn} className="mr-2 text-gray-800" />
                  <Link className="font-normal" onClick={()=>handleSetExpandDropdown("")}  to="/admin/dashboard">Dashboard</Link>
                </li>
              ) }

              <li className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-2">
                <Link className="text-sm font-normal" to={`/auth/customer`}>
                 <FontAwesomeIcon icon={faUserAlt} className="mr-2 dark_title text-gray-800" />
                Profile
                </Link>
              </li>
  
  
              <li  className="flex hover:bg-opacity-40 hover:bg-primary hover:text-white cursor-pointer px-2 py-2">
                <Link className="" to={`/wishlist`}>
                  <FontAwesomeIcon icon={faHeart} className="mr-2 dark_title text-gray-800 block w-10" />
                  Your Wishlist
                </Link>
              </li>
              
              
              <li  className="flex hover:bg-opacity-40 hover:bg-primary hover:text-white cursor-pointer px-2 py-2">
                <Link className="" to={`/cart`}>
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2 dark_title text-gray-800" />
                  Your Cart
                </Link>
              </li>
              
              
              <li onClick={()=> logoutRoutePush("/user/profile") } className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-2">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 dark_title text-gray-800" />
                Logout
              </li>
            </>
          ) : (
            <li
              className="flex flex-1 items-center hover:bg-primary hover:bg-opacity-40 hover:text-white  cursor-pointer  px-2 py-2"
              // onClick={()=> pushRoute("/auth/login") }
            >
              <Link className="block" to={`/auth/login?callback=${callback}`}><FontAwesomeIcon  className="mr-2 text-gray-800" icon={faSignIn} />Login</Link>
            </li>
          )
          }
        </ul>
      </div>
    )
  }
  function loadErrorAvatar(e){
    const div = document.createElement("h1")
    div.innerHTML = `
       <div class="w-6 h-6 rounded-full bg-gray-300  dark:bg-primary shadow-md flex justify-center items-center">
        <span class="text-sm font-medium">${auth.username[0].toUpperCase()}</span>
      </div>
    `
    e.target.parentNode.appendChild(div)
    e.target.remove()
  }
  function handleSetExpandDropdown(s) {
    setExpandDropdown(s)
  }
  function openMenuHandler() {
  
  }
  
  React.useEffect(()=>{
    setShowSearchBar(!!search)
  }, [])
  
  React.useEffect(()=>{
    showSearchBar && callBack()
  }, [showSearchBar])
  
  const callBack = () => {
    searchInputRef.current && searchInputRef.current.focus()
  };
  
  function openSearchPanel(){
    setShowSearchBar(!showSearchBar)
  }
  
  function renderSearchBar(){
    return (
      <div className="search_input_wrapper">
        <input type="text" placeholder="Enter Search Products"/>
      </div>
    )
  }
  
  function handleSearch(e){
    e.preventDefault()
    // let val = searchInput.current?.value
    dispatch(onFilterSearchChange(search))
    if(search !== "") {
      navigate("/q/?search=" + search)
    }
  }
  
  
  function onChangeSearch(e){
    if(e.target.value === ""){
      dispatch(onFilterSearchChange(""))
      dispatch(onSearchChange(""))
      navigate("/q")
    } else {
      dispatch(onSearchChange(e.target.value))
    }
  }
  
  function handleToggleSidebar(){
    dispatch(toggleSideBar({
      where: "homePage",
      isOpen: null
    }))
  }
  
  
  return (
    <>
      <div  className="navigation select-none" >
        <div className="container-1200 flex-1 px-3">
          <div className="main_nav">
            
            <div className="left_nav flex-1 md:flex-2 lg:flex-8" >
              
              <FontAwesomeIcon onClick={handleToggleSidebar} className="block md:hidden text-xl text-white mr-2" icon={faBars} />
              
               <Link to="/" className="flex items-center text-decoration-none text-initial">
                 <div className="logo_image">
                   <img className="" src={logo} alt=""/>
                 </div>
               </Link>
                {/*<Preload exact to="/"><Button waves="green" text>Home</Button></Preload>*/}
            
            </div>
            
            {/*<div className="center_nav">*/}
              {/*<li className="nav_item">*/}
                {/*<FontAwesomeIcon icon={faSearch} />*/}
                {/*<img className="logo_image" src={logo} alt=""/>*/}
                {/*<h4>Mobile-Store</h4>*/}
                {/*<Preload exact to="/"><Button waves="green" text>Home</Button></Preload>*/}
              {/*</li>*/}
            {/*</div>*/}
  
            <div className="right_nav flex-2 md:flex-4 lg:flex-2  justify-content-end">
              
              { ((search && showSearchBar) || showSearchBar) && (
                <div className="w-full">
                  <div className="floating_search">
                    <div className="input_wrapper">
                      <form onSubmit={handleSearch} className="w-full">
                        <input ref={searchInputRef} value={search} onChange={onChangeSearch} type="text" placeholder="Enter Product Name"/>
                      </form>
                      <FontAwesomeIcon onClick={handleSearch} icon={faSearch} className="w-5" />
                    </div>
                  </div>
                </div>
              ) }
              
  
              <li onClick={openSearchPanel} className="nav_item">
                <FontAwesomeIcon  icon={showSearchBar ? faTimes : faSearch} />
              </li>
              
              {/*<li className="mx-0 nav_item">*/}
              {/*  <Link to="/q"><FontAwesomeIcon icon={faFilter} /></Link>*/}
              {/*</li>*/}
              
             
                <li className="nav_item relative">
                  <Link to="/cart" className="flex justify-center">
                    <FontAwesomeIcon icon={faShoppingBag} />
                    {totalCartProducts !== 0 && <span className="badge">{totalCartProducts}</span> }
                  </Link>
               </li>
               <li className="nav_item relative"
                   onMouseLeave={()=>handleSetExpandDropdown("")}
                   onMouseEnter={()=>handleSetExpandDropdown("user_menu")}
                   onClick={openMenuHandler}
               >
                <div className="avatar w-9"
                  
                  >
                  <div className="mx-2">
                   
                    { auth.avatar
                      ? <img  onError={loadErrorAvatar} className="w-full rounded-full flex" src={fullLink(auth.avatar)}  alt=""/>
                      : <FontAwesomeIcon icon={faUserCircle} className="flex text-lg text-gray-600 " />
                    }
                  </div>
                  {/*<img src={A} alt="" onClick={()=> setExpandDropdown("user_menu") }  />*/}
                  {authDropdown(expandDropdown === "user_menu")}
                </div>
              </li>
            {/*<li className="nav_item">*/}
            {/*    <FontAwesomeIcon icon={faBars} />*/}
            {/*  </li>*/}
            </div>
              
              <Modal isOpenModal={showSearchBar} title="Search Products" >
                <div>
                  { renderSearchBar()  }
                  <button className="search_btn" >Search</button>
                </div>
              </Modal>
          </div>
      </div>
    </div>
      <div className="d" />
    </>
  )
}

function Panel(props){
  const { style, className, left, right } = props
  const styles = {...style}
  if(left){
    styles.left = `${left}px`
  } else if(right){
    styles.right = `${right}px`
  }

  return(
    <div data-test='panel' style={styles} className="panel">
      {props.children}
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  totalCartProducts: state.productState ? state.productState.cartProducts ? state.productState.cartProducts.length : 0 : 0,
  search: state.productState.search.value
})


export default connect(mapStateToProps, {logout, toggleSearchBar})(Navigation)