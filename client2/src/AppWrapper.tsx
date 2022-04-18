import React, {FC} from 'react';
import {withWidth} from "UI/Layout";

interface AppWrapperProps{
  innerWidth: number
  children: React.ReactNode
}
const AppWrapper:FC<AppWrapperProps> = (props) => {
  
  const contentRef = React.useRef<HTMLDivElement>(null)
  
  React.useEffect(()=>{
    
    const footer = document.querySelector(".footer") as HTMLDivElement
    const navigation = document.querySelector(".navigation")  as HTMLDivElement
    contentRef.current.style.minHeight = `calc(100vh - ${(footer ? footer .offsetHeight : 0) + (navigation ? navigation .offsetHeight: 0 )}px)`
  }, [props.innerWidth])
  
  
  return (
    <div className="" ref={contentRef}>
      {props.children}
    </div>
  );
};

export default  withWidth(AppWrapper);