package models

type Product struct {
	ID          int32  `json:"id" db:"id"`
	Title       string              `json:"title"`
	BrandId     int32              `json:"brand_id"`
	Description string              `json:"description"`
	Price       float64             `json:"price"`
	AuthorId    int32  `json:"author_id"`
	Cover       string                `json:"cover"`
	Tags        string              `json:"tags"`
	Attributes  string              `json:"attributes"`
	CreatedAt   string  `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}


type ProductWithAuthor struct {
	Product
	UserId string `json:"user_id"`
	Username string `json:"username"`
	Avatar string `json:"avatar"`
	Email string `json:"email"`
}