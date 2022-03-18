package middleware

import (
	"fmt"
	"net/http"
)



// * middleware for all routes


func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		fmt.Println("logger")
		
		
		
		// session, _ := sessions.Session().Get(req, "cookie-name")
		// id, ok := session.Values["userId"]
		// if ok {
		// 	g := id.(string)
		// 	h := strings.ReplaceAll(g, `"`, ``)
		// 	_ = h
		// 	userId = h
		// } else {
		// 	userId = ""
		// }
		
		next.ServeHTTP(res, req)
	})
}

func GetAuth() string {
	// fmt.Println(userId)
	// return userId
	return  ""
}