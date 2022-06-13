import { Application} from "express";

import authRoutes  from "./authRoutes"
import brandRoutes  from "./brandRoutes"
import cartRoutes  from "./cartRoutes"
import orderRoutes  from "./orderRoutes"
import productRoutes  from "./productRoutes"
import wishlistRoutes  from "./wishlistRoutes"
import shippingAddressRoutes  from "./shippingAddressRoutes"

const routes = (app: Application)=> {
  authRoutes(app)
  brandRoutes(app)
  cartRoutes(app)
  orderRoutes(app)
  productRoutes(app)
  wishlistRoutes(app)
  shippingAddressRoutes(app)
  
  
  // app.get('/', postController.getHomePage)
  // app.post("/api/registration", userController.userRegistration)
  // app.post("/api/post", postController.getPost)
  // app.post("/api/login", userController.userLogin)
  // app.post("/api/registration", userController.userRegistration)
  // app.get("/api/fetch-login", userController.fetchLogin)
  // app.get("/api/logout", userController.logout)
  //
  //
  // /* GET update post page  */
  // // app.get('/update-post/:slug', postController.getUpdatePostPage)
  //
  //
  // // save a new post
  // app.post('/api/add-post', admin, postController.addPostHandler)
  // app.post('/api/add-category', admin, postController.addCategoryHandler)
  // app.post('/api/update-post', admin, postController.updatePost)
  //
  // app.delete('/api/post/:post_id', admin, postController.deletePost)
  //
  // app.post('/api/sidebar_data', postController.getSidebarData)
  //
  // app.get('/api/categories', postController.getCategories)
}




export default routes
