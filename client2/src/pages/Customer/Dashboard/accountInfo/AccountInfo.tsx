import React from 'react'
import {connect} from "react-redux";
// import { useParams, useHistory } from "react-router-dom"
// import "./accountInfo.scss"
// import blobToBase64 from "src/utills/blobToBase64"
// import fullLink from "src/utills/fullLink"
// import {Button, Input, Divider, Popup, Password} from "components/UI"
//
// import {connect, useDispatch} from "react-redux"
// import apis from "src/apis";
//
//
const AccountInfo = (props) => {
//   let inputRef = React.useRef<HTMLInputElement>(null)
//   let params = useParams()
//   let history = useHistory()
//   const dispatch = useDispatch()
//   const { authState } = props
//   let [collapseIds, setCollapseIds] = React.useState(["4", "sdf"])
//   let [ dataUrl, setDataUrl] = React.useState<string>("")
//
//   let [ fetchProfile, setFetchProfile] = React.useState<any>({})
//   let [ users, setUsers] = React.useState([])
//   let [ isShowSetPassForm, setShowPassForm] = React.useState(false)
//
//
//   React.useEffect(()=>{
//     if(authState._id){
//       apis.get(`/api/auth/fetch-profile/${authState._id}`).then(doc=>{
//         if(doc.data.user){
//           let u = doc.data.user
//           setFetchProfile(u)
//           const {_id, created_at, avatar, ...otherField} = u
//           let uus: any = []
//           for(let key in otherField){
//             uus.push({
//               field: key, icon: "fa-user", value: otherField[key] ? otherField[key] : null
//             })
//           }
//           setUsers(uus)
//
//         }
//       })
//     }
//   }, [authState._id])
//
//   const renderUserInfo=()=>{
//     const user = [
//       {field: "email", icon: "fa-user", value: "rasel@gmail.com"},
//       {field: "phone", icon: "fa-user", value: "01342234"},
//       {field: "password", icon: "fa-key", value: "01342234"},
//     ]
//
//
//     return (
//       <div>
//         {users.map((u: any)=>{
//           return u.value &&  <li className="item">
//             <div className="d-flex">
//               <h4 className="label">
//                 {u.field.toUpperCase()}:
//               </h4>
//               {u.field === "password" ? (
//                 <input
//                   disabled={true}
//                   className="border-less-input"
//                   value={u.value}
//                   type="passwor" />
//               ) : (
//                 <h4>{u.value}</h4>
//               ) }
//             </div>
//             <div><i className="fa fa-pen"/></div>
//           </li>
//         })}
//       </div>
//     )
//   }
//
//
//   function choosePhoto(){
//     if(inputRef.current) {
//       let i = inputRef.current as HTMLInputElement
//       i.click()
//     }
//   }
//
//   function handleChangePhoto(e){
//     blobToBase64(e.target.files[0], (dataUrl: string)=>{
//       setDataUrl(dataUrl)
//     })
//   }
//   function uploadProfilePhoto(e){
//     alert("call database")
//   }
//
//
//   function renderSetPasswordModal(){
//       return (
//         <Popup className="set-password-form" inProp={true}>
//           <Password placeholder="New Password" />
//           <Password placeholder="Confirm Password" />
//           <Button>Set Password</Button>
//         </Popup>
//       )
//     }
//
//
//   return (
//       <div className="container-full px-5 p-relative">
//         { isShowSetPassForm && renderSetPasswordModal() }
//         <Button to={`/customer/${params.name}`} type="link">Back to Dashboard</Button>
//         <h1 className="t-center">MY ACCOUNT</h1>
//         <div className="customer-avatar">
//           {fetchProfile.avatar ? (
//             <img src={fullLink(fetchProfile.avatar)} />
//           ) : (
//             <i className="fa fa-user-circle" />
//           )}
//         </div>
//
//         <input onChange={handleChangePhoto} hidden={true} type="file" ref={inputRef} />
//
//         { dataUrl ? (
//           <div className="center">
//             <div className="preview-avatar">
//               <img src={dataUrl} />
//             </div>
//             <Button
//               onClick={uploadProfilePhoto}
//               className="btn-center">
//               Upload Photo
//             </Button>
//           </div>
//         ) : (
//           <Button
//           onClick={choosePhoto}
//           className="btn-center">Add Profile Photo</Button>
//         )
//       }
//
//         <ul>
//           <h5>user information</h5>
//           {renderUserInfo()}
//            <li className="item">
//              <div className="d-flex">
//                 <h4 className="label mr-5">Member in Since: </h4>
//                 <h4>{new Date(fetchProfile.created_at).toDateString()}</h4>
//               </div>
//            </li>
//              <Divider />
//           {!fetchProfile.password && <div className="row d-flex align-center">
//             <h4 className="mr-5">set password to next time log in</h4>
//               <Button onClick={()=>setShowPassForm(!isShowSetPassForm)}>Set Password</Button>
//             </div>
//           }
//         </ul>
//
//         <div>
//           <Button type="primary">Delete Your Account</Button>
//         </div>
//
//
//       </div>
//     )
  return <div>
  
  </div>
}

function mapStateToProps(state){
  return {
    authState: state.authState
  }
}


export default connect(mapStateToProps, {})(AccountInfo)
