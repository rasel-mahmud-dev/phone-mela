package controllers

import (
	"encoding/json"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/database"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/models"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/response"
	"net/http"
)

func FetchCartProducts(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var body struct {
		CustomerID int16 `json:"customer_id"`
	}

	json.NewDecoder(request.Body).Decode(&body)

	db, err := database.Connect()
	if err != nil {
		response.ErrorHandler(w, 500, "Database connection fail")
		return
	}
	defer db.Close()
	ctx, cancel := database.CreateContext(request)
	defer cancel()
	rows, err := db.QueryContext(ctx, `
		SELECT  c.*, p.title, p.price, p.cover from carts c
    	JOIN products p on p.id = c.product_id WHERE customer_id = ?`, body.CustomerID)

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}
	defer rows.Close()

	var carts []models.CartWithProductAndCustomer

	for rows.Next() {
		var cart models.CartWithProductAndCustomer
		if err := rows.Scan(
			&cart.ID,
			&cart.ProductId,
			&cart.CustomerId,
			&cart.Quantity,
			&cart.CreatedAt,
			&cart.Title,
			&cart.Price,
			&cart.Cover,
		); err != nil {
			w.WriteHeader(500)
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 500, err.Error())
		}
		carts = append(carts, cart)
	}

	json.NewEncoder(w).Encode(carts)
}

func AddToCart(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var body struct {
		ProductID  int `json:"product_id"`
		CustomerId int `json:"customer_id"`
	}

	json.NewDecoder(request.Body).Decode(&body)

	db, err := database.Connect()
	if err != nil {
		response.ErrorHandler(w, 500, "Database connection fail")
		return
	}
	defer db.Close()

	ctx, cancel := database.CreateContext(request)
	defer cancel()

	result, err := db.ExecContext(ctx, `
		INSERT INTO carts (product_id, customer_id) VALUES (?, ?)`, body.ProductID, body.CustomerId)

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}

	var zero int64 = 0
	n, err := result.RowsAffected()
	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}

	if n > zero {
		w.WriteHeader(201)
		json.NewEncoder(w).Encode(map[string]int{
			"id": int(id),
		})
	}
}

func RemoveToCart(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var body struct {
		CartID     int `json:"cart_id"`
		CustomerId int `json:"customer_id"`
	}

	json.NewDecoder(request.Body).Decode(&body)

	db, err := database.Connect()
	if err != nil {
		response.ErrorHandler(w, 500, "Database connection fail")
		return
	}
	defer db.Close()

	ctx, cancel := database.CreateContext(request)
	defer cancel()

	result, err := db.ExecContext(ctx, `
		DELETE FROM carts WHERE carts.id = ? AND carts.customer_id = ?`, body.CartID, body.CustomerId)

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}

	var zero int64 = 0
	n, err := result.RowsAffected()
	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}

	if n > zero {
		w.WriteHeader(201)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "cart removed",
		})
	}
}
