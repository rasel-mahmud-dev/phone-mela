type ProductDetailsType = {
  _id?: string
  product_id: string
  description: string
  specifications: string
  highlights: string
  ram: string
  storage: string
  colors: string
}


import mongoose from "mongoose";
import {ObjectFlags} from "../types";


const schemaObject: ObjectFlags<ProductDetailsType> = {
  
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    unique: true,
    index: true
  },
  description: String,
  specifications: String,
  highlights: String,
  ram: String,
  storage: String,
  colors: String,
}

mongoose.model('ProductDetails', new mongoose.Schema(schemaObject, {timestamps: true}));
