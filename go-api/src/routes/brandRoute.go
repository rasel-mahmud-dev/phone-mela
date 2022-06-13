package routes

import (
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/controllers"
)

func BrandRoutes(router *mux.Router) {

	router.HandleFunc("/api/brands", controllers.FetchBrands).Methods("GET")

	// router.HandleFunc("/api/product/{id}", controllers.FetchProduct).Methods("GET")
	//
	// router.HandleFunc("/api/filter-products", controllers.FilterProduct).Methods("POST")

	// router.HandleFunc("/api/products-count/{authorId}", controllers.ProductCount).Methods("GET")
	//
	// router.HandleFunc("/api/filter-products-count/{authorId}", controllers.FilterProductCount).Methods("POST")
	//
	// // router.HandleFunc("/api/products/{authorId}", controllers.FetchAdminProduct).Methods("GET")
	// router.HandleFunc("/api/add-product", middleware.IsAuth(controllers.AddProduct)).Methods("POST")
	// router.HandleFunc("/api/update-product/{id}", middleware.IsAuth(controllers.UpdateProduct)).Methods("POST")
	// router.HandleFunc("/api/delete-product/{id}", middleware.IsAuth(controllers.DeleteProduct)).Methods("POST")
	//
	//
	// router.HandleFunc("/api/fetch-brand", controllers.GetBrand).Methods("GET")
	// router.HandleFunc("/api/add-brand", controllers.AddBrand).Methods("POST")

}
