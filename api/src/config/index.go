package config

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"
	"strconv"
	"time"
)

var (
	PORT = 0
	DB_NAME = ""
	DB_DRIVER = ""
	DB_URL = ""
	SECRET_KEY = ""
	JWT_EXPIRE = time.Hour * 24
)

func Envload()  {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("can't read env file")
	}
	
	PORT, err = strconv.Atoi(os.Getenv("BACKEND_PORT"))
	if err != nil {
		PORT = 4000
	}
	
	DB_DRIVER = os.Getenv("DB_DRIVER")
	DB_NAME = os.Getenv("DB_NAME")
	SECRET_KEY = os.Getenv("API_SECRET_KEY")
	
	DB_URL = fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/", os.Getenv("DB_USER"), os.Getenv("DB_PASS"))
}

// @/?charset-utf8&parseTime=True&loc=Local