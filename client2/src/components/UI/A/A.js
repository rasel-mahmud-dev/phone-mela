import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const A = (props)=>{

  const {to, children} = props
  return <Link  className={props.isActive ? "active" : ""} to={to}>{children}</Link>
  
}


export default withRouter(function({location, ...props}){
  
  const isActive = location.pathname === props.to

  return <A isActive={isActive} {...props} />

})

