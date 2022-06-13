package routes

import (
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/controllers"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/middleware"
)

func OrderRoutes(router *mux.Router) {
	router.HandleFunc("/api/order", middleware.IsAuth(controllers.CreateOrder)).Methods("POST")
	router.HandleFunc("/api/orders", middleware.IsAuth(controllers.GetOrders)).Methods("POST")
	router.HandleFunc("/api/order/{orderId}", middleware.IsAuth(controllers.GetOrder)).Methods("GET")
}
