import React from "react";
import "./Divider.scss"
const Divider = (props)=>{
  const {className, text, textColor, lineColor, textMargin, lineHeight, direction,  ...attributes} = props 
  
  const textStyles = {} 
  if(textMargin) textStyles["margin"] = `0 ${textMargin}px`
  if(textColor) textStyles["color"] = textColor
  
  const dividerStyles = {} 
  if(lineHeight)dividerStyles["height"] = `${lineHeight}px`
  if(lineColor) dividerStyles["background"] = lineColor
  
    return (
        <div className="divider_root">
          <span style={dividerStyles} className="divider-start" ></span>
          { text && <span style={textStyles} className="divider-text" >{text}</span> }
          { text && <span style={dividerStyles} className="divider-end" ></span> }
            
        </div>
    )
}

export default Divider

// <Divider 
//             lineColor="blue" 
//             lineHeight={1} 
//             textMargin={10} 
//             text="or"
//             textColor="orange"
//             />