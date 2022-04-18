import React from "react";
import {Link} from "react-router-dom"

import "./Button.scss"

type ButtonTypes ='default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text'
interface BaseButtonProps {
  type?: ButtonTypes;
  icon?: React.ReactNode;
  size?: string;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}


const Button = (props)=>{
  const {
    htmlType="button", childEvent=false, type="default", icon, ghost,
    href, to, loading, theme, className,
    size, block, radius, color, border, ...attributes
  } = props
  
  let classes = ["btn", ghost?"bg-transparent":"", className]
  if(!theme){
    if(type === "text"){
      classes.push(`btn-text`)
    } else {
      classes.push(`btn-default`)
    }
  }
  classes.push(block ? "btn-block" : "")
  classes.push(size === "large" ? "btn-large" : "")
  classes.push(icon || loading ? "btn-icon" : "")
  classes.push(loading ? "btn-disable" : "")
  classes.push(theme ? `btn-${theme}` : "")
  
  function renderLinkBtn(){
    if(to){
      return <Link
        to={to}
        {...attributes}
        className={classes.join(" ")}>
        
        {!loading && icon && <i
          className={['btn-icon-i', icon].join(' ')} />
        }
        { loading && <LoadingIcon /> }
        { props.children && <span className={[(icon || loading) ? 'ml-2' : ''].join(' ')}>{props.children}</span>}
      </Link>
      
    } else {
      return <a
        href={href}
        {...attributes}
        className={classes.join(" ")}>
        {!loading && icon && <i
          className={['btn-icon-i', icon].join(' ')} />
        }
        { loading && <LoadingIcon /> }
        { props.children && <span className={[(icon || loading) ? 'ml-2' : ''].join(' ')}>{props.children}</span>}
      </a>
    }
  }
  
  if(type === "link"){
    return renderLinkBtn()
  } else {
    if(to || href){
      return renderLinkBtn()
    } else {
      return (
        <button
          type={htmlType}
          className={classes.join(" ")}
          {...attributes}>
          {!loading && icon && <i
            className={[!childEvent ? 'event-none' : '', 'btn-icon-i', icon].join(' ')} />}
          { loading && <LoadingIcon /> }
          { props.children && <span className={[(icon || loading) ? 'ml-2' : ''].join(' ')}>{props.children}</span>}
        </button>
      )
    }
  }
}


const LoadingIcon = () => {
  return (
    <div className="loading-circle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Button