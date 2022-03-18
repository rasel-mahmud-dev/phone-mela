import Axios from 'axios'
import React from 'react'

import "./JwtAuth.scss"

let t = localStorage.getItem("token")

let baseUrl = Axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
}) 


import xxhr from "apis/xhr"

let x1 = xxhr.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: [
    // { "Content-Type" : "application/json" },
    // { 'Content-Type': 'application/x-www-form-urlencoded'}
  ]
})

class JwtAuth extends React.Component {
  state = {
    users: [],
    userData: { username: "", email: "", password: "", c_password: "" },
    isShowRegistrationForm: false,
    isShowLoginForm: false,
    currentUser: { username: "", email: "", _id: "" }
  }
  componentDidMount(){
    x1.get("/current-user").then(res=>{
      if(res.id){
        const { username, id, email } = res
        this.setState({currentUser: {username, _id: id, email}})
      }
    })
  }
  fetchUser=()=>{
    x1.get("/users").then(data=>{
      this.setState({ users: data })
    })
  }
  registrationUser=(e)=>{
    e.preventDefault()
    x1.post("/signup", this.state.userData)
    .then(data=>{
      console.log(data);
      // const { username, id, email } = data
      // this.setState({currentUser: {username, _id: id, email}})
    })
  }
  
  loginUser=(e)=>{
    e.preventDefault()

    x1.post("/signin",  this.state.userData)
    .then(data=>{
      console.log(data);
      const { username, id, email } = data
      this.setState({currentUser: {username, _id: id, email}})
    })
  }

  logoutHandler=()=>{
    x1.get("/signout")
    .then(res=>{
      this.setState({currentUser: {username: "", _id: "", email: ""}})
    })
  }
  deleteUser=(e)=>{
    let id = e.target.dataset.id
    x1.get(`/user/${id}`).then(id=>{
      console.log(id);
      let index = this.state.users.findIndex(u=>u.id == id )
      this.state.users.splice(index, 1)
      this.setState({users: this.state.users})
    })
  }
  
  renderRegistrationUser=()=>{
    return (
      
      <div className="modal">
        <form onSubmit={this.registrationUser} >
          <input 
              name="username"
              value={this.state.userData.username}
              label="username" 
              onChange={(e)=>this.setState({userData: {...this.state.userData, username: e.target.value}})} 
            />
          <input 
              type="email"
              name="email"
              value={this.state.userData.email}
              label="Email" 
              onChange={(e)=>this.setState({userData: {...this.state.userData, email: e.target.value}})} 
          />
          <input 
              type="password"
              name="password"
              value={this.state.userData.password}
              label="password" 
              onChange={(e)=>this.setState({userData: {...this.state.userData, password: e.target.value}})} 
          />
          <input 
              type="password"
              name="c_password"
              value={this.state.userData.c_password}
              label="c_password" 
              onChange={(e)=>this.setState({userData: {...this.state.userData, c_password: e.target.value}})} 
          />
          <button theme="red" type="submit">Registration</button>
          <button theme="blue" type="none" onClick={()=> this.setState({ isShowRegistrationForm: false }) } >Cancel</button>
        </form>
      </div>
    )
  }
  renderLoginUser=()=>{
    return (
      
      <div className="modal">
        <form onSubmit={this.loginUser} >
          <input 
              type="email"
              name="email"
              value={this.state.userData.email}
              label="Email" 
              onChange={(e)=>this.setState({userData: {...this.state.userData, email: e.target.value}})} 
          />
          <input 
              type="password"
              name="password"
              value={this.state.userData.password}
              label="password" 
              onChange={(e)=>this.setState({userData: {...this.state.userData, password: e.target.value}})} 
          />
          <button theme="red" type="submit">Login</button>
          <button theme="blue" type="none" onClick={()=> this.setState({ isShowLoginForm: false }) } >Cancel</button>
        </form>
      </div>
    )
  }


  render(){
    const {  currentUser } = this.state
  return (
    <div>
      <h3>Login</h3>
      <button onClick={this.fetchUser}>Get Users</button>
        { currentUser._id && (
         <li>
           <span>Wellcome </span>
            <strong>
              <a style={{color:"#7272ff"}} href="/">{currentUser.username}</a>
            </strong>
            <span><button onClick={this.logoutHandler}>sign out</button></span>
         </li>
        )}

      { !currentUser._id && this.renderLoginUser() }
      { !currentUser._id &&  this.renderRegistrationUser() }
      { this.state.users && this.state.users.length > 1 && this.state.users.map(user=> (
        <li className="item" onClick={this.deleteUser} data-id={user.id} key={user.id}> 
          <span>{currentUser._id === user.id ? user.username + " (me)" : user.username }</span>
         </li>
      )) }
      
    </div>
  )
}
}

export default JwtAuth
