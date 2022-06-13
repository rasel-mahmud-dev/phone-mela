package database

import (
	"context"
	"database/sql"
	"github.com/go-sql-driver/mysql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/config"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"net/http"
	"time"
)

func CreateContext(r *http.Request) (ctx context.Context, cancel context.CancelFunc) {
	ctx, cancel = context.WithTimeout(r.Context(), time.Second*5)
	return ctx, cancel
}

// not work on qoddiapp.app when global variable

// var cfg = mysql.Config{
// 	User:   config.DatabaseUsername,
// 	Passwd: config.DatabasePassword,
// 	Net:    "tcp",
// 	Addr:   config.DatabaseHost + ":" + config.DatabasePort,
// 	DBName: config.DatabaseName,
// }

var cfg = mysql.Config{
	User:   config.DATABASE_USERNAME,
	Passwd: config.DATABASE_PASSWORD,
	Net:    "tcp",
	Addr:   config.DATABASE_HOST + ":" + config.DATABASE_PORT,
	DBName: config.DATABASE_NAME,
}

// errorString is a trivial implementation of error.
type errorString struct {
	s string
}

func (e *errorString) Error() string {
	return e.s
}

func Connect() (*sql.DB, error) {

	cfg := mysql.Config{
		User:            config.DATABASE_USERNAME,
		Passwd:          config.DATABASE_PASSWORD,
		Net:             "tcp",
		Addr:            config.DATABASE_HOST + ":" + config.DATABASE_PORT,
		DBName:          config.DATABASE_NAME,
		MultiStatements: true,
	}

	// db, err :=  sql.Open(config.DbDriver, "root:12345@/"+ config.DatabaseName +  "?multiStatements=true")
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		console.SaveLog(err.Error())
		return db, &errorString{"database connection error"}
	}

	// db.SetConnMaxLifetime(time.Minute * 3)
	// db.SetMaxOpenConns(10)
	// db.SetMaxIdleConns(10)

	// _, err = db.Exec(`CREATE DATABASE IF NOT EXISTS ` + config.DATABASE_NAME + "; " + "USE " + config.DATABASE_NAME)
	// if err != nil {
	// 	console.SaveLog(err.Error())
	// 	// return db,fmt.Errorf("database connection error")
	// 	return db, &errorString{"database connection error"}
	// }

	// db, err =  sql.Open(config.DB_DRIVER, config.DB_URL + config.DATABASE_NAME + "?multiStatements=true")
	// if err != nil {
	// 	fmt.Println(err)
	// }

	return db, nil
}
