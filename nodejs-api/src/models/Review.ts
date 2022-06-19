import {ObjectFlags} from "../types";
import mongoose from "mongoose";

export interface ReviewType{
  _id?: string
  product_id: string
  customer_id: string
  rate: number
  summary: string
  title: string
  createdAt?: Date
  customerUploads: string[]
}



const schemaObject: ObjectFlags<ReviewType> = {
  product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
  customer_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  rate: {type: Number, required: true},
  summary: String,
  title: String,
  customerUploads: [String],
}

mongoose.model('Review', new mongoose.Schema(schemaObject, {timestamps: true}));
