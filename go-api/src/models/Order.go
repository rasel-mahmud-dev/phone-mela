package models

type Order struct {
	OrderId       int32   `json:"order_id"`
	ProductId     int32   `json:"product_id"`
	CustomerId    int32   `json:"customer_id"`
	ShipperId     int32   `json:"shipper_id"`
	ShippingId    int32   `json:"shipping_id"`
	StatusId      int8    `json:"status_id"`
	Description   string  `json:"description"`
	Price         float64 `json:"price"`
	Quantity      int16   `json:"quantity"`
	DeliveryDate  string  `json:"delivery_date"`
	CreatedAt     string  `json:"created_at"`
	PaymentMethod string  `json:"payment_method"`
}
