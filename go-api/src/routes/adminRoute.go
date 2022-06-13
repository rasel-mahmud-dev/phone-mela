package routes

import (
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/controllers"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/middleware"
)

func AdminRoute(router *mux.Router) {
	router.HandleFunc("/admin/login", controllers.AdminLoginPage).Methods("GET")
	router.HandleFunc("/admin/logs", controllers.AdminLogFileContent).Methods("POST")
	router.HandleFunc("/admin/login", controllers.LoginAsAdmin).Methods("POST")
	router.HandleFunc("/admin/get-server-logs", middleware.IsAdmin(controllers.GetLogs)).Methods("POST")
	router.HandleFunc("/admin/get-server-log", middleware.IsAdmin(controllers.GetLog)).Methods("POST")
	router.HandleFunc("/admin/delete-server-log", middleware.IsAdmin(controllers.DeleteLog)).Methods("POST")
}
