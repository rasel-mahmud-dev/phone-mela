package controllers

import (
	"encoding/json"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/database"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/models"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/response"
	"net/http"
)

func FetchWishlistProducts(w http.ResponseWriter, request *http.Request) {
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
		SELECT  c.*, p.title, p.price, p.cover from wishlist c
    	JOIN products p on p.id = c.product_id WHERE customer_id = ?`, body.CustomerID)

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}
	defer rows.Close()

	var wishlist []models.WishlistWithProductAndCustomer

	for rows.Next() {
		var wish models.WishlistWithProductAndCustomer
		if err := rows.Scan(
			&wish.ID,
			&wish.ProductId,
			&wish.CustomerId,
			&wish.CreatedAt,
			&wish.Title,
			&wish.Price,
			&wish.Cover,
		); err != nil {
			w.WriteHeader(500)
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 500, err.Error())
		}
		wishlist = append(wishlist, wish)
	}

	json.NewEncoder(w).Encode(wishlist)
}

func TopWishlistProducts(w http.ResponseWriter, request *http.Request) {
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
		SELECT p.id, p.title, p.cover, p.price, p.discount, p.created_at, count(w.product_id) as top_products
			FROM mobile_shop.wishlist w
			    join products p on p.id = w.product_id
			group by w.product_id
			order by top_products desc
			limit 0, 5;

		`)

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}
	defer rows.Close()

	var topWishlistProducts []models.ProductWithAuthor
	var totalP int
	for rows.Next() {
		var topWishlistProduct models.ProductWithAuthor
		if err := rows.Scan(
			&topWishlistProduct.ID,
			&topWishlistProduct.Title,
			&topWishlistProduct.Cover,
			&topWishlistProduct.Price,
			&topWishlistProduct.Discount,
			&topWishlistProduct.CreatedAt,
			&totalP,
		); err != nil {
			w.WriteHeader(500)
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 500, err.Error())
		}
		topWishlistProducts = append(topWishlistProducts, topWishlistProduct)
	}

	json.NewEncoder(w).Encode(topWishlistProducts)
}

func AddToWishlist(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var body struct {
		CustomerID int16 `json:"customer_id"`
		ProductID  int16 `json:"product_id"`
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
		INSERT INTO wishlist (product_id, customer_id) VALUES (?, ?)`, body.ProductID, body.CustomerID)

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

func RemoveFromWishlist(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var body struct {
		WishlistID int `json:"wishlist_id"`
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
		DELETE FROM wishlist WHERE wishlist.id = ? AND wishlist.customer_id = ?`, body.WishlistID, body.CustomerId)

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
			"message": "item remove from wishlist",
		})
	}
}
