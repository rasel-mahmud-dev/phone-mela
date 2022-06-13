package routes

import (
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/controllers"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/middleware"
)

func WishlistRoutes(router *mux.Router) {
	router.HandleFunc("/api/wishlist-products", middleware.IsAuth(controllers.FetchWishlistProducts)).Methods("POST")
	router.HandleFunc("/api/add-wishlist", middleware.IsAuth(controllers.AddToWishlist)).Methods("POST")
	router.HandleFunc("/api/remove-wishlist", middleware.IsAuth(controllers.RemoveFromWishlist)).Methods("POST")

}
