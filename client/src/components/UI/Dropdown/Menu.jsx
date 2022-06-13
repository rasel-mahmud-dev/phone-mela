import React from 'react'

const Menu = (props) => {

  const { className, maxWidth, minWidth,  style, ...attributes } = props

  let styles = {...style}
  if(maxWidth){
    styles.maxWidth = maxWidth
  }
  if(minWidth){
    styles.minWidth = minWidth
  }

  return (
    <div {...attributes} style={styles} className={["dropdown_nav_menu", className].join(" ")}>
      {props.children && props.children}
    </div>
  )
}


export default Menu
