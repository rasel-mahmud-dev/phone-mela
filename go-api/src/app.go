package main

import (
	"fmt"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/auto"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/config"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/database"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/routes"
	"github.com/rs/cors"
	"log"
	"net/http"
)

func main() {
	// Load for env file and set all keys in variable
	config.Envload()
	router := routes.MuxRouter()

	router.HandleFunc("/sync", func(writer http.ResponseWriter, request *http.Request) {
		auto.InitialData()
		fmt.Fprint(writer, "sync")
	})

	withCors := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://phone-mela.vercel.app", "http://localhost:3000", "http://192.168.43.170:3000", "http://localhost:4173"},
		AllowedMethods:   []string{"GET", "POST", "DELETE", "PUT"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Authorization", "token", "Content-Type", "Token"},
		// Debug: true,
	})

	db, err := database.Connect()
	if err != nil {
		fmt.Println("database connection Error...")
	} else {
		fmt.Println("database connected...")
	}
	defer db.Close()
	log.Fatal(http.ListenAndServe(config.HOST+":"+config.PORT, withCors.Handler(router)))
}
