package models



type User struct {
	ID        uint32    `json:"id" database:"id"`
	Username  string `json:"username" database:"username"`
	Email     string `json:"email" database:"email"`
	Password  string `json:"password" database:"password"`
	Avatar    string `json:"avatar" database:"avatar"`
	CreatedAt string `json:"created_at" database:"created_at"`
}
