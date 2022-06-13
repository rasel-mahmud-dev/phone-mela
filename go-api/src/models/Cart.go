package models

type Cart struct {
	ID         int    `json:"id"`
	ProductId  int    `json:"product_id"`
	Quantity   int    `json:"quantity"`
	CustomerId int    `json:"customer_id"`
	CreatedAt  string `json:"created_at"`
}

type CartWithProductAndCustomer struct {
	Cart
	Title string  `json:"title"`
	Price float64 `json:"price"`
	Cover string  `json:"cover"`
}
