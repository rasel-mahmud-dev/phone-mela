import React from 'react'

import "./IconButton.scss";


const IconButton = (props) => {
  const {flat, icon, style, iconStyle, classN, onMouseDown, className, children, attributes} = props
  
  const classes = [
    icon ? `${icon}` : ''
  ].join(" ")
  
  return flat ? (
      <button style={style} onMouseDown={onMouseDown} className={classN}  {...attributes}>
        <i style={{ pointerEvents: "none", ...iconStyle}} className={classes}/>
        {children}
      </button>
  ) : (
      <div style={style}  onMouseDown={onMouseDown} className={className} {...attributes}>
        <i className={classes}/>
      </div>
  )
  
  
}

export default IconButton
