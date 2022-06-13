package routes

import (
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/controllers"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/middleware"
)

func ShippingRoutes(router *mux.Router) {
	router.HandleFunc("/api/shipping-addresses/{customer_id}", middleware.IsAuth(controllers.GetShippingAddress)).Methods("GET")
	router.HandleFunc("/api/shipping-address", middleware.IsAuth(controllers.SaveShippingAddress)).Methods("POST")

}
