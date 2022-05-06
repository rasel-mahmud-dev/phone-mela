Phone Mela FullStack Ecommerce website, build with Golang, React js and MySQL



### API Endpoint Example
```go
    router.HandleFunc("/api/brands", controllers.FetchBrands).Methods("GET")
	router.HandleFunc("/api/products", controllers.FetchProducts).Methods("GET")
	router.HandleFunc("/api/product/{id}", controllers.FetchProduct).Methods("GET")
	router.HandleFunc("/api/sign-in", controllers.Login).Methods("POST")
	router.HandleFunc("/api/sign-current-user", middleware.IsAuth(controllers.LoginCurrentUser)).Methods("GET")
	router.HandleFunc("/api/filter-products", controllers.FilterProduct).Methods("POST")
	router.HandleFunc("/api/product", middleware.IsAuth(controllers.AddProduct)).Methods("POST")
	
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

