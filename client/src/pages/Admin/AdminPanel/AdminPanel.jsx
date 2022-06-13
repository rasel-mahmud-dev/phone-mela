import React from 'react'
import { connect } from 'react-redux'

const AdminPanel = (props) => {

  const { auth  } = props

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Username: {auth.username}</p>
      <p>Email: {auth.email}</p>
      <p>isAdmin: {auth.isAdmin ? 'true' : 'false'}</p>
    </div>
  )
}

function mapToStateProps(state){
  return {
    auth: state.auth
  }
}



export default connect(mapToStateProps, null)(AdminPanel)

