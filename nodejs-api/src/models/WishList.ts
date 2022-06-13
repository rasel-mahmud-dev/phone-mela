
import mongoose from "mongoose";
import {ObjectFlags} from "../types";

export type WishListType = {
  _id?: string
  product_id: string
  customer_id: string
  createdAt?: string
}


const schemaObject: ObjectFlags<WishListType> = {
  product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product", index: true},
  customer_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", index: true},
}


mongoose.model('Wishlist', new mongoose.Schema(schemaObject, {timestamps: true}));
