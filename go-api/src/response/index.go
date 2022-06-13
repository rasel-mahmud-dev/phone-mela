package response

import (
	"encoding/json"
	"net/http"
)

func ErrorHandler(res http.ResponseWriter, statusCode int, message interface{}) {
	res.WriteHeader(statusCode)
	err := json.NewEncoder(res).Encode(map[string]interface{}{"message": message})
	if err != nil {
		return
	}
}
