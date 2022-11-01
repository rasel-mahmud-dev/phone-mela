import React, {FC} from "react";
import {connect} from "react-redux"
import "./App.scss";
import {fetchCurrentAuth} from "src/store/actions/authAction"
import {fetchCart, fetchWishlist} from "src/store/actions/productAction"
import Navigation from "./Common/Navigation"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-regular-svg-icons";
import {togglePopup} from "actions/toolsAction";
import Backdrop from "UI/Backdrop/Backdrop";
import {ToolsReducerType} from "reducers/toolsReducer";
import {RootStateType} from "store/index";
import {FILTERED_PRODUCTS_TYPE} from "store/types/prouductReduceTypes";
import Footer from "./Common/Footer/Footer";
import MyRoutes from "./MyRoutes";
import {AuthStateType} from "store/types/authType";

type AppProps = {
  togglePopup: any,
  fetchCurrentAuth?: any;
  fetchCart?: any;
  fetchWishlist?: any;
  auth?: AuthStateType;
  tools: ToolsReducerType;
  filteredProducts: FILTERED_PRODUCTS_TYPE
}


const App:FC<AppProps> = (props) => {
  
  const { auth, tools } = props
  const { action } = tools
  
  const normalRoutes = ["/auth/login", "/auth/signup"]
  
  React.useEffect(() => {
    props.fetchCurrentAuth()
    const loader_backdrop = document.querySelector(".spin_loader_root")
    loader_backdrop && loader_backdrop.remove()
    
  }, [])
  
  React.useEffect(()=>{
    // load Cart products
    if(auth) {
      props.fetchCart(auth._id)
      props.fetchWishlist(auth._id)
    } else {
      props.fetchCart()
    }
  }, [auth])
  
  function clickOnBackdrop(){
    props.togglePopup()
  }
  
  // @ts-ignore
  return (
    <div className="App">
 
      {/*<div className={["App-Content-mask",*/}
      {/*  (tools.appMask.fullApp && tools.appMask.isOpen ) ? "mask__open full_app" : "mask__close",*/}
      {/*  tools.appMask.as === "transparent" ? "mask_transparent" : "mask__backdrop"*/}
      {/*].join(" ")} />*/}
        
      <Navigation isOpenSearchBar={tools.isOpenSearchBar} />
      
      <div id="appContent">
        
     
        {/*<Backdrop isShowBackdrop={tools.isShowBackdrop}/>*/}
  
        {/*<div className={["App-Content-mask",*/}
        {/*  tools.appMask.isOpen ? "mask__open" : "mask__close",*/}
        {/*  tools.appMask.as === "transparent" ? "mask_transparent" : "mask__backdrop"*/}
        {/*].join(" ")} />*/}
        
        
        <Backdrop
          onCloseBackdrop={clickOnBackdrop}
          isOpenBackdrop={props.filteredProducts.isLoading}
          bg="#00000060"
        />
        
        { action.isOpen &&
          <Backdrop onCloseBackdrop={clickOnBackdrop} isOpenBackdrop={true} bg="#00000030">
            <div className="bg-white max-w-[500px] w-[90%] mx-auto fixed top-1/4 left-1/2 transform -translate-x-1/2 rounded">
              <div className="p-4 shadow-lg">
                <div className="relative">
                  <h1 className="font-medium text-sm sm:text-lg">{action.message}</h1>
                  <div className="absolute right-0 -top-2 text-secondary-400 cursor-pointer">
                    <FontAwesomeIcon onClick={clickOnBackdrop} icon={faTimes} />
                  </div>
                </div>
                {/*<button className="btn btn-primary mt-4">Login</button>*/}
              </div>
            </div>
          </Backdrop>
          }
          <MyRoutes auth={auth} />
          <Footer/>
        </div>
      </div>
      
    // </div>
  );
}

function mapStateToDispatch(state: RootStateType) {
  return {auth: state.auth, tools: state.tools, filteredProducts: state.productState.filteredProducts}
}

export default connect(mapStateToDispatch, {fetchCurrentAuth, fetchWishlist, togglePopup, fetchCart})(App);
