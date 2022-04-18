import React from 'react'
import { useParams,  Link } from "react-router-dom"



import {connect, useDispatch, useSelector} from "react-redux"


import "./AddressBook.scss"
import api from "src/apis/api";
import Input from "UI/Form/Input/Input2";
import Button from 'components/UI/Button/Button';
import Divider from "UI/Divider/Divider";
import Badge from "UI/Badge/Badge";
import {ShippingAddress} from "reducers/userReducer";
import {RootStateType} from "store/index";

// const {SubMenu} = Menu



const AddressBook = (props) => {
  let params = useParams()
  // let history = useHistory()
  const dispatch = useDispatch()

  const {auth} = useSelector((state: RootStateType)=>state)


  const [isShowAddShippingForm, setShowAddShippingForm] = React.useState(false)


  const [recentShippingAddress, setRecentShippingAddress] = React.useState<ShippingAddress[]>()


  const [shippingAddress, setShippingAddress] = React.useState<any>({
    first_name: "rasel",
    last_name: "mahmud",
    phone: 1785513535,
    post_code: 5826,
    state: "Bogra",
    city: "sonatola",
    address: "harikhali",
    apartment_suit: "",
    country: "Bangladesh",
  })


  React.useEffect( ()=>{
    (async function () {
      if(auth.id) {
        let response = await api.get(`/api/shipping-addresses/${auth.id}`)
        setRecentShippingAddress(response.data)
      }
    }())
  }, [auth.id])

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
      <div className="container">
          <Button
            onClick={()=> setShowAddShippingForm(true)}
            bg="#c9ffd656"
            color="red"
            m={0}
            p={0}
            block={true}
            radius={'4px'}
            size="large"
            border="1.5px dashed #aaffa0d7" >+ Add Address
          </Button>
          <Divider lineHeight={1} lineColor="#d9d9d" />

          {recentShippingAddress && recentShippingAddress.map((sp: any)=>(
             <div className="address_book">
              <div className="">
                <i className="fa fa-map-marker-alt" />
              </div>
              <div>
                <h4>{sp.first_name}</h4>
                <h4>{sp.last_name}</h4>
                <h4>{sp.phone}</h4>
                <p>
                 <Badge
                  count={"Home"}
                  style={{
                    backgroundColor: '#797ffeed',
                    color: '#fff',
                   //boxShadow: '0 0 0 1px #d9d9d9 inset'
                  }}
                  />
                  west tekani Sonatola Bogra
                </p>
                <Badge
                  count={"Default Shipping Address"}
                  style={{
                    backgroundColor: '#fff',
                    color: 'black',
                   boxShadow: '0 0 0 1px #d9d9d9 inset'
                  }}
                  />
              </div>
              <div className="edit_shipping_button">
                <i onClick={()=>updateShippingFormHandle(sp._id)}  className="fa fa-pen" />
              </div>
          </div>
          ))}

          { isShowAddShippingForm && renderShippingAddress() }


      </div>
    )
}

export default AddressBook