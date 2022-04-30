import React from 'react'
import { matchPath, useNavigate } from "react-router-dom";
import {myRoutes} from "src/MyRoutes";
import ProgressBar from "UI/ProgressBar/ProgressBar";


function Preload({to, onClick, onClickCallback, ...props}){
  
  let navigator = useNavigate()

  let [startLoading, setLoading] = React.useState(false)
  
  function handlePush(e){
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
            // setTimeout(()=>{
              navigator(`${to}`)
              setLoading(false)
              onClickCallback && onClickCallback()
            // }, 1000)
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
  
  function handleAClick(e){
    e.preventDefault()
  }
  
  return  <button onClick={handlePush} {...props} >
    { startLoading && <ProgressBar/>  }
    <a href={props.to} onClick={handleAClick}>{props.children}</a>
  </button>
  
}

export default Preload