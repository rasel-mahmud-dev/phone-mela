package models

type Supplier struct {
	SupplierId   int32  `json:"supplier_id"`
	SupplierName string `json:"supplier_name"`
	Address      string `json:"address"`
	City         string `json:"city"`
	PostalCode   string `json:"postal_code"`
	Country      string `json:"country"`
	Phone        string `json:"phone"`
}
