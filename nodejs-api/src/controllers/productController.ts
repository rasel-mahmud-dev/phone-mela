import {ProductType} from "../models/Product";
import mongoose, {mongo, Schema} from "mongoose";
import {ApiRequest, ApiResponse} from "../types";
import {ObjectId} from "bson";


const Product = mongoose.model("Product")


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


export const fetchProduct = async (req: ApiRequest, res: ApiResponse)=> {
  
  const { id } = req.params
  
  try {
  
    let data = await Product.aggregate([
      {
        $match: {
          _id: new ObjectId(id as string)
        }
      },
      {
        $lookup: {
          from: "reviews",
          foreignField: "product_id",
          localField: "_id",
          as: "ratings"
        }
      },
      {
        $addFields: {
          averageRate: {
            $avg: "$ratings.rate"
          }
        }
      },
      {
        $lookup: {
          from: "brands",
          foreignField: "_id",
          localField: "brand_id",
          as: "brand"
        }
      },
      { $unwind: {path: "$brand", preserveNullAndEmptyArrays: true}},
  
    ])
  
    if(data[0]){
      res.status(200).send(data[0])
    }
    
  } catch (ex){
      res.status(500).send({})
  }

}


export const addProduct = async (req: Request, res: ApiResponse)=> {


}



interface BodyMy{
  type: "latest" |  "top_discount" | "top_rating" | "top_sales"
}



interface HomePageProductResponse{
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
export const fetchHomePageProducts = async (req: Omit<Request,'body'> & { body: BodyMy }, res: ApiResponse<HomePageProductResponse[]>)=> {
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
    
    products = await Product.aggregate([
      {
        $lookup: {
          from: "reviews",
          foreignField: "product_id",
          localField: "_id",
          as: "ratings"
        }
      },
      {
        $addFields: {
          averageRate: {
            $avg: "$ratings.rate"
          }
        }
      },
      {
        $sort: {
          averageRate: -1
        }
      },
      { $limit: 10 }
    ])
    
    
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






type FilterProductIncomingData = {
 
  in: { // reserved keyword
    brand_id: string[],
    ram: number[]
    cores: number[]
    display: string[]
    network_type: string[]
    processor_brand: string[]
    resolution_type: string[]
    screen_size: number[]
    os_version: string[]
    operating_system: string[]
  }
  order: {
    field: "createdAt" | "price" | "title",
    by: "desc" | "asc"
  }
  pagination: { page_size: number, page_number: string }
  range: {
    internal_storage: [][]
    primary_camera: [][]
    secondary_camera: [][]
    battery: [][]
  }
  search: {
    title: string
  } | null
}

export const filterProducts = async (req: ApiRequest<FilterProductIncomingData>, res: ApiResponse)=> {
  let {
    in: include,
    order,
    pagination,
    range,
    search
  } = req.body
  
  
  try{
    

    
    let includeAttributes = {
      // "attributes.ram": {$in: [2]},
      // "attributes.cores": {$in: [2]},
      // "attributes.display": {$in: [2]},
      // "attributes.network_type": {$in: [2]},
      // "attributes.processor_brand": {$in: [2]},
      // "attributes.resolution_type": {$in: [2]},
      // "attributes.screen_size": {$in: [2]},
      // "attributes.os_version": {$in: [2]},
      // "attributes.operating_system": {$in: [2]},
    }
    

  
    for (let includeKey in include) {
      if(includeKey === "brand_id"){
        // convert all string _id to mongodb ObjectId
        let objectIds = []
        include[includeKey] && include[includeKey].length > 0 && include[includeKey].map(id=>{
          objectIds.push(new ObjectId(id))
        })
        // now send match filter like { $match: { brand_id: {$in: [ObjectIds] }}}
        if(objectIds.length > 0) {
          includeAttributes[includeKey] = objectIds
        }
        
      } else {
        let values = []
        // all like attributes
        include[includeKey] && include[includeKey].length > 0 && include[includeKey].map(item=>{
          if(typeof item === "string"){
            values.push(item)
          } else if (typeof item === "number"){
            values.push(item)
          }
        })
        if(values.length > 0) {
          includeAttributes["attributes." + includeKey] = {$in: values}
        }
      }
    }
    
    
    
    
    let rangeFilter = []
    // range: {internal_storage: [[64, 127], [128, 255]]}
    
    
    // [
    //   {"attributes.primary_camera": { $gt: 31, $lte: 64} },
    //   {"attributes.secondary_camera": { $gt: 31, $lte: 64} },
    // ]
    
    for (let rangeKey in range) {
      
      // { attributes.primary_camera: { '$gt': 64, '$lte': 108 } }
      let eachAttributePair = {}
    
      if(range[rangeKey] && range[rangeKey].length > 0) {
  
        let twoDimension = range[rangeKey]
  
        // { '$gte': 64, '$lte': 108 } }
        let gtLteCompare = {};
  
        for (let i = 0; i < twoDimension.length; i++) {
          let eachValuePair = twoDimension[i]
          gtLteCompare["$gte"] = eachValuePair[0]
          gtLteCompare["$lte"] = eachValuePair[1]
        }
        eachAttributePair['attributes.' + rangeKey] = gtLteCompare
  
      }
      
      rangeFilter.push(eachAttributePair)
      
    }
  
    let andFilter;
    if(rangeFilter.length > 0){
      andFilter = { $and: [...rangeFilter]}
      console.log(andFilter.$and)
    }
  
    let searchFilter;
    if(search){
      for (let searchKey in search) {
        if(searchKey === "title") {
          searchFilter = {}
          searchFilter[searchKey] = {
            $regex: new RegExp(search[searchKey], "i"),
          }
        }
      }
    }

    let sorting;
    if(order){
      sorting = { $sort: {
          [order.field]: order.by === "asc" ? 1 : -1
        }
      }
    }
    
    
    let data = await Product.aggregate([
      {
        $match: {
          // brand_id: {$in: [new ObjectId("62a638e8bf617d070dc47301"), new ObjectId("62a638e8bf617d070dc47302")]},
          ...includeAttributes,
          ...andFilter,
          // $and: [ { 'attributes.internal_storage': { '$gt': 10, '$lte': 127 } } ]

          // title: { $regex: /gal/i},
          ...searchFilter
          
          // $and: [
            // {"attributes.primary_camera": { $gt: 31, $lte: 64} },
            // {"attributes.secondary_camera": { $gt: 31, $lte: 64} },
          // ]
        }
      },
      
      
      // { $unwind: {path: "$order", preserveNullAndEmptyArrays: true} },
      
      // { $addFields: {
      //     "totalPrice":  "$order.price"
      //   }},
      
      // { $project: {
      //     order: 0,
      //     product: 0
      //   } },
  
      {
        $lookup: {
          from: "orders",
          foreignField: "product_id",
          localField: "_id",
          as: "order"
        }
      },
    {
      $addFields: {
        sold: {
          $size: "$order"
        }
      }
    },
    {
      $lookup: {
        from: "brands",
          foreignField: "_id",
          localField: "brand_id",
          as: "brand"
      }
    },
    { $unwind: {path: "$brand", preserveNullAndEmptyArrays: true} },
    {...sorting},
      
      
    ])
  
    // console.log(data.map(d=>d.order))
    
    
    res.json({products: data})
    
    
    
  } catch (ex){
    console.log(ex)
  }
  
}
