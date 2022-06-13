import mongoose from "mongoose";
import {ObjectFlags} from "../types";

type ShipperType = {
  _id?: string
  shipper_name: string
  address: string
  phone: string
  email: string
}



const schemaObject: ObjectFlags<ShipperType> = {
  shipper_name: String,
  address: String,
  phone: String,
  email: String,
}


mongoose.model('Shipper', new mongoose.Schema(schemaObject, {timestamps: true}));
