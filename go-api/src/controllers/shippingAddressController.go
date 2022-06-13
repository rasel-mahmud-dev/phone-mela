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

func SaveShippingAddress(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var body models.ShippingAddress
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
		INSERT INTO shipping_addresses
		    (first_name, last_name, phone, city, post_code, state, address, apartment_suit, country, customer_id)
		VALUES(
		    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
		)`,
		body.FirstName,
		body.LastName,
		body.Phone,
		body.City,
		body.PostCode,
		body.State,
		body.Address,
		body.ApartmentSuit,
		body.Country,
		1,
	)
	if err != nil {
		response.ErrorHandler(w, 500, "Shipping address save fail")
		console.SaveLog(err.Error() + " Shipping address save fail ")
		return
	}

	rows, err := result.RowsAffected()
	if err != nil {
		response.ErrorHandler(w, 500, "Shipping address save fail")
		console.SaveLog(err.Error() + " Shipping address save fail ")
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		response.ErrorHandler(w, 500, "Shipping address save fail")
		console.SaveLog(err.Error() + " Shipping address save fail ")
		return
	}

	if rows == 1 {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"id": id,
		})
	}
}

func GetShippingAddress(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	hash := mux.Vars(request)

	db, err := database.Connect()
	if err != nil {
		response.ErrorHandler(w, 500, "Database connection fail")
		return
	}
	defer db.Close()
	ctx, cancel := database.CreateContext(request)
	defer cancel()
	rows, err := db.QueryContext(ctx, `
			SELECT s.id,
			       s.first_name,
			       s.last_name,
			       s.phone,
			       s.city,
			       s.post_code,
			       s.state,
			       s.address,
			       s.apartment_suit,
			       s.country,
			       s.created_at,
			       s.customer_id,
			       s.is_default  from shipping_addresses s
	    	 WHERE customer_id = ?`, hash["customer_id"])

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}
	defer rows.Close()

	var shippingAddresses []models.ShippingAddress

	for rows.Next() {
		var shippingAddress models.ShippingAddress
		if err := rows.Scan(
			&shippingAddress.ID,
			&shippingAddress.FirstName,
			&shippingAddress.LastName,
			&shippingAddress.Phone,
			&shippingAddress.City,
			&shippingAddress.PostCode,
			&shippingAddress.State,
			&shippingAddress.Address,
			&shippingAddress.ApartmentSuit,
			&shippingAddress.Country,
			&shippingAddress.CreatedAt,
			&shippingAddress.CustomerID,
			&shippingAddress.IsDefault,
		); err != nil {
			w.WriteHeader(500)
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 500, err.Error())
		}
		shippingAddresses = append(shippingAddresses, shippingAddress)
	}

	json.NewEncoder(w).Encode(&shippingAddresses)
}

// func FetchWishlistProducts(w http.ResponseWriter, request *http.Request)  {
// 	w.Header().Set("Content-Type", "application/json")
//
//
// 	var body map[string]string
//
// 	json.NewDecoder(request.Body).Decode(&body)
//
// 	db, err := database.Connect()
// 	if err != nil {
// 		response.ErrorHandler(w, 500, "Database connection fail")
// 		return
// 	}
// 	defer db.Close()
// 	ctx, cancel := database.CreateContext(request)
// 	defer cancel()
// 	rows, err := db.QueryContext(ctx, `
// 		SELECT  c.*, p.title, p.price, p.cover from wishlist c
//     	JOIN products p on p.id = c.product_id WHERE customer_id = ?`, body["customer_id"])
//
// 	if err != nil {
// 		console.SaveLog(err.Error())
// 		response.ErrorHandler(w, 500, err.Error())
// 		return
// 	}
// 	defer rows.Close()
//
// 	var wishlist []models.WishlistWithProductAndCustomer
//
// 	for rows.Next(){
// 		var wish models.WishlistWithProductAndCustomer
// 		if err := rows.Scan(
// 			&wish.ID,
// 			&wish.ProductId,
// 			&wish.CustomerId,
// 			&wish.CreatedAt,
// 			&wish.Title,
// 			&wish.Price,
// 			&wish.Cover,
// 		); err != nil {
// 			w.WriteHeader(500)
// 			console.SaveLog(err.Error())
// 			response.ErrorHandler(w, 500, err.Error())
// 		}
// 		wishlist = append(wishlist, wish)
// 	}
//
//
// 	json.NewEncoder(w).Encode(wishlist)
// }
//
//
// func AddToWishlist(w http.ResponseWriter, request *http.Request)  {
// 	w.Header().Set("Content-Type", "application/json")
//
//
// 	var body map[string]interface{}
//
// 	json.NewDecoder(request.Body).Decode(&body)
//
// 	db, err := database.Connect()
// 	if err != nil {
// 		response.ErrorHandler(w, 500, "Database connection fail")
// 		return
// 	}
// 	defer db.Close()
//
// 	ctx, cancel := database.CreateContext(request)
// 	defer cancel()
//
// 	result, err := db.ExecContext(ctx, `
// 		INSERT INTO wishlist (product_id, customer_id) VALUES (?, ?)`, body["product_id"], body["customer_id"])
//
// 	if err != nil {
// 		console.SaveLog(err.Error())
// 		response.ErrorHandler(w, 500, err.Error())
// 		return
// 	}
//
// 	var zero int64 = 0
// 	n, err :=result.RowsAffected()
// 	if err != nil {
// 		console.SaveLog(err.Error())
// 		response.ErrorHandler(w, 500, err.Error())
// 		return
// 	}
//
// 	id, err := result.LastInsertId()
// 	if err != nil {
// 		console.SaveLog(err.Error())
// 		response.ErrorHandler(w, 500, err.Error())
// 		return
// 	}
//
// 	if n > zero {
// 		w.WriteHeader(201)
// 		json.NewEncoder(w).Encode(map[string]int{
// 			"id": int(id),
// 		})
// 	}
// }
//
//
// func RemoveFromWishlist(w http.ResponseWriter, request *http.Request)  {
// 	w.Header().Set("Content-Type", "application/json")
//
//
// 	var body struct{
// 		WishlistID string `json:"wishlist_id"`
// 		CustomerId string `json:"customer_id"`
// 	}
//
// 	json.NewDecoder(request.Body).Decode(&body)
//
// 	db, err := database.Connect()
// 	if err != nil {
// 		response.ErrorHandler(w, 500, "Database connection fail")
// 		return
// 	}
// 	defer db.Close()
//
// 	ctx, cancel := database.CreateContext(request)
// 	defer cancel()
//
// 	result, err := db.ExecContext(ctx, `
// 		DELETE FROM wishlist WHERE wishlist.id = ? AND wishlist.customer_id = ?`, body.WishlistID, body.CustomerId)
//
// 	if err != nil {
// 		console.SaveLog(err.Error())
// 		response.ErrorHandler(w, 500, err.Error())
// 		return
// 	}
//
//
// 	var zero int64 = 0
// 	n, err :=result.RowsAffected()
// 	if err != nil {
// 		console.SaveLog(err.Error())
// 		response.ErrorHandler(w, 500, err.Error())
// 		return
// 	}
//
//
// 	if n > zero {
// 		w.WriteHeader(201)
// 		json.NewEncoder(w).Encode(map[string]string{
// 			"message": "item remove from wishlist",
// 		})
// 	}
// }
//
