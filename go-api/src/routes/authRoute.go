package routes

import (
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/controllers"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/middleware"
)

func AuthRoutes(router *mux.Router) {

	router.HandleFunc("/api/sign-up", controllers.Registration).Methods("POST")
	router.HandleFunc("/api/sign-in", controllers.Login).Methods("POST")
	router.HandleFunc("/api/sign-current-user", middleware.IsAuth(controllers.LoginCurrentUser)).Methods("GET")
	router.HandleFunc("/api/get-static-images", middleware.IsAuth(controllers.GetStaticImages)).Methods("POST")
	router.HandleFunc("/api/pay", middleware.IsAuth(controllers.Pay)).Methods("POST")

}
