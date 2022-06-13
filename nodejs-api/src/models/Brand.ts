export type BrandType = {
  _id?: string
  name: string
  createdAt?: Date
}

import mongoose from "mongoose";
import {ObjectFlags} from "../types";


const schemaObject: ObjectFlags<BrandType> = {
  name: {
    type: String,
    unique: true,
    index: true
  }
}

mongoose.model('Brand', new mongoose.Schema(schemaObject, {timestamps: true}));
