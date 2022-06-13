package models

type User struct {
	ID        uint32  `json:"id"`
	Username  string  `json:"username"`
	FirstName *string `json:"first_name"`
	LastName  *string `json:"last_name"`
	Email     string  `json:"email"`
	Password  string  `json:"password"`
	Avatar    *string `json:"avatar"`
	Role      string  `json:"role"`
	CreatedAt string  `json:"created_at"`
}
