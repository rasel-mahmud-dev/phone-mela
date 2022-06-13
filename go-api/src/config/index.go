package config

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"os"
	"time"
)

var (
	HOST = "0.0.0.0"

	// DatabaseName = ""
	// DbDriver     = ""
	// DatabasePort     = ""
	// DatabaseHost     = ""
	// DatabaseUsername = ""
	// DatabasePassword = ""
	// SecretKey       = ""
	// StripeSecretKey = ""
	// JwtExpire       = time.Hour * 24

	PORT              = "4000"
	DATABASE_NAME     = ""
	DB_DRIVER         = ""
	DATABASE_PORT     = ""
	DATABASE_HOST     = ""
	DATABASE_USERNAME = ""
	DATABASE_PASSWORD = ""
	SECRET_KEY        = ""
	JWT_EXPIRE        = time.Hour * 24
	STRIPE_SECRET_KEY = ""
)

func Envload() {
	err := godotenv.Load()
	if err != nil {
		console.SaveLog(err.Error())
		fmt.Println("can't read env file")
	}

	if HOST = os.Getenv("HOST"); HOST == "" {
		HOST = "0.0.0.0"
		// HOST = "127.0.0.1"
	}
	if PORT = os.Getenv("PORT"); PORT == "" {
		PORT = "4000"
	}

	DB_DRIVER = os.Getenv("DB_DRIVER")

	DATABASE_PORT = os.Getenv("DATABASE_PORT")
	DATABASE_NAME = os.Getenv("DATABASE_NAME")
	DATABASE_HOST = os.Getenv("DATABASE_HOST")
	DATABASE_USERNAME = os.Getenv("DATABASE_USERNAME")
	DATABASE_PASSWORD = os.Getenv("DATABASE_PASSWORD")
	SECRET_KEY = os.Getenv("API_SECRET_KEY")

	STRIPE_SECRET_KEY = os.Getenv("STRIPE_SECRET_KEY")

}

// @/?charset-utf8&parseTime=True&loc=Local
