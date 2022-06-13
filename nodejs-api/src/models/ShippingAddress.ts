export type ShippingAddressType = {
  _id?: string
  customer_id: string
  firstName: string
  lastName: string
  phone: number
  post_code: number
  city: string
  state: string
  address: string
  apartment_suit: string
  country: string
  email?: string
  createdAt: Date
  isDefault: boolean
}

import mongoose from "mongoose";
import {ObjectFlags} from "../types";

const schemaObject: ObjectFlags<ShippingAddressType> = {
  address: String,
  apartment_suit: String,
  city: String,
  country: String,
  createdAt: Date,
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  firstName: String,
  isDefault: { type: Boolean, default: true },
  lastName: String,
  phone: Number,
  post_code: Number,
  state: String,
  email: String
}

mongoose.model(
  'ShippingAddress',
  new mongoose.Schema(schemaObject, {timestamps: true})
);
