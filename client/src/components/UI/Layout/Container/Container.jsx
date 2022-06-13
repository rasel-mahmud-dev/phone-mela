import React from 'react'

import "./Container.scss";

import styles from "src/components/UI/shared/styles"

const Container = (props) => {
  
  const { fluid, full, style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px, waves, className, children, ...attributes} = props
  
  const jsStyles = styles(style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px)

  const classes = [className, fluid ? "container-fluid" : full ? "container-full" : "container" ].join(" ")

  return (
    <div className={classes} style={jsStyles}>
      { props.children }
    </div>
  )
}

export default Container
