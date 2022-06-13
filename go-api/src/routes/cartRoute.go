package routes

import (
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/controllers"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/middleware"
)

func CartRoutes(router *mux.Router) {
	router.HandleFunc("/api/cart-products", middleware.IsAuth(controllers.FetchCartProducts)).Methods("POST")
	router.HandleFunc("/api/add-cart", middleware.IsAuth(controllers.AddToCart)).Methods("POST")
	router.HandleFunc("/api/remove-cart", middleware.IsAuth(controllers.RemoveToCart)).Methods("POST")

}
