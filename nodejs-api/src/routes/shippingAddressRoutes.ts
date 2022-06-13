import {Application} from "express";

import controllers from "../controllers"
import {auth} from "../middleware";

const shippingAddressRoutes = (app: Application)=>{
  app.get("/api/shipping-addresses/:customer_id", auth, controllers.shippingAddressController.getShippingAddress)
  app.post("/api/shipping-address", auth, controllers.shippingAddressController.addShippingAddress)
  

  
  // router.HandleFunc("/api/reviews/{product_id}", controllers.FetchProductCustomerRatings).Methods("GET")
  // router.HandleFunc("/api/specification/{id}", controllers.FetchProductSpecification).Methods("GET")
  // router.HandleFunc("/api/product_questions/{id}", controllers.FetchProductQuestions).Methods("GET")
  //
  // router.HandleFunc("/api/product/{id}", controllers.FetchProduct).Methods("GET")
  //
  // router.HandleFunc("/api/filter-products", controllers.FilterProduct).Methods("POST")
  // router.HandleFunc("/api/v2/filter-products", controllers.FilterProductV2).Methods("POST")
  //
  // // router.HandleFunc("/api/products-count/{authorId}", controllers.ProductCount).Methods("GET")
  // //
  // // router.HandleFunc("/api/filter-products-count/{authorId}", controllers.FilterProductCount).Methods("POST")
  // //
  // // // router.HandleFunc("/api/products/{authorId}", controllers.FetchAdminProduct).Methods("GET")
  //
  // router.HandleFunc("/api/products/update/{id}", middleware.IsAdmin(controllers.UpdateProduct)).Methods("PUT")
  // router.HandleFunc("/api/products/add", middleware.IsAdmin(controllers.AddProduct)).Methods("POST")
  //
  // // router.HandleFunc("/api/delete-product/{id}", middleware.IsAuth(controllers.DeleteProduct)).Methods("POST")
  // // router.HandleFunc("/api/fetch-brand", controllers.GetBrand).Methods("GET")
  // // router.HandleFunc("/api/add-brand", controllers.AddBrand).Methods("POST")
  //
  // router.HandleFunc("/api/top-wishlist-products", controllers.TopWishlistProducts).Methods("GET")
  //
  // router.HandleFunc("/api/latest-products", controllers.LatestProducts).Methods("GET")
  // router.HandleFunc("/api/homepage-products", controllers.FetchProductForHomePage).Methods("POST")
  
}

export default shippingAddressRoutes