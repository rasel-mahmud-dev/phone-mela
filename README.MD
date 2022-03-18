Mobile Shop Ecommerce website, build with Golang and React js



### API Endpoint
```go
    router.HandleFunc("/api/brands", controllers.FetchBrands).Methods("GET")
	router.HandleFunc("/api/products", controllers.FetchProducts).Methods("GET")
	router.HandleFunc("/api/product/{id}", controllers.FetchProduct).Methods("GET")
	router.HandleFunc("/api/sign-in", controllers.Login).Methods("POST")
	router.HandleFunc("/api/sign-current-user", middleware.IsAuth(controllers.LoginCurrentUser)).Methods("GET")
	router.HandleFunc("/api/filter-products", controllers.FilterProduct).Methods("POST")
	router.HandleFunc("/api/product", middleware.IsAuth(controllers.AddProduct)).Methods("POST")
	
```

# This Application under development so not yet hosting on the cloud
### Preview screenshot

![preview-image](preview/2022-03-19_020533.png)