import {Application} from "express";

import controllers from "../controllers"

const brandRoutes = (app: Application)=>{
  
  app.get("/api/brands", controllers.brandController.fetchBrands)
  
}
export default brandRoutes