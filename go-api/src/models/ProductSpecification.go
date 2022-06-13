package models

type ProductSpecification struct {
	SpecificationId int32  `json:"specification_id"`
	ProductId       int32  `json:"product_id"`
	Description     string `json:"description"`
	Specifications  string `json:"specifications"`
	Highlights      string `json:"highlights"`
	Ram             string `json:"ram"`
	Storage         string `json:"storage"`
	Colors          string `json:"colors"`
}

// type ProductSpecificationWithAuthor struct {
// 	Product
// 	UserId   string `json:"user_id"`
// 	Username string `json:"username"`
// 	Avatar   string `json:"avatar"`
// 	Email    string `json:"email"`
// }
