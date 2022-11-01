import React, {useRef} from 'react';
import Footer from "../Footer/Footer";
import Search from "../Search/Search";
import {useLocation} from "react-router-dom";

const Layout = (props) => {
  
  const {className, openSidebar, ...attr} = props
  
  const location = useLocation()
  
  const leftSidebarRef = useRef()
  
  function calculateSpace(leftSidebar){

    const navi = document.querySelector(".navigation") as HTMLDivElement
    if(leftSidebar && navi) {
      leftSidebar.style.top = navi.offsetHeight + "px"
    }
  }
  
  
  React.useEffect(()=>{
    if(leftSidebarRef.current){
      calculateSpace(leftSidebarRef.current)
    }
    
  }, [leftSidebarRef])
  
  function renderContent(content){
    let el = React.cloneElement(content)
    return  (
      <div {...el.props}>
        {/*{(location.pathname.indexOf("/q") !== -1) ? <Search/> : ("/" === location.pathname) ? <Search /> : "" }*/}
        {el.props.children}
      </div>
    )
  }
  
  
  return (
    <div className={[className ? className: "", openSidebar ? "open-sidebar" : "close-sidebar"].join(" ")}>
      { React.cloneElement(props.children[0], {ref:leftSidebarRef}) }
    { renderContent(props.children[1]) }
    </div>
  );
};

export default Layout;