package routes

import (
	"github.com/gorilla/mux"
	"mobile-shop/api/src/controllers"
	"mobile-shop/api/src/middleware"
)




func AuthRoutes(router *mux.Router)  {
	
	// router.HandleFunc("/api/sign-up", controllers.Registration).Methods("POST")
	router.HandleFunc("/api/sign-in", controllers.Login).Methods("POST")
	router.HandleFunc("/api/sign-current-user", middleware.IsAuth(controllers.LoginCurrentUser)).Methods("GET")
	// router.HandleFunc("/api/sign-out", controllers.LoginOut).Methods("GET")

}
