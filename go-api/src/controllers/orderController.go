package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/database"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/models"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/payment"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/response"
	"net/http"
)

func CreateOrder(w http.ResponseWriter, req *http.Request) {

	var body struct {
		ProductId     int32   `json:"product_id"`
		CustomerId    int32   `json:"customer_id"`
		ShipperId     int32   `json:"shipper_id"`
		ShippingId    int32   `json:"shipping_id"`
		Price         float64 `json:"price"`
		Quantity      int16   `json:"quantity"`
		DeliveryDate  string  `json:"delivery_date"`
		PaymentMethod string  `json:"payment_method"`
		BkashNumber   string  `json:"bkash_number"`
		NagodNumber   string  `json:"nagod_number"`
		CardNumber    string  `json:"card_number"`
		CardCVC       string  `json:"card_cvc"`
		CardDD        string  `json:"card_dd"`
		CardMM        string  `json:"card_mm"`
	}

	json.NewDecoder(req.Body).Decode(&body)

	if body.PaymentMethod == "bkash" {
		payment.BkashPayment()
	} else if body.PaymentMethod == "nagod" {
		payment.NagodPayment()
	} else if body.PaymentMethod == "card" {
		payment.CardPayment()
	}

	// db, err := database.Connect()
	// if err != nil {
	// 	response.ErrorHandler(w, 500, "Database connection fail")
	// 	return
	// }
	// defer db.Close()
	// ctx, cancel := database.CreateContext(req)
	// defer cancel()
	// result, err := db.ExecContext(ctx, `
	// 	INSERT INTO orders
	// 	    (product_id, customer_id, shipper_id, price, quantity, delivery_date)
	// 	    VALUES (?, ?, ?, ?, ?, ?)
	// 	    `,
	// 	body.ProductId,
	// 	body.CustomerId,
	// 	body.ShipperId,
	// 	body.Price,
	// 	body.Quantity,
	// 	body.DeliveryDate,
	// 	body.PaymentMethod,
	// )
	//
	// if err != nil {
	// 	console.SaveLog(err.Error())
	// 	response.ErrorHandler(w, 500, err.Error())
	// 	return
	// }
	//
	// affected, err := result.RowsAffected()
	// if err != nil {
	// 	console.SaveLog(err.Error())
	// 	response.ErrorHandler(w, 500, err.Error())
	// 	return
	// }
	//
	// fmt.Println(affected)
}

func GetOrders(w http.ResponseWriter, req *http.Request) {
	var body struct {
		ProductId  int32 `json:"product_id"`
		CustomerId int32 `json:"customer_id"`
	}

	json.NewDecoder(req.Body).Decode(&body)

	sql := `SELECT
   o.order_id,
   o.product_id,
   o.customer_id,
   o.price,
   o.quantity,
   o.delivery_date,
   o.created_at,
   o.status_id,
	 p.title,
	 os.type as order_status_type
FROM orders o
    join products p
        on p.id = o.product_id
	join order_statuses os on o.status_id = os.status_id
	where customer_id = ?`

	ctx, cancel := database.CreateContext(req)
	defer cancel()

	db, err := database.Connect()
	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}
	defer db.Close()

	rows, err := db.QueryContext(ctx, sql, body.CustomerId)
	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}

	type OrderWithProduct struct {
		models.Order
		Title           string `json:"title"`
		OrderStatusType string `json:"order_status_type"`
	}

	var orders []OrderWithProduct

	for rows.Next() {
		var order OrderWithProduct
		rows.Scan(
			&order.OrderId,
			&order.ProductId,
			&order.CustomerId,
			&order.Price,
			&order.Quantity,
			&order.DeliveryDate,
			&order.CreatedAt,
			&order.StatusId,
			&order.Title,
			&order.OrderStatusType,
		)
		orders = append(orders, order)
	}

	json.NewEncoder(w).Encode(&orders)

}

func GetOrder(w http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)

	sql := `SELECT
       o.order_id, o.product_id, o.customer_id, o.price, o.quantity, o.delivery_date, o.shipper_id, o.shipping_id, o.created_at, o.payment_method,
			o.status_id,
       p.title, p.cover,
    	sa.first_name,
			sa.last_name,
			sa.phone,
			sa.post_code,
			sa.city,
			sa.state,
			sa.address,
			sa.apartment_suit,
			sa.country,
       os.type as  order_status_type
FROM orders o
    join products p
        on p.id = o.product_id
	join shipping_addresses sa on o.shipping_id = sa.id
	join order_statuses os on o.status_id = os.status_id

	where order_id = ?`

	ctx, cancel := database.CreateContext(req)
	defer cancel()

	db, err := database.Connect()
	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 500, err.Error())
		return
	}
	defer db.Close()

	type OrderWithProduct struct {
		models.Order
		OrderStatusType string `json:"order_status_type"`
		Title           string `json:"title"`
		Cover           string `json:"cover"`
		FirstName       string `json:"first_name"`
		LastName        string `json:"last_name"`
		Phone           int32  `json:"phone"`
		PostCode        int16  `json:"post_code"`
		City            string `json:"city"`
		State           string `json:"state"`
		Address         string `json:"address"`
		ApartmentSuit   string `json:"apartment_suit"`
		Country         string `json:"country"`
	}

	var order OrderWithProduct

	db.QueryRowContext(ctx, sql, params["orderId"]).Scan(
		&order.OrderId,
		&order.ProductId,
		&order.CustomerId,
		&order.Price,
		&order.Quantity,
		&order.DeliveryDate,
		&order.ShipperId,
		&order.ShippingId,
		&order.CreatedAt,
		&order.PaymentMethod,
		&order.StatusId,
		&order.Title,
		&order.Cover,
		&order.FirstName,
		&order.LastName,
		&order.Phone,
		&order.PostCode,
		&order.City,
		&order.State,
		&order.Address,
		&order.ApartmentSuit,
		&order.Country,
		&order.OrderStatusType,
	)

	json.NewEncoder(w).Encode(&order)

}
