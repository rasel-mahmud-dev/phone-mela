package models

type ShippingAddress struct {
	ID            int32  `json:"id"`
	CustomerID    int32  `json:"customer_id"`
	FirstName     string `json:"first_name"`
	LastName      string `json:"last_name"`
	Phone         int32  `json:"phone"`
	PostCode      int16  `json:"post_code"`
	City          string `json:"city"`
	State         string `json:"state"`
	Address       string `json:"address"`
	ApartmentSuit string `json:"apartment_suit"`
	Country       string `json:"country"`
	CreatedAt     string `json:"created_at"`
	IsDefault     int8   `json:"is_default"`
}
