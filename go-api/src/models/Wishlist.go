package models

type Wishlist struct {
	ID         int    `json:"id"`
	ProductId  int    `json:"product_id"`
	CustomerId int    `json:"customer_id"`
	CreatedAt  string `json:"created_at"`
}

type WishlistWithProductAndCustomer struct {
	Wishlist
	Title string  `json:"title"`
	Price float64 `json:"price"`
	Cover string  `json:"cover"`
}
