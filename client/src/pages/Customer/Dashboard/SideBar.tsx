import React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {RootStateType} from "store/index";
import "./styles.scss"
import {
  faCartPlus,
  faCog, faHandsHelping,
  faHeart, faHomeAlt,
  faShoppingBag,
  faSignOutAlt,
  faStar, faUser
} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Menu from "UI/Menu/Menu";
import {toggleSideBar} from "actions/toolsAction";
import Preload from "UI/Preload/Preload";
import {ActionTypes} from "actions/actionTypes";
import fullLink from "../../../utils/fullLink";


const SideBar = () => {
  
  const { auth } = useSelector((state: RootStateType)=>state)
  
  const navigator = useNavigate()
  const dispatch = useDispatch()
  
  let [collapseIds, setCollapseIds] = React.useState(["123"])
  
  function toggleCollapseSubMenu(id){
    if(collapseIds.indexOf(id) !== -1){
      setCollapseIds([])
    } else{
      setCollapseIds([id])
    }
  }
  
  
  
  function collapseSidebar(){
    dispatch(toggleSideBar({
      where: "admin_dashboard",
      isOpen: false
    }))
  }
  
  const sidebarData =  [
    {
      id: 123,
      name: "Dashboard",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faHomeAlt} />
        </div>
      ),
      to: `/auth/customer`
    },
    {
      menu_section_name: "Manage My Account",
      name: "My Account",
      id: 1,
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faUser} />
        </div>
      ),
      sub_menu: [
        {name: "Account Information",
          onClick: collapseSidebar,
          to: "/auth/customer/account-info",
        },
        {name: "Address Book",
          onClick: collapseSidebar,
          to: "/auth/customer/address-book"
        },
        // {name: "Payment Option", to: "/dashboard/brands"},
        // {name: "Vouchers", to: "/dashboard/brands"},
      ]
    },
    {
      menu_section_name: "Orders",
      name: "Orders",
      id: 2,
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faUser} />
        </div>
      ),
      sub_menu: [
        {
          name: "My Orders",
          onClick: collapseSidebar,
          to: "/auth/customer/my-orders",
          iconRender: ()=> (
            <div className="mr-2">
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
          ),
        },
        {name: "My Returns"},
        {name: "My Cancellations"},
      ]
    },
    {
      name: "My Reviews",
      onClick: collapseSidebar,
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faStar} />
        </div>
      ),
      to: "/auth/customer/my-reviews",
      id: 33,
      logo: "fa fa-star"
    },
    {
      name: "My Cart",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faCartPlus} />
        </div>
      ),
      onClick: collapseSidebar,
      to: "/auth/customer/my-carts",
      id: 34,
      logo: "fa fa-star"
    },
    {
      name: "My Wishlist & Followed Stores",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      ),
      onClick: collapseSidebar,
      to: "/auth/customer/my-wishlist",
      id: 35,
      logo: "fa fa-star"
    },
    {
      name: "Setting",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faCog} />
        </div>
      ),
      onClick: ()=> {},
      id: 3,
      logo: ""
    },
    {
      name: "Policies",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faCog} />
        </div>
      ),
      onClick: ()=> {},
      id: 4,
      logo: ""
    },
    {
      name: "Help",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faHandsHelping} />
        </div>
      ),
      onClick: ()=> {},
      id: 5,
      logo: ""
    },
    {
      name: "Sign Out",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
      ),
      onClick: ()=>{
        dispatch({type: ActionTypes.LOGOUT})
        navigator("/")
      },
      id: 6,
      logo: ""
    }
    // {
    //   menu_section_name: "My Reviews",
    //   items: [
    //     "My Reviews"
    //   ]
    // },
    // {
    //   menu_section_name: "My Wishlist & Followed Stores",
    //   items: []
    // }
  ]
  

  
  return (
    <div className="dashboard-sidebar custom-scrollbar">
      <div className="sidebar">
        
        
        <div className="sidebar-author">
          <div className="author_avatar mx-auto">
            <img src={fullLink(auth.avatar)} alt="author-avatar" className="mx-auto"/>
          </div>
          <h4 className="author-name">{auth.username}</h4>
          <p className="author-position">Customer</p>
        </div>
        
        
        <ul className="sidebar-menu">
  
          <div className="sidebar">
            { sidebarData.map((data: any)=>(
              <div>
                {/*<label style={{fontSize: 13, marginLeft: "10px", color: "pink"}} htmlFor="">{data.menu_section_name}</label>*/}
                <Menu selectedKeys={collapseIds}>
                  { data.sub_menu ? (
                     <Menu.SubMenu onClick={toggleCollapseSubMenu}
                         key={data.id.toString()}
                         title={<>
                         <div className="flex">
                           { data.iconRender && data.iconRender() }
                           <span>{data.name}</span>
                         </div>
                         </>}
                     >
                       {data.sub_menu && data.sub_menu.map(s=>(
                         <Menu.Item key={s.name}>
                           <div className="flex">
                             { s.iconRender && s.iconRender() }
                             { s.to ? (
                               <Preload onClick={s.onClick && s.onClick} to={s.to}>{s.name}</Preload>
                             ) : (
                               <div onClick={s.onClick && s.onClick}>{s.name}</div>
                             ) }
                           </div>
                         </Menu.Item>
                       ))}
                    
                     </Menu.SubMenu>
          
                  ) : (
                    <Menu.Item icon={data.logo} key={data.id.toString()}>
                      { data.to ? (
                          <Preload onClick={data.onClick && data.onClick} to={data.to}>
                            <div className="flex" onClick={data.onClick}>
                              { data.iconRender && data.iconRender() }
                              {data.name}
                            </div>
                          </Preload>
                      ) : (
                        <div onClick={data.onClick && data.onClick}  className="flex">
                          {data.iconRender && data.iconRender() }
                          {data.name}
                        </div>
                      ) }
                    </Menu.Item>
                  ) }
                </Menu>
              </div>
            )) }
          </div>
          
        </ul>
      </div>
    </div>
  )
}


export default SideBar