import React, {useRef} from 'react'
import {connect, useDispatch} from "react-redux"
import {logout} from 'src/store/actions/authAction'

import "./Navigation.scss"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faAngleDown,
  faBars, faFlagUsa,
  faSearch,
  faShoppingBag,
  faShoppingCart,
  faUserCircle
} from "@fortawesome/pro-regular-svg-icons";
import {faHeart, faSignOutAlt, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {faSignIn} from "@fortawesome/pro-brands-svg-icons";
import {faTimesCircle} from "@fortawesome/pro-solid-svg-icons";
import {faAdn, faFacebookF,} from "@fortawesome/free-brands-svg-icons";

import {useLocation, useNavigate} from "react-router-dom";
import fullLink from "../utils/fullLink";
import Modal from "UI/Modal/Modal";
import {toggleSearchBar, toggleSideBar} from "actions/toolsAction";

import {onFilterSearchChange, onSearchChange} from "actions/productAction";
import Preload from "UI/Preload/Preload";
import {faGlobe} from "@fortawesome/pro-light-svg-icons/faGlobe";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";

const offerText = "ফোন মেলা এর যেকোনো আউটলেট অথবা অনলাইন শপ\n" +
  "থেকে নির্দিষ্ট ব্র্যান্ডের স্মার্টফোন কিনলেই পাচ্ছেন\n" +
  "আকর্ষণীয় গিফট! Samsung, Xiaomi, Oppo, Nokia এই ঈদে দিচ্ছে বিশাল ডিসকাউন্ট এবং সাথে থাকছে অনেক গিফট | যোগাযোগ ইমেইল rasel.mahmud.dev@gmail.com, ফোন ০১৭৮৫৫১৩৫৩৫"

const Navigation  = (props)=>{
  const { auth, totalCartProducts, search } = props
  const navigationRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [isShow_authMenuPanelId, set_authMenuPanelId ] = React.useState(null)
  const [expandDropdown, setExpandDropdown] = React.useState("")
  const [showSearchBar, setShowSearchBar] = React.useState(false)
  const [showSidebarButton, setShowSidebarButton ] = React.useState(false)
  
  const searchInputRef = React.useRef()
  
  function toggleAuthMenuPanel(e){   
    if(e.target.dataset.set === isShow_authMenuPanelId){
      set_authMenuPanelId(null)
    }else{
      set_authMenuPanelId(e.target.dataset.set ? e.target.dataset.set : null)
    }
  }
  
  function handleLogOut(){
    props.logout((err)=>{
      setExpandDropdown("_")
      if(!err){
        navigate("/")
      }
    })
  }
  
  function authDropdown(isShow) {
    let callback = location.pathname + location.search
    
    return isShow && (
      <div className="dropdown_nav">
        <ul className="min-w-[200px] bg-white text-sm font-normal">
          { auth.isAuthenticated ? (
            <>
              { auth.role === "admin" && (
                <li className="auth-menu__item">
                  <FontAwesomeIcon icon={faAdn} className="mr-2 text-gray-800" />
                  <Preload  onClickCallback={()=>setExpandDropdown("_")} className="font-normal text-gray-800" onClick={()=>setExpandDropdown("_")}  to="/admin/dashboard">Dashboard</Preload>
                </li>
              ) }

              <li className="auth-menu__item">
                <Preload  onClickCallback={()=>setExpandDropdown("_")} className="text-sm font-normal" to={`/auth/customer`}>
                 <FontAwesomeIcon icon={faUserAlt} className="mr-2 dark_title text-gray-800" />
                Profile
                </Preload>
              </li>
  
  
              <li  className="auth-menu__item">
                <Preload  onClickCallback={()=>setExpandDropdown("_")} className="" to={`/wishlist`}>
                  <FontAwesomeIcon icon={faHeart} className="mr-2 dark_title text-gray-800 block w-10" />
                  My Wishlist
                </Preload>
              </li>
              
              
              <li  className="auth-menu__item">
                <Preload  onClickCallback={()=>setExpandDropdown("_")} className="" to={`/cart`}>
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2 w-4 dark_title text-gray-800" />
                  My Cart
                </Preload>
              </li>
              
              
              <li onClick={handleLogOut} className="auth-menu__item ">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 dark_title text-gray-800" />
                Logout
              </li>
            </>
          ) : (
            <li
              className="auth-menu__item"
              // onClick={()=> pushRoute("/auth/login") }
            >
              <Preload
                onClickCallback={()=>setExpandDropdown("_")}
                className="block w-full text-gray-800" to={`/auth/login?callback=${callback}`}>
                <FontAwesomeIcon className="mr-2 text-gray-800" icon={faSignIn} />
                Login
              </Preload>
            </li>
          )
          }
        </ul>
      </div>
    )
  }
  function loadErrorAvatar(e){
    const div = document.createElement("h1")
    div.classList.add("!m-0")
    div.innerHTML = `
       <div class="w-[21px] h-[21px] rounded-full bg-gray-300 dark:bg-primary shadow-md flex justify-center items-center">
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
  
  function calculateSpace(){
    const leftSidebar= document.querySelector(".left_sidebar")
    let content = document.getElementById("content")
    const d = document.querySelector(".d")
    const navi = document.querySelector(".navigation")
    const footer = document.querySelector(".footer")
    if (d && navi){
      d.style.height = navi.offsetHeight + "px"
    }
    if(leftSidebar && navi) {
      leftSidebar.style.top = navi.offsetHeight + "px"
    }
    
    if(!content) {
      setTimeout(()=>{
        content = document.getElementById("content")
      }, 10)
    }
    
    // if(content && navi && footer){
    //   content.style.height = `calc(100vh - ${navi.offsetHeight + footer.offsetHeight}px)`
    // }
    // console.log(content )
    
  }
  
  
  React.useEffect(()=>{
    setShowSearchBar(!!search)
    calculateSpace()
    window.addEventListener("resize", function() {
      calculateSpace()
    })
    // const leftSidebar= document.querySelector(".left_sidebar")
    // console.log(leftSidebar)
  }, [])
  
  
  let whiteLists = ["/", "/q", "/auth/customer", "/admin/dashboard", "/auth/customer/account-info"]
  
  React.useEffect(()=>{
    // whiteList = ["/", "/q/", "/auth/customer", "/admin/dashboard", "/auth/customer/account-info"]
    if(whiteLists.indexOf(location.pathname) !== -1){
      setShowSidebarButton(true)
    } else if(location.pathname.indexOf("auth/customer") !== -1){
      setShowSidebarButton(true)
    } else {
      setShowSidebarButton(false)
    }
  }, [location])
  
  
  
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
      return Preload.Load("/q", () => {
        navigate("/q/?search=" + search)
      })
    }
  }
  
  function onChangeSearch(e){
    if(e.target.value === ""){
      dispatch(onFilterSearchChange(""))
      dispatch(onSearchChange(""))
      return Preload.Load("/q", () => {
        navigate("/q")
      })
    } else {
      dispatch(onSearchChange(e.target.value))
    }
  }
  
  function handleToggleSidebar(){
   
    let where = "homePage"
    if(location.pathname.indexOf("/q") !== -1){
      where = "filterPage"
    } else if(location.pathname === "/auth/customer"){
       where = "admin_dashboard"
    } else if (location.pathname.indexOf("/auth/customer") !== -1){
       where = "admin_dashboard"
    } else if(location.pathname === "/admin/dashboard"){
       where = "admin_dashboard"
    }
    dispatch(toggleSideBar({
      where: where,
      isOpen: null
    }))
  }
  
  function handleSearchClear() {
    dispatch(onFilterSearchChange(""))
    dispatch(onSearchChange(""))
    return Preload.Load("/q", () => {
      navigate("/q")
    })
  }
  
  return (
    <>
      <div ref={navigationRef}  className="navigation select-none" id="navigation">
        <div className="container-1400 flex-1 px-3">
          
          {/* top_navigation hide on mobile view */}
          <div className="top_navigation ">
            <div className="hidden sm:flex ">
              <a target={"_blank"} href="https://www.facebook.com/raselmraju" className="top_navigation__icon_item"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a target={"_blank"} href="https://rasel-portfolio.vercel.app" className="top_navigation__icon_item"><FontAwesomeIcon icon={faGlobe} /></a>
              <a target={"_blank"} href="https://github.com/rasel-mahmud-dev" className="top_navigation__icon_item"><FontAwesomeIcon icon={faGithub} /></a>
            </div>
            <div className="flex-1 px-0 sm:px-4">
              <marquee className="text-sm font-light flex"  behavior="slider">{offerText}</marquee>
            </div>
            <div className="hidden sm:flex">
              <span className="top_navigation_item items-center flex">
                <FontAwesomeIcon icon={faFlagUsa} className="text-xs" />
                <a className="hover:text-primary-400 cursor-pointer ml-1">EN</a>
              </span>
            </div>
          </div>
  
          <div className="main_nav !mb-0 sm:!mb-[10px]">
    
            <div className="left_nav " >
      
              { showSidebarButton && <FontAwesomeIcon onClick={handleToggleSidebar} className="block md:hidden text-xl text-dark-600 mr-2" icon={faBars} />}
              
              <Preload to="/" className="flex items-center text-decoration-none text-initial">
                <div className="logo_image">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 521.36 268.31">
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path
                          d="M131.44,68.68c-.31-.26-.39-3.76-.44-25L130.92,19l-.7-2.46A20.55,20.55,0,0,0,127,9.4c-3.45-4.85-9-7.81-16.27-8.69C109.54.55,99.43.32,88.32.19,66.53-.07,65-.07,40.22.22c-9.46.1-17.51.31-18.93.46a27.32,27.32,0,0,0-8.93,2.49,18.41,18.41,0,0,0-9.08,9.08C1.1,16.82.84,19.13.82,32.75.79,41.23.74,43,.43,43.36c-.57.75-.57,16.68,0,17.43S1,70.65.43,71.38-.14,88,.43,88.84c.34.46.39,10.32.47,80.65l0,80.14.59,2.21a19.67,19.67,0,0,0,11.73,13.62,38.55,38.55,0,0,0,4.38,1.42c1.51.42,2.52.76,2.24.76h0a.84.84,0,0,1,.3.15l.08,0,0,0a1.43,1.43,0,0,1,.27.09.91.91,0,0,1,.22.11h.05l.21,0c3.64.16,15.43.21,44.3.21,20.81,0,38.69-.07,44.27-.16a1.21,1.21,0,0,1,.33-.07.88.88,0,0,1,.28,0c.42-.1.83-.19,1.26-.27l.19-.08a.51.51,0,0,1,.18-.09l.06,0a8.85,8.85,0,0,1,2.08-.66c8.84-2.15,14-6.87,16.31-15l.6-2.08L131,168.4c.05-71.78.1-81.53.44-81.82C132,86.11,132,69.17,131.44,68.68ZM126,241.59H5.62L5.54,135c0-85.12,0-106.65.26-106.83S33.12,28,66.06,28l59.93,0Z"/>
                        <path className="cls-1"
                              d="M219.93,153.75c0-8.66.12-18,.33-23.47H220c-2.25,9.34-8.21,27.37-13.25,42.81h-8c-3.82-13.18-10-33.58-12.18-42.93h-.29c.41,5.75.6,16.16.6,24.6v18.33h-8.49V123.84h13.76c4.44,13.69,9.61,31.06,11.16,38h.09c1.19-5.88,7.52-24.64,12.2-38h13.28v49.25h-8.93Z"/>
                        <path className="cls-1"
                              d="M275.75,151.24H251.87v14.19h26.3l-1.12,7.66H242.88V123.84h33.95v7.65h-25v12.09h23.88Z"/>
                        <path className="cls-1" d="M287.89,123.84h9.23v41.59h24.93l-1.11,7.66H287.89Z"/>
                        <path className="cls-1"
                              d="M341.55,160.55l-4.35,12.54h-9.1l17-49.25h11.55l17.73,49.25h-9.74l-4.53-12.54ZM358,152.89c-3.91-11.26-6.26-18-7.41-22.18h-.07c-1.21,4.62-3.81,12.55-6.95,22.18Z"/>
                        <path className="cls-2"
                              d="M176.46,28.35h28.83c14.81,0,24.86,8.34,24.86,21.58,0,15.14-11.46,22.09-25.21,22.09h-13.4V98H176.46ZM191.54,60H203c7,0,11.9-2.68,11.9-9.8s-5.2-9.87-11.58-9.87H191.54Z"/>
                        <path className="cls-2"
                              d="M241.45,28.35h15.07V55.53h28V28.35h15.06V98H284.56V67.88h-28V98H241.45Z"/>
                        <path className="cls-2"
                              d="M380.39,63c0,19.39-11.64,36.09-34.27,36.09-21.87,0-33.32-15.89-33.32-35.85,0-20.28,12.64-35.86,34.29-35.86C367.47,27.34,380.39,41.63,380.39,63Zm-52-.07c0,13.61,6,23.9,18.33,23.9,13.4,0,18.14-11.22,18.14-23.64,0-13.18-5.4-23.55-18.39-23.55C333.85,39.6,328.36,49.33,328.36,62.89Z"/>
                        <path className="cls-2"
                              d="M393.56,98V28.35h18.68c8.7,15.65,24.79,43.87,28,51.46h.19c-.78-7.27-.77-19.37-.77-30.8V28.35h13.66V98H435.59C428.11,84.42,410.28,52,406.83,44h-.19c.5,6.09.67,20.41.67,32.89V98Z"/>
                        <path className="cls-2"
                              d="M517.92,68H484.6v17.7h36.76L519.57,98H470V28.35h49.41V40.7H484.6V55.63h33.32Z"/>
                      </g>
                    </g>
                  </svg>
                  {/*<img className="w-full" src={logo} alt=""/>*/}
                </div>
              </Preload>
            </div>
    
            <div className="center_nav flex">
              <form onSubmit={handleSearch} className="w-full">
                <div className="p_search_box flex items-center">
                  <input ref={searchInputRef} value={search} onChange={onChangeSearch} type="text" placeholder="search products"/>
                  { search && <button type="button" className="search_clear_icon">
                    <FontAwesomeIcon icon={faTimesCircle} onClick={handleSearchClear} />
                  </button>}
                  <button type="submit" className="search_icon">
                    <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
                  </button>
                </div>
              </form>
            </div>
    
            <div className="right_nav justify-content-end">
              {/*{ ((search && showSearchBar) || showSearchBar) && (*/}
              {/*  <div className="w-full">*/}
              {/*    <div className="floating_search">*/}
              {/*      <div className="input_wrapper">*/}
              {/*        <form onSubmit={handleSearch} className="w-full">*/}
              {/*          <input ref={searchInputRef} value={search} onChange={onChangeSearch} type="text" placeholder="Enter Product Name"/>*/}
              {/*        </form>*/}
              {/*        <FontAwesomeIcon onClick={handleSearch} icon={faSearch} className="w-5" />*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*) }*/}
      
      
              {/*<li onClick={openSearchPanel} className="nav_item">*/}
              {/*  <FontAwesomeIcon*/}
              {/*    icon={showSearchBar ? faTimes : faSearch}*/}
              {/*  />*/}
              {/*</li>*/}
              
      
              <li className="nav_item relative">
                <Preload to="/cart" className="flex justify-center">
                  <span className="hidden text-sm font-normal sm:inline-block">My Cart</span>
                  <FontAwesomeIcon icon={faShoppingBag} />
                  {totalCartProducts !== 0 && <span className="badge">{totalCartProducts}</span> }
                </Preload>
              </li>
              <li className="nav_item relative"
                  onMouseLeave={()=>handleSetExpandDropdown("")}
                  onMouseEnter={()=>handleSetExpandDropdown("user_menu")}
                  onClick={openMenuHandler}
              >
                <span className="hidden text-sm font-normal  sm:inline-block">My Account</span>
                <div className="avatar w-9">
                  <div className="mx-2">
                    { auth.avatar
                      ? <img
                        onError={loadErrorAvatar}
                        className="w-full rounded-full flex"
                        src={fullLink(auth.avatar)}
                        alt=""
                      />
                      : <FontAwesomeIcon
                        icon={faUserCircle}
                        className="flex auth_avatar_icon text-gray-600 "
                      />
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
                <button className="search_btn">Search</button>
              </div>
            </Modal>
          </div>
          
      </div>
    </div>
      <div className="d" />
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  totalCartProducts: state.productState ? state.productState.cartProducts ? state.productState.cartProducts.length : 0 : 0,
  search: state.productState.search.value
})


export default connect(mapStateToProps, {logout, toggleSearchBar})(Navigation)