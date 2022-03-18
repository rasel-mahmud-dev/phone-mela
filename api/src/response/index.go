package response

import (
	"fmt"
	"net/http"
)

func ErrorHandler(res http.ResponseWriter, statusCode int, message interface{})  {
	res.WriteHeader(statusCode  )
	_, err := fmt.Fprint(res, message)
	if err != nil {
		return
	}
}

