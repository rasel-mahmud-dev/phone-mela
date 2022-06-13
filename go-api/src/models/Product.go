package models

type Product struct {
	ID              int32   `json:"id" db:"id"`
	Title           string  `json:"title"`
	BrandId         int32   `json:"brand_id"`
	Description     string  `json:"description"`
	Price           float64 `json:"price"`
	AuthorId        int32   `json:"author_id"`
	SellerID        int32   `json:"seller_id"`
	Discount        int32   `json:"discount"`
	Stock           int32   `json:"stock"`
	Cover           string  `json:"cover"`
	Tags            string  `json:"tags"`
	Attributes      string  `json:"attributes"`
	SpecificationId int32   `json:"specification_id"`
	CreatedAt       string  `json:"created_at"`
	UpdatedAt       string  `json:"updated_at"`
}

type ProductWithAuthor struct {
	Product
	Username string `json:"username"`
	Avatar   string `json:"avatar"`
	Email    string `json:"email"`
}
