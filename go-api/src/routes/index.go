package routes

import (
	"github.com/gorilla/mux"
	"net/http"
)

func MuxRouter() *mux.Router {

	router := mux.NewRouter()

	// CategoryRoutes(router)
	AuthRoutes(router)
	AdminRoute(router)
	CartRoutes(router)
	WishlistRoutes(router)
	ProductRoutes(router)
	BrandRoutes(router)
	ShippingRoutes(router)
	OrderRoutes(router)
	UserRoutes(router)

	// ? static directory
	// uploads := http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads/")))

	static := http.StripPrefix("/products", http.FileServer(http.Dir("./src/static/products")))
	static2 := http.StripPrefix("/avatar", http.FileServer(http.Dir("./src/static/avatar")))

	// router.PathPrefix("/uploads/").Handler(uploads)

	router.PathPrefix("/products/").Handler(static)
	router.PathPrefix("/avatar/").Handler(static2)

	return router

}
