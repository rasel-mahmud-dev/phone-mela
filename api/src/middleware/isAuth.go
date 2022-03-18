package middleware

import (
	"mobile-shop/api/src/jwt"
	"mobile-shop/api/src/response"
	"net/http"
)


var UserId int

// ' Auth Protected Route.
func IsAuth(handlerFun http.HandlerFunc) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		
		token := req.Header.Get("token")
		
		valid, err := jwt.TokenValid(token)
		if err != nil {
			response.ErrorHandler(res, 403, "token expired")
			return
		}
		
		if valid != 0 {
			UserId = int(valid)
			handlerFun(res, req)
		} else {
			response.ErrorHandler(res, 403, "Unauthorized")
		}
	}
}

func GetAuthId(isReset bool) int {
	if isReset {
		UserId = 0
	}
	return UserId
}