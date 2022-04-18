import React from 'react';
import {connect, useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {RootStateType} from "store/index";
import "./styles.scss"
import {
  faCartPlus,
  faCog, faHandsHelping,
  faHeart,
  faShoppingBag,
  faSignOutAlt,
  faStar
} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Menu from "UI/Menu/Menu";


const SideBar = () => {
  
  const { auth } = useSelector((state: RootStateType)=>state)
  
  const navigator = useNavigate()
  
  const [state, setState] = React.useState( [
    {
      title: "Your Cart",
      iconRender: ()=> (
        <div>
          <FontAwesomeIcon icon={faCartPlus} />
        </div>
      ),
      path: "/auth/customer/cart"
    },
    {
      id: 1,
      title: "Your Wishlist",
      path: "/auth/customer/wishlist",
      iconRender: ()=> (
        <div>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      ),
    },
    {
      id: 2,
      title: "Your Orders",
      path: "/auth/customer/orders",
      iconRender: ()=> (
        <div>
          <FontAwesomeIcon icon={faShoppingBag} />
        </div>
      ),
    },
    {
      id: 3,
      title: "Server",
      iconRender: ()=> (
        <div>
          <FontAwesomeIcon icon={faCartPlus} />
        </div>
      ),
    }
  ])
  
  const sidebarData =  [
    {
      id: 0,
      name: "Dashboard",
      logo: "",
      to: `/customer/${auth.id ? auth.username : "guest"}`
    },
    {
      menu_section_name: "Manage My Account",
      name: "My Account",
      id: 1,
      logo: "fa fa-user",
      sub_menu: [
        {name: "Account Information",
          onClick: ()=> navigator("/auth/customer/account-info"),
        },
        {name: "Address Book",
          onClick: ()=> navigator("/auth/customer/address-book")
        },
        {name: "Payment Option", to: "/dashboard/brands"},
        {name: "Vouchers", to: "/dashboard/brands"},
      ]
    },
    {
      menu_section_name: "Orders",
      name: "Orders",
      id: 2,
      logo: "fa fa-user",
      sub_menu: [
        {
          name: "My Orders",
          onClick: ()=> alert("hi"),
          iconRender: ()=> (
            <div className="mr-2">
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
          ),
        },
        {name: "My Returns", to: "/dashboard/brands"},
        {name: "My Cancellations", to: "/dashboard/brands"},
      ]
    },
    {
      name: "My Reviews",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faStar} />
        </div>
      ),
      onClick: ()=> navigator("/auth/customer/wishlist"),
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
      onClick: ()=> navigator("/auth/customer/cart"),
      id: 33,
      logo: "fa fa-star"
    },
    {
      name: "My Wishlist & Followed Stores",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      ),
      onClick: ()=> navigator("/auth/customer/wishlist"),
      id: 33,
      logo: "fa fa-star"
    },
    {
      name: "Setting",
      iconRender: ()=> (
        <div className="mr-2">
          <FontAwesomeIcon icon={faCog} />
        </div>
      ),
      onClick: ()=> navigator("/auth/customer/wishlist"),
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
      onClick: ()=> navigator("/auth/customer/wishlist"),
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
      onClick: ()=> navigator("/auth/customer/wishlist"),
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
      onClick: ()=> navigator("/auth/customer/wishlist"),
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
  
  let [collapseIds, setCollapseIds] = React.useState(["2"])
  
  function toggleCollapseSubMenu(id){
    if(collapseIds.indexOf(id) !== -1){
      setCollapseIds([])
    } else{
      setCollapseIds([id])
    }
  }
  
  return (
    <div className="dashboard-sidebar custom-scrollbar">
      <div className="sidebar">
        
        
        <div className="sidebar-author">
          <div className="author_avatar mx-auto">
            <img src={auth.avatar} alt="author-avatar" className="mx-auto"/>
          </div>
          <h4 className="author-name">{auth.username}</h4>
          <p className="author-position">GENERAL MANAGER</p>
        </div>
        
        
        <ul className="sidebar-menu">
  
          <div className="sidebar">
            { sidebarData.map(data=>(
              <div>
                {/*<label style={{fontSize: 13, marginLeft: "10px", color: "pink"}} htmlFor="">{data.menu_section_name}</label>*/}
                <Menu selectedKeys={collapseIds}>
                  { data.sub_menu ? (
                     <Menu.SubMenu onClick={toggleCollapseSubMenu}
                         key={data.id.toString()}
                         title={<h1><i className={data.logo}/><span>{data.name}</span></h1>}
                     >
                       {data.sub_menu && data.sub_menu.map(s=>(
                         <Menu.Item key={s.name}>
                           <div className="flex">
                             { s.iconRender && s.iconRender() }
                             { s.onClick ? (
                               <div onClick={s.onClick}>{s.name}</div>
                             ) : (
                               <Link to={s.to}>{s.name}</Link>
                             ) }
                           </div>
                         </Menu.Item>
                       ))}
                    
                     </Menu.SubMenu>
          
                  ) : (
                    <Menu.Item icon={data.logo} key={data.id.toString()}>
                      { data.onClick ? (
                        <div className="flex" onClick={data.onClick}>
                          { data.iconRender && data.iconRender() }
                          {data.name}
                        </div>
                      ) : (
                        <div className="flex">
                          { data.iconRender && data.iconRender() }
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