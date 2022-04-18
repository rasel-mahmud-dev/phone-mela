import React from 'react'


import { CSSTransition, Transition } from 'react-transition-group'

import "./Collapase.scss"


const Collapase = (props) => {

  const { state, id, children } = props 

  const html = React.createRef(null)
  let activeId = null;

  if(typeof state === 'object'){
    state.forEach(ItemId => {
      if(id == ItemId){
        activeId = ItemId
      }
    })
  }

  React.useEffect(()=>{
    if(html.current){
      if(id === activeId){
        html.current.style.maxHeight = html.current.scrollHeight + "px"
      } else{
        html.current.style.maxHeight = 0
      }
    }
  })
  
  return(
      <CSSTransition 
        in={id === activeId} 
        className="myAnimation" 
        // unmountOnExit 
        timeout={{enter: 1000, exit: 1000}}>
  
        <div ref={html}>{children}</div>
          
    </CSSTransition>

  )  
}

export default Collapase
