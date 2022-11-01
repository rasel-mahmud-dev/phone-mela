import mongoose from "mongoose";
import {ObjectFlags} from "../types";


export interface ProductType{
  _id?: string
  title: string
  brand_id: string
  discount: string
  price: string
  sold: string
  views: string
  author_id: string
  seller_id: string
  stock: number
  cover: string
  tags: string[]
  attributes: object
  details_id: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}


const schemaObject: ObjectFlags<ProductType> = {
  title: {
    type: String,
    unique: true,
    index: true
  },
  cover: String,
  description: String,
  brand_id: {
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand"
  },
  author_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  seller_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  details_id: {type: mongoose.Schema.Types.ObjectId, ref: "ProductDetails"},
  discount: Number,
  price: Number,
  stock: Number,
  sold: {
    type: Number,
    index: true,
  },
  attributes: {type: Map},
  tags: [String],
  views: Number
}

export default mongoose.model('Product', new mongoose.Schema(schemaObject, {timestamps: true}));
