import React from 'react'
import "./Box.scss"

import wavesEffect from '../shared/waves'
import styles from '../shared/styles'

const Box = (props) => {

  const { style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px, waves, children, ...attributes} = props

  function handleClick(e){
    waves && wavesEffect(e, waves)
  }
  
  const jsStyles = styles(style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px)

  return (
    <div 
      className="box"
      style={jsStyles}
      onMouseDown={handleClick} 
      {...attributes}
      >
        { children }
    </div>
  )
}

export default Box
