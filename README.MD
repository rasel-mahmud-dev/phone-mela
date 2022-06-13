## Phone Mela fullstack ecommerce website, build with Golang/Nodejs, React js and MySQL/Mongodb



### Golang + MYSQL API Endpoint Example
```go

    func ProductRoutes(router *mux.Router) {
        router.HandleFunc("/api/products", controllers.FetchProducts).Methods("GET")
        router.HandleFunc("/api/reviews/{product_id}", controllers.FetchProductCustomerRatings).Methods("GET")
        router.HandleFunc("/api/specification/{id}", controllers.FetchProductSpecification).Methods("GET")
        router.HandleFunc("/api/product_questions/{id}", controllers.FetchProductQuestions).Methods("GET")
        router.HandleFunc("/api/product/{id}", controllers.FetchProduct).Methods("GET")
        router.HandleFunc("/api/filter-products", controllers.FilterProduct).Methods("POST")
        router.HandleFunc("/api/v2/filter-products", controllers.FilterProductV2).Methods("POST")
        router.HandleFunc("/api/products/update/{id}", middleware.IsAdmin(controllers.UpdateProduct)).Methods("PUT")
        router.HandleFunc("/api/products/add", middleware.IsAdmin(controllers.AddProduct)).Methods("POST")
        router.HandleFunc("/api/top-wishlist-products", controllers.TopWishlistProducts).Methods("GET")
        router.HandleFunc("/api/latest-products", controllers.LatestProducts).Methods("GET")
        router.HandleFunc("/api/homepage-products", controllers.FetchProductForHomePage).Methods("POST")
    }
	
    func AuthRoutes(router *mux.Router) {
        router.HandleFunc("/api/sign-up", controllers.Registration).Methods("POST")
        router.HandleFunc("/api/sign-in", controllers.Login).Methods("POST")
        router.HandleFunc("/api/sign-current-user", middleware.IsAuth(controllers.LoginCurrentUser)).Methods("GET")
        router.HandleFunc("/api/get-static-images", middleware.IsAuth(controllers.GetStaticImages)).Methods("POST")
        router.HandleFunc("/api/pay", middleware.IsAuth(controllers.Pay)).Methods("POST")
    }
    
    func OrderRoutes(router *mux.Router) {
        router.HandleFunc("/api/order", middleware.IsAuth(controllers.CreateOrder)).Methods("POST")
        router.HandleFunc("/api/orders", middleware.IsAuth(controllers.GetOrders)).Methods("POST")
        router.HandleFunc("/api/order/{orderId}", middleware.IsAuth(controllers.GetOrder)).Methods("GET")
    }

    func CartRoutes(router *mux.Router) {
        router.HandleFunc("/api/cart-products", middleware.IsAuth(controllers.FetchCartProducts)).Methods("POST")
        router.HandleFunc("/api/add-cart", middleware.IsAuth(controllers.AddToCart)).Methods("POST")
        router.HandleFunc("/api/remove-cart", middleware.IsAuth(controllers.RemoveToCart)).Methods("POST")
    }
    func BrandRoutes(router *mux.Router) {
	    router.HandleFunc("/api/brands", controllers.FetchBrands).Methods("GET")
	}

    func WishlistRoutes(router *mux.Router) {
        router.HandleFunc("/api/wishlist-products", middleware.IsAuth(controllers.FetchWishlistProducts)).Methods("POST")
        router.HandleFunc("/api/add-wishlist", middleware.IsAuth(controllers.AddToWishlist)).Methods("POST")
        router.HandleFunc("/api/remove-wishlist", middleware.IsAuth(controllers.RemoveFromWishlist)).Methods("POST")
    }
    
    // and much more routing....

	
```




### Nodejs + Mongodb API Endpoint Example
I haven't MYSQL database hosting. I cannot host my go app over the internet.
So I create nodejs + mongodb version this api server to free live on netlify.

```js

const productRoutes = (app: Application)=> {
	app.get("/api/products", controllers.productController.fetchProducts)
	app.post("/api/homepage-products", controllers.productController.fetchHomePageProducts)
	app.post("/api/top-wishlist-products", controllers.productController.topWishlistProducts)
	app.post("/api/add-product", admin, controllers.productController.addProduct)
}
const authRoutes = (app: Application)=> {		
	app.post("/api/signup", controllers.authController.userRegistration)
	app.post("/api/sign-in", controllers.authController.login)
	app.get("/api/sign-current-user", controllers.authController.loginCurrentUser)
}
const orderRoutes = (app: Application)=> {		
	app.post("/api/order", controllers.orderController.createOrder)
	app.post("/api/orders", controllers.orderController.fetchOrders)
	app.get("/api/order/:orderId", controllers.orderController.fetchOrder)
}
const wishlistRoutes = (app: Application)=> {
	app.post("/api/wishlist-products", auth, controllers.wishlistController.fetchWishlistProducts)
	app.post("/api/add-wishlist", auth, controllers.wishlistController.addToWishlist)	  
	app.post("/api/remove-wishlist", auth, controllers.wishlistController.removeToWishlist)
}
const shippingAddressRoutes = (app: Application)=> {
	app.get("/api/shipping-addresses/:customer_id", auth, controllers.shippingAddressController.getShippingAddress)
	app.post("/api/shipping-address", auth, controllers.shippingAddressController.addShippingAddress)
}
const cartRoutes = (app: Application)=> {		
	app.post("/api/cart-products", auth, controllers.cartController.fetchCartProducts)
	app.post("/api/add-cart", auth, controllers.cartController.addToCart)
	app.post("/api/remove-cart", auth, controllers.cartController.removeToCart)
}
// and much more routing
```


# This Application under development 

Live Link https://phone-mela.vercel.app/

### Preview screenshot

#### Homepage
![preview-image](preview/2022-03-19_020533.png)

<br/>

#### Product Filter Page
![preview-image](preview/2022-05-06_203317.jpg)

<br/>

#### Carts Items
![preview-image](preview/2022-05-06_203542.jpg)



<br/>

####  Customer Dashboard
![preview-image](preview/user-dashboard.jpg)


<br/>

####  Admin Dashboard Adding Product
![preview-image](preview/adding-product.jpg)

