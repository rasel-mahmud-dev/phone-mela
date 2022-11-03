import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import("./DashboardSideBar.scss")



const DashboardSideBar = (props) => {
  const { auth: {auth} } = props
  
  const [state, setState] = React.useState( [
    {
      title: "Dashboard",
      path: "/admin/dashboard"
    },
    {
      id: 1,
      title: "Products",
      menu: [
        {title: "Category", path: "/admin/dashboard/products/category"},
        {title: "Sub Category", path: "/admin/dashboard/products/sub-category"},
        {title: "Product List", path: "/admin/dashboard/products/product-list"},
        {title: "Product Detail", path: "/admin/dashboard/products/product-detail"},
        {title: "Add Product", path: "/admin/dashboard/products/add-product/null"},
      ]
    },
    {
      id: 2,
      title: "Sales",
      menu: [
          {
            title: "Order",
            path: "/dashboard/sales/orders",
          },
          {
            title: "Transactions",
            path: "/dashboard/sales/transactions",
          }
        ]
      },
    {
      id: 3,
      title: "Server",
      menu: [
        {
          title: "Logs",
          path: "/admin/dashboard/server/logs",
        }
      ]
    }
    ])
  const [ expandIds, setExpandIds ] = React.useState(null)
  
  function expandMenu(id){
    // let index = expandIds.findIndex(i=>i === id)
    // if (index !== -1) {
    if (expandIds !== id){
      setExpandIds(id)
    } else{
      setExpandIds(null)
    }
    // }
    // } else{
    //   setExpandIds([...expandIds, id])
    // }
  }
  
  React.useEffect(()=>{
  
  })
  

  
  return (
    <div className="dashboard-sidebar">
      <div className="sidebar">
        <div className="sidebar-author">
          <div className="author_avatar mx-auto">
            <img src={auth?.avatar} alt="author-avatar" className="mx-auto"/>
          </div>
          <h4 className="author-name">{auth?.username}</h4>
          <p className="author-position">GENERAL MANAGER</p>
        </div>
        
        
        <ul className="sidebar-menu">
          
          { state.map(item=>{
            return (
              <li className="sidebar-item">
                {  item.menu  ? (
                 <React.Fragment>
                  
                  <div className="up flex" onClick={()=>expandMenu(item.id)} >
                    <a href="javascript:void(0)" className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      <span>{item.title}</span>
                    </a>
                    <i className={["fa", item.id && expandIds === item.id ? "fa-angle-down" : "fa-angle-right"].join(" ")} />
                  </div>
                   {item.id && expandIds === item.id && <div className="nested-menu">
                     { item.menu && item.menu.map(item2 => (
                       <>
                         <li className="nested-menu--item">
                           <Link to={item2.path} className="item--left flex">
                             <i className="fa fa-circle"/>
                             <span>{item2.title}</span>
                           </Link>
                           <i className="far fa-angle-right"/>
                         </li>
                         <div className="nested-menu_nested">
                         { item2.subMenu && item2.subMenu.map(subMenu=>(
                           <li className="nested-menu_nested--item flex">
                             <i className="fa fa-circle"/>
                             <Link to={subMenu.path}>
                               <span>{subMenu.title}</span>
                             </Link>
                           </li>
                         ))}
                         </div>
                       </>
                     ))}
                    </div>
                   }
                 
                 </React.Fragment>
                ) : (
                  <div className="up flex">
                    <Link to={item.path} className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      <span>{item.title}</span>
                    </Link>
                  </div>
                )
                }
            </li>
            )
          }) }
          
          
          
          {/*<li className="sidebar-item">*/}
          {/*  <a href="http://localhost:9000/admin/dashboard">*/}
          {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>*/}
          {/*    <span>Dashboard</span>*/}
          {/*  </a>*/}
          {/*  <i className="fa fa-angle-right"></i>*/}
          {/*</li>*/}
          
          {/*<li className="sidebar-item">*/}
          {/*  <a href="http://localhost:9000/admin/dashboard">*/}
          {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>*/}
          {/*    <span>Products</span>*/}
          {/*  </a>*/}
          {/*  <i className="fa fa-angle-right"></i>*/}
          {/*</li>*/}
          
          {/*<li className="sidebar-item">*/}
          {/*  <a href="http://localhost:9000/admin/dashboard">*/}
          {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>*/}
          {/*    <span>Sales</span>*/}
          {/*  </a>*/}
          {/*  <i className="fa fa-angle-right"></i>*/}
          {/*</li>*/}
          
          {/*<li className="sidebar-item">*/}
          {/*  <a href="http://localhost:9000/admin/dashboard">*/}
          {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>*/}
          {/*    <span>Customers</span>*/}
          {/*  </a>*/}
          {/*  <i className="fa fa-angle-right"></i>*/}
          {/*</li>*/}
          
        </ul>
        
        
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, {})(DashboardSideBar);