package routes

import (
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/controllers"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/middleware"
	// "mobile-shop/api/controllers"
	// "mobile-shop/api/middleware"
)

func UserRoutes(router *mux.Router) {

	// router.HandleFunc("/api/users", middleware.IsAuth(controllers.GetUsers)).Methods("GET")
	// router.HandleFunc("/api/user/{id}", middleware.IsAuth(controllers.GetUser)).Methods("GET")
	// router.HandleFunc("/api/avatar-upload", middleware.IsAuth(controllers.UploadAvatar)).Methods("POST")

	router.HandleFunc("/api/auth/customer-profile/{userId}", middleware.IsAuth(controllers.FetchCustomerProfile)).Methods("GET")
}
