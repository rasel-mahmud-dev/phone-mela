package models

type Shipper struct {
	ShipperId   int32  `json:"shipper_id"`
	ShipperName string `json:"shipper_name"`
	Address     string `json:"address"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
}
