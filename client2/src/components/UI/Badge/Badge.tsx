import React from "react";
import "./Badge.scss"

const Badge = (props)=>{
  const {count,style, color, radius=100, bg, className="", ...attributes} = props 
  
  let classes = ["badge", className]
  let styles = {...style}
  
  if(bg) classes.push('bg-'+bg)
  if(color) classes.push('text-'+color)
  classes.push('br-'+radius)
  
  function renderBadge(){
    if(props.childern){
    } else{
      return (
          <span className={classes.join(" ")} style={styles} {...attributes}>{count}</span>
        )
    }
  }
  
  
    return renderBadge()
}

export default Badge