package models

type ProductReview struct {
	ReviewId        int32   `json:"review_id"`
	ProductId       int32   `json:"product_id"`
	CustomerId      int32   `json:"customer_id"`
	Rate            *string `json:"rate"`
	Title           string  `json:"title"`
	Summary         string  `json:"summary"`
	CreatedAt       string  `json:"created_at"`
	CustomerUploads string  `json:"customer_uploads"`
	OneStar         int8    `json:"one_star"`
	TwoStar         int8    `json:"two_star"`
	ThreeStar       int8    `json:"three_star"`
	FourStar        int8    `json:"four_star"`
	FiveStar        int8    `json:"five_star"`
}

type ProductReviewWithAuthor struct {
	ProductReview
	CustomerName   string `json:"customer_name"`
	CustomerAvatar string `json:"customer_avatar"`
}
