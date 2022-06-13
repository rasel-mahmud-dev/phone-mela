import React, {FC} from 'react'
import { matchPath, useNavigate } from "react-router-dom";
import {myRoutes} from "src/MyRoutes";
import ProgressBar from "UI/ProgressBar/ProgressBar";


type joinedTypes = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>


interface PreloadProps extends Omit<joinedTypes, 'to' | 'onClickCallback'> {
  to: string,
  onClickCallback?: any,
}


function Preload ({to, onClick, onClickCallback, ...props}: PreloadProps) {
  
  let navigator = useNavigate()
  let [startLoading, setLoading] = React.useState(false)
  
  function handlePush(e){
    e.preventDefault()
    onClick && onClick(e)
    myRoutes.forEach(route=>{
      let m = matchPath({
        path: route.path,
        end: false
      }, to);
      if(m){
        setLoading(true)
        if(typeof route.element.type === "object"){
          route.element.type?.preload()
            .then(res=>{
            setTimeout(()=>{
              navigator(`${to}`)
              setLoading(false)
              onClickCallback && onClickCallback()
            }, 10)
          }).catch(ex=>{
            console.info(`Module Download Fail - ${route.path}`)
          })
        } else {
          navigator(`${to}`)
        }
        
      } else {
        // navigator(`${props.to}`)
      }
    })
  }
  

  
  return  <>
    { startLoading && <ProgressBar/>  }
    <a
      href={to}
      onClick={handlePush}
      {...props}>{props.children}</a>
  </>
  
}



// this function call when use button as a link
/*

 let c = Preload.Load("/q", ()=>{
     navigate("/q/?search=" + search.value)
   })
 return  c

* */
Preload.Load = function (to, onClickCallback){
  
  let navigator;
  function C (props){
    navigator = useNavigate()
  }
  
  myRoutes.forEach(route=>{
    let m = matchPath({
      path: route.path,
      end: false
    }, to);
    if(m){
      // setLoading(true)
      if(typeof route.element.type === "object"){
        route.element.type?.preload()
          .then(res=>{
            setTimeout(()=>{
            onClickCallback && onClickCallback()
            }, 10)
          }).catch(ex=>{
          console.info(`Module Download Fail - ${route.path}`)
        })
      } else {
        navigator(`${to}`)
      }
    } else {
    
    }
  })
  return C
}

export default Preload