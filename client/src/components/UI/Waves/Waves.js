import React from 'react'
import './Waves.scss'

const Waves = (props) => {
  let { cursorPos, parentRef } = props

  React.useEffect(()=>{
    if(parentRef){
      let parentElement =  parentRef.current  
      if(cursorPos.top || cursorPos.left){
        wavesEffect(parentElement)
      } 
    } 
  }, [cursorPos.time])  

  function wavesEffect(parent){
    parent.classList.add('ripple_parent')
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    const rippleWidth = width > height ? width : height; 

    const centerilize = rippleWidth / 2   

    const left = (cursorPos.left - parent.offsetLeft) - centerilize;
    const top =( cursorPos.top - parent.offsetTop) - centerilize;

    let ripple = document.createElement("div")
    ripple.classList.add("ripple")
    ripple.style.top = `${top}px`
    ripple.style.left = `${left}px`
    ripple.style.width = `${rippleWidth}px`
    ripple.style.height = `${rippleWidth}px`

    parent.appendChild(ripple)
    setTimeout(() => {
      parent.removeChild(ripple)
    }, 700);
  }
  return null
}

export default Waves
