package database

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"mobile-shop/api/src/config"
)

func Connect() *sql.DB {
	db, err :=  sql.Open(config.DB_DRIVER, config.DB_URL +  "?multiStatements=true")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Println("Database Connection Fail.......")
	}
	_, err = db.Exec(`CREATE DATABASE IF NOT EXISTS ` + config.DB_NAME  + "; " + "USE " + config.DB_NAME)
	if err != nil {
		fmt.Println(err)
	}
	db, err =  sql.Open(config.DB_DRIVER, config.DB_URL + config.DB_NAME + "?multiStatements=true")
	if err != nil {
		fmt.Println(err)
	}
	
	return db
}

