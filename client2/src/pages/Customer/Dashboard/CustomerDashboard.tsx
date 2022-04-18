import React from 'react'

import  Button  from "UI/Button/Button"

import "./Dashboard.scss" 

const CustomerDashboard = (props)=>{ 
  const { username } = props
  return (
    <div>
      <h1>Dashboard HomePage</h1>   
      <Button 
        to={`/customer/${username}/create-seller-account`} 
        type="link">
        create-seller-account</Button>
    </div>
  )
}


export default CustomerDashboard