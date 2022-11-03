import React from 'react'
import { useParams,  Link } from "react-router-dom"



import {connect, useDispatch, useSelector} from "react-redux"


import "./AddressBook.scss"
import api, {getApi} from "src/apis/api";
import Input from "UI/Form/Input/Input2";
import Button from 'components/UI/Button/Button';
import Divider from "UI/Divider/Divider";
import Badge from "UI/Badge/Badge";
import {ShippingAddress} from "reducers/userReducer";
import {RootStateType} from "store/index";
import {faPen, faPenAlt, faTrashAlt} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// const {SubMenu} = Menu



const AddressBook = (props) => {
  let params = useParams()
  // let history = useHistory()
  const dispatch = useDispatch()

  const {auth: {auth}} = useSelector((state: RootStateType)=>state)


  const [isShowAddShippingForm, setShowAddShippingForm] = React.useState(false)


  const [recentShippingAddress, setRecentShippingAddress] = React.useState<ShippingAddress[]>()


  const [shippingAddress, setShippingAddress] = React.useState<any>({
    first_name: "",
    last_name: "",
    phone: 0,
    post_code: 0,
    state: "Bogra",
    city: "sonatola",
    address: "harikhali",
    apartment_suit: "",
    country: "Bangladesh",
  })


  React.useEffect( ()=>{
    (async function () {
      if(auth._id) {
        let response = await getApi().get(`/api/shipping-addresses/${auth._id}`)
        setRecentShippingAddress(response.data)
      }
    }())
  }, [auth._id])

  function handleChange(e){
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    })
  }
  async function handleSave(e){
    // alert(JSON.stringify(shippingAddress))
    // if(!authState._id){
    //   window.localStorage.setItem("shipper", JSON.stringify(shippingAddress))
    //   history.push("/auth/login/?redirect=shipping")
    // } else{
    //   let {data} = await api.post("/api/shipping-address", {
    //     ...shippingAddress,
    //     user_id: authState._id
    //   })
    //   console.log(data)
    // }
  }

  function updateShippingFormHandle(id){
     setShowAddShippingForm(id)
    // let s: any =  shippingAddresses.find((sp: any) => sp._id === id)
    // setShippingAddress(s)
    // console.log(shippingAddresses)

  }

  function renderShippingAddress(){
    return (
      <div>
        <h2>{typeof isShowAddShippingForm === "boolean" ? "Add New Shipping Address" : "Update Shipping Address" }</h2>
        <Input
          name="name"
          label="Your Full Name"
          value={shippingAddress}
          onChange={handleChange}
          />
        <Input
          name="phone"
          value={shippingAddress.phone}
          label="Your Mobile Number"
          type="number"
          onChange={handleChange}
          />
        <Input

          name="region"
          value={shippingAddress.region}
          label="Region"
          type="text"
          onChange={handleChange}
          />
        <Input
          name="city"
          value={shippingAddress.city}
          label="City"
          type="text"
          onChange={handleChange}
          />
        <Input
          name="area"
          value={shippingAddress.area}
          label="Area"
          type="text"
          onChange={handleChange}
          />
        <Input
          name="zip_code"
          value={shippingAddress.zip_code}
          label="Zip Code"
          type="number"
          onChange={handleChange}
          />
        <Input
          type="textarea"
          value={shippingAddress.address}
          name="address"
          label="Address"
          onChange={handleChange}
          />

        <Input
          type="checkbox"
          // value={shippingAddress.address}
          value={shippingAddress.is_default}
          checked={shippingAddress.is_default}
          name="is_default"
          label="Make Default Shipping Address"
          onChange={handleChange}
          />

          <div className="d-flex">
            <button onClick={()=> setShowAddShippingForm(false)}>Cancel</button>
            <button onClick={handleSave}>{typeof isShowAddShippingForm === "boolean" ? "Save Shipping Address" : "Update" }</button>
          </div>
        </div>
    )
  }


  return (
      <div className="bg-white sm:mx-3 mx-0 px-3 py-4">
        <h1 className="sm:text-2xl text-xl text-center font-medium pt-4">Your Shipping Addresses</h1>
        
        <button className="btn-primary bg-primary-950 text-gray-10 px-2 rounded mt-4 font-normal">Add a new shipping address</button>
        
          {recentShippingAddress && recentShippingAddress.map((sp: any)=>(
             <div className="py-2 my-2">
              <div className="">
                <i className="fa fa-map-marker-alt" />
              </div>
              
               <div className="flex flex-1 items-center justify-between">
  
                 <div>
                   <h4>
                     <span className="inline-block font-normal text-sm w-[100px]">First Name:</span>
                     <span>{sp.first_name}</span>
                   </h4>
                   <h4>
      
                     <span className="inline-block font-normal text-sm w-[100px]">Last Name:</span>
                     <span>{sp.last_name}</span>
                   </h4>
                   <h4>
                     <span className="inline-block font-normal text-sm w-[100px]">Phone:</span>
                     <span>{sp.phone}</span>
                   </h4>
                   <h4>
                     <span className="inline-block font-normal text-sm w-[100px]">Address:</span>
                     <span>West tekani Sonatola Bogra</span>
                   </h4>
                 </div>
                 
                 <div>
                   <FontAwesomeIcon className="text-dark-100 pointer-events-none mr-4" icon={faPen} />
                   <FontAwesomeIcon className="text-dark-100 pointer-events-none " icon={faTrashAlt} />
                 </div>
                 
               </div>
              
          </div>
          ))}

          { isShowAddShippingForm && renderShippingAddress() }


      </div>
    )
}

export default AddressBook