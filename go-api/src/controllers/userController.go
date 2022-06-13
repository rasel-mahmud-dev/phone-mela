package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/database"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/models"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/response"
	"net/http"
)

func FetchCustomerProfile(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(request)

	db, err := database.Connect()
	if err != nil {
		response.ErrorHandler(w, 500, "Database connection fail")
		return
	}
	defer db.Close()

	var user models.User

	ctx, cancel := database.CreateContext(request)
	defer cancel()

	err = db.QueryRowContext(ctx, `
SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.avatar, u.created_at, u.role from users u WHERE u.id = ?`,
		params["userId"]).Scan(
		&user.ID,
		&user.Username,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Avatar,
		&user.CreatedAt,
		&user.Role,
	)

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}

	json.NewEncoder(w).Encode(user)
}
