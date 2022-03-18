package main

import (
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"log"
	"mobile-shop/api/src/config"
	"mobile-shop/api/src/routes"
	"net/http"
)

// func NewRouter2() *mux.Router {
// 	router := mux.NewRouter().StrictSlash(true)
// 	staticDir := "/static/"
// 	router.
// 		PathPrefix(staticDir).
// 		Handler(http.StripPrefix(staticDir, http.FileServer(http.Dir("."+staticDir))))
//
// 	router.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
// 		fmt.Println(request.URL)
// 	})
// 	return router
// }



// func CORS(h http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		origin := r.Header.Get("Origin")
// 		w.Header().Set("Access-Control-Allow-Origin", origin)
// 		if r.Method == "OPTIONS" {
// 			w.Header().Set("Access-Control-Allow-Credentials", "true")
// 			w.Header().Set("Access-Control-Allow-Methods", "GET,POST")
// 			w.Header().Set("Access-Control-Allow-Credentials", "true")
// 			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-CSRFToken, Authorization")
// 			return
// 		} else {
// 			h.ServeHTTP(w, r)
// 		}
// 	})
// }

// * sadsd

func main() {
	
	// Load for env file and set all keys in variable
	config.Envload()
	

	// auto.DropAllTables()
	// auto.InitialCreateAllTable()
	// auto.InitialData()
	

	router := mux.NewRouter()
	
	// routes.CategoryRoutes(router)
	routes.AuthRoutes(router)
	// // routes.UserRoutes(router)
	//
	routes.ProductRoutes(router)
	routes.BrandRoutes(router)
	
	// ? static directory
	// uploads := http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads/")))
	
	static := http.StripPrefix("/images", http.FileServer(http.Dir("./src/static/images")))
	
	// router.PathPrefix("/uploads/").Handler(uploads)
	
	router.PathPrefix("/images/").Handler(static)
	// http.Handle("/", router)
	
	
	withCors := cors.New(cors.Options{
		AllowedOrigins: []string{"http://foo.com", "http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "DELETE", "PUT"},
		AllowCredentials: true,
		AllowedHeaders: []string{"Authorization", "token", "Content-Type", "Token"},
		// Enable Debugging for testing, consider disabling in production
		// Debug: true,
	})
	
	// router.Use(middleware.Logger)

	log.Fatal(http.ListenAndServe("127.0.0.1:5000", withCors.Handler(router)))
	
	// database.DbInitialize(func() {
	// 	fmt.Println("server is running on port 4000")
	// 	log.Fatal(http.ListenAndServe(":4000", router))
	// })
}

