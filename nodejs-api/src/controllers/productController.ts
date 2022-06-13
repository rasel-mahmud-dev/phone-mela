import {ProductType} from "../models/Product";
import mongoose, {mongo} from "mongoose";
import {ApiResponse} from "../types";

const mysql = require('mysql2');

export function connect(){
// create the connection to database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'app3_database',
    password: "12345"
  })
  return connection
}



export const fetchProducts = async (req: Request, res: ApiResponse)=> {


}


export const addProduct = async (req: Request, res: ApiResponse)=> {


}



interface BodyMy{
  type: "latest" |  "top_discount" | "top_rating" | "top_sales"
}



interface HomePageProduct{
  _id: string
  title: string
  cover: string
  brand_id: string
  author_id: string
  seller_id: string
  details_id: string
  discount: string
  price: number
  stock: number
  attributes: object,
  tags: string[],
  updatedAt: Date,
  createdAt: Date,
}
export const fetchHomePageProducts = async (req: Omit<Request,'body'> & { body: BodyMy }, res: ApiResponse<HomePageProduct[]>)=> {
  const Product = mongoose.model("Product")
  
  // const connection = connect()
  // connection.execute("SELECT * from products", function(err, rows, fields) {
  //   rows.forEach(item=>{
  //     const {
  //       title,
  //       created_at,
  //       updated_at,
  //       description,
  //       price,
  //       author_id,
  //       brand_id,
  //       cover,
  //       tags,
  //       attributes,
  //       seller_id,
  //       discount,
  //       stock,
  //       sold,
  //       views,
  //       specification_id,
  //     } = item
  //     let p: ProductType = {
  //       title: title,
  //       attributes: attributes,
  //       author_id: "62a61e994fcef281a80766c7",
  //       brand_id: "62a638e8bf617d070dc47301",
  //       cover: cover,
  //       details_id: "000000000000000000000000",
  //       discount: discount,
  //       price: price,
  //       seller_id: "62a61e994fcef281a80766c7",
  //       sold: sold,
  //       stock: stock,
  //       tags: tags,
  //       views: views,
  //       createdAt: created_at,
  //       updatedAt: updated_at,
  //     }
      // Product.insertMany(p)
      // let product = new Product(p)
      // console.log(product)
  //   })
  // })
  
  let products = []
  const {type} = req.body
  if(type === "latest"){
    products = await  Product.find({}).sort({ createdAt: 'desc'}).limit(10)
  
  } else if(type === "top_discount"){
    products = await  Product.find({}).sort({ discount: 'desc'}).limit(10)
    
  } else if(type === "top_rating"){
    products = await Product.find({}).sort({ discount: 'desc'}).limit(10);
    
  } else if(type === "top_sales"){
    const Sales = mongoose.model("Sales")
    products = await Sales.aggregate([
      {$group: {
        "_id": {
          product_id:  "$product_id",
          order_id:  "$order_id",
        },
          sold: { $sum: 1 }
        },
        },
      { $addFields: {
          "product_id":  "$_id.product_id",
          "order_id":  "$_id.order_id"
        }},
      { $project: { _id: 0 }},
      { $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product"
      }},
      { $unwind: {path: "$product", preserveNullAndEmptyArrays: true} },
      { $addFields: {
          "cover":  "$product.cover",
          "title":  "$product.title",
          "price":  "$product.price",
          "discount":  "$product.discount",
          "_id":  "$product._id",
      }},
      { $lookup: {
          from: "orders",
          localField: "order_id",
          foreignField: "_id",
          as: "order"
        }},
      { $unwind: {path: "$order", preserveNullAndEmptyArrays: true} },
      { $addFields: {
          "totalPrice":  "$order.price"
      }},
      { $project: {
          order: 0,
          product: 0
      } },
      { $sort: { sold: -1 } },
      { $limit: 20 }
    ])
  }
  
  res.send(products)
  
}


export const topWishlistProducts = async (req: Request, res: ApiResponse)=> {


}
