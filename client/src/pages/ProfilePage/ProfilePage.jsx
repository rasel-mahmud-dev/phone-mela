import React from 'react'
import { connect } from "react-redux"

import "./ProfilePage.scss"
import {changeProfilePhoto} from "../../store/actions/usersAction";
import {fetchProfile} from "../../store/actions/authAction";
import {Container} from "../../components/Layout";

const ProfilePage = (props) => {
  const { auth, user} = props

  console.log(user);
  React.useEffect(()=>{
    props.fetchProfile(auth._id)
  }, [0])

  const input  = React.useRef(null)
  const [state, setState] = React.useState({avatar: "" })

  function choosePhoto(e){
    input.current.click()
  }
  function changeHandle(e){
    console.log(e.target.files);
    setState({ avatar: e.target.files[0] })
    props.changeProfilePhoto(e.target.files[0])
  }

  return (
    <Container fluid className="profilePage">

      <h1>Your Profile</h1>

      { user && user._id && (
        <div>
          <div className="profile-photo">
            <img src={auth.avatar} alt="profile photo"/>
            <div className="form">
              <input onChange={changeHandle} ref={input} hidden type="file" name="avatar"  accept="image/gif, image/jpeg, image/png, image/jpg" />
              <button onClick={choosePhoto}>change avatar</button>
            </div>
          </div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>ID: {user._id}</p>
        </div>
      ) }
    </Container>
  )
}

const mapStateToProps = (state) => ({
  user: state.users[0],
  auth: state.auth
})



export default connect(mapStateToProps, {fetchProfile, changeProfilePhoto})(ProfilePage)
