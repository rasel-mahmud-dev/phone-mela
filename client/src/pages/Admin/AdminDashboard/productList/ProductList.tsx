import React from 'react';
import api from 'src/apis/api';

import Table from "components/UI/Table/Table";
import fullLink from 'src/utils/fullLink';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPen, faTrash, faTrashAlt} from "@fortawesome/pro-regular-svg-icons";
import {ProductType} from "reducers/productReducer";
import {Outlet, useNavigate} from "react-router-dom";


const ProductList = () => {
  
  const [products, setProducts] = React.useState([])
    const navigate = useNavigate()
  
  React.useEffect(()=>{
    api.get("/api/products").then(r=>{
      if(r.status === 200){
        setProducts(r.data)
      }
    }).catch(ex=>{
    
    })
    
  }, [])
  
  let data: any[] = [...products]
  
  function updateHandler(prod: ProductType) {
    navigate(`/admin/dashboard/products/add-product/${prod._id}?callback=/admin/dashboard/products/product-list`)
  }
  
  function handleDelete(id: string) {
  
  }
  
  let columns = [
    {
      title: "Cover",
      key: "1",
      dataIndex: "cover",
      render: (text: string)=> <div style={{width: "40px"}}><img style={{width: "100%"}} src={fullLink(text)} /></div>
    },
    {
      title: "ID",
      key: "1122",
      dataIndex: "id",
      sorter: {
        compare: (a:any, b:any)=> a._id > b._id ? 1 : a._id < b._id ? -1 : 0
      }
    },
    {
      title: "Title",
      key: "1",
      dataIndex: "title",
      width: 200,
      sorter: {
        compare: (a: any, b: any)=> {
          if(a.title.toLowerCase() > b.title.toLowerCase()){
            return 1
          } else if(a.title.toLowerCase() < b.title.toLowerCase()){
            return -1
          } else {
            return 0
          }
        }
      },
      render: (text: string)=> text
        // <Tooltip theme="simple-white" tooltip={text}><a>{text.slice(0, 20)}{.length > 21 && "..."}</a></Tooltip>
      
    },
    {
      title: "Created At",
      key: "3",
      dataIndex: "createdAt",
      width: 150,
      render: (text: string) => new Date(text).toDateString(),
      sorter: {
        compare: (a: any, b: any)=> {
          if(a.createdAt > b.createdAt){
            return 1
          } else if(a.createdAt < b.createdAt){
            return -1
          } else {
            return 0
          }
        }
      },
    },
    {
      title: "Actions",
      key: "45435",
      width: 100,
      render: (product: ProductType) =>{
        return (
          <span className="d-flex">
            <button onClick={() => updateHandler(product)}  className="btn">
                   <FontAwesomeIcon className="text-sm mr-1" icon={faPen} />
              <span>Edit</span>
            </button>
             <button onClick={() => handleDelete(product._id)} className="btn">
               <FontAwesomeIcon className="text-sm mr-1" icon={faTrash} />
               <span>Delete</span>
             </button>
          </span>
        )
      }
    }
  ]

  return (
    <div>
      {/*<Outlet />*/}
      <h1>Product List ({products.length})</h1>
      <Table dataSource={data} columns={columns} fixedHeader={true} scroll={{y: '80vh'}} />
      
      {/*<Outlet />*/}
    </div>
  );
};

export default ProductList;