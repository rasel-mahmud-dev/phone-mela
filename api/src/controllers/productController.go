

package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"mobile-shop/api/src/database"
	"mobile-shop/api/src/middleware"
	"mobile-shop/api/src/models"
	"mobile-shop/api/src/response"
	"net/http"
	"strconv"
	"time"
)

func stringToParseFloat(str string) float64 {
	l, _ := strconv.ParseFloat(str, 32)
	return l
}
func stringToParseInt(str string) int {
	l, _ := strconv.ParseInt(str, 10, 32)
	return int(l)
}


// func errorHandler(res http.ResponseWriter, err error,  message string)  {
// 	if err != nil {
// 		json.NewEncoder(res).Encode(map[string]string{"message.svg": message})
// 		return
// 	}
// }

// func floatToString(f interface{}) string {
// 	l, _ := strconv.ParseFloat(str, 32)
// 	return l
// }



func FetchProducts(response http.ResponseWriter, request *http.Request)  {
	response.Header().Set("Content-Type", "application/json")
	
	db := database.Connect()
	defer db.Close()
	
	rows, err := db.Query(`SELECT * from products`)
	if err != nil {
		return
	}
	defer rows.Close()
	
	var products []models.Product
	
	for rows.Next(){
		var product models.Product
		if err := rows.Scan(
			&product.ID,
			&product.Title,
			&product.Description,
			&product.AuthorId,
			&product.Price,
			&product.BrandId,
			&product.Cover,
			&product.Tags,
			&product.Attributes,
			&product.CreatedAt,
			&product.UpdatedAt,
			); err != nil {
			response.WriteHeader(500)
			fmt.Fprint(response, "server error")
		}
		products = append(products, product)
	}
	

	json.NewEncoder(response).Encode(products)
}



func FetchProduct(writer http.ResponseWriter, request *http.Request){
	writer.Header().Set("Content-Type", "application/json")

	var params = mux.Vars(request)
	id, ok := params["id"]
	if !ok {
		response.ErrorHandler(writer, 422, "please provide product Id")
		return
	}
	
	productId, err := strconv.Atoi(id)
	if err != nil {
		response.ErrorHandler(writer, 422, "Please Provide valid product id")
		return
	}
	
	db := database.Connect()
	defer db.Close()
	
	sql := `
		select p.*, u.id as user_id, u.username, u.avatar, u.email
			from products p join users u
			    on u.id = p.author_id
		where p.id = ?
		
		`
	
	var product models.ProductWithAuthor
	err = db.QueryRow(sql, productId).
		Scan(
		&product.ID,
		&product.Title,
		&product.Description,
		&product.AuthorId,
		&product.Price,
		&product.BrandId,
		&product.Cover,
		&product.Tags,
		&product.Attributes,
		&product.CreatedAt,
		&product.UpdatedAt,
		&product.UserId,
		&product.Username,
		&product.Avatar,
		&product.Email,
	)
	
	if err != nil {
		fmt.Println(err)
		response.ErrorHandler(writer, 500, "internal error")
		return
	}

	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(&product)
}

func FilterProduct(writer http.ResponseWriter, request *http.Request)  {
	
	var body struct{
		CurrentPage int `json:"currentPage"`
		PageSize int `json:"pageSize"`
	}
	
	json.NewDecoder(request.Body).Decode(&body)
	
	// offset := body.CurrentPage * body.PageSize
	
	db := database.Connect()
	defer db.Close()
	
	sql := `
	SELECT p.*, u.id as user_id, u.username, u.avatar, u.email, (select count(*) from products) as total FROM products p
	    join users u
	        on p.author_id = u.id
	LIMIT ?, ?
 `
	
	ctx, cancel := context.WithTimeout(request.Context(), 3*time.Second)
	defer cancel()
	
	currentPage := 0
	skip := 0
	if body.CurrentPage == 1 {
		currentPage = 0
		skip = 0

	} else {
		currentPage = body.CurrentPage - 1
		skip = currentPage * body.PageSize
	}
	
	
	rows, err := db.QueryContext(ctx, sql, skip, body.PageSize)
	
	if err != nil {
		fmt.Println(err)
		response.ErrorHandler(writer, 500, err)
		return
	}
	defer rows.Close()
	var total int
	var products []models.ProductWithAuthor
	for rows.Next() {
		var product models.ProductWithAuthor
		err := rows.Scan(
			&product.ID,
			&product.Title,
			&product.Description,
			&product.Price,
			&product.AuthorId,
			&product.BrandId,
			&product.Cover,
			&product.Tags,
			&product.Attributes,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.UserId,
			&product.Username,
			&product.Avatar,
			&product.Email,
			&total,
		)
		if err != nil {
			return 
		}
		
		products = append(products, product)
	}
	
	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(map[string]interface{}{
		"products": products,
		"totalProducts": total,
	})
}


func AddProduct(res http.ResponseWriter, req *http.Request)  {
	
	// * .......... AddProduct
		res.Header().Set("Content-Type", "application/json")
	
		//  only for body data
		// var data map[string]string
		// json.NewDecoder(req.Body).Decode(&data)
		
	body := struct {
		Title string `json:"title"`
		AuthorId int32 `json:"author_id"`
		BrandId int32 `json:"brand_id"`
		Cover string `json:"cover"`
		Description string `json:"description"`
		Price string `json:"price"`
		Quantity string `json:"quantity"`
	}{}
		
	json.NewDecoder(req.Body).Decode(&body)
	
	if int(body.AuthorId) != middleware.GetAuthId(false) {
		res.WriteHeader(411)
		json.NewEncoder(res).Encode(map[string]string{"message": "Not Authorized"})
		return
	}
	
	ctx, cancel := context.WithTimeout(req.Context(), 3*time.Second)
	defer cancel()
	
	db := database.Connect()
	defer db.Close()
	
	
	
	sql := `
	INSERT into products(title, description, price, author_id, brand_id, cover, tags, attributes)
	VALUES(
	       ?, ?, ?, ?, ?, ?,
	    '["Redmi Note 11", "Redmi Note 11s", "Redmi Note 11 pro"]',
			'{ "ram": 4, "rom": 64, "battery": 5000, "color": ["red", "blue", "pink", "gray"]}'
	)
	`
	
	price, _ := strconv.ParseFloat(body.Price, 64)
	
	result, err := db.ExecContext(ctx, sql, body.Title, body.Description, price, body.AuthorId, body.BrandId, body.Cover)
	if err != nil {
		fmt.Println(err)
		return
	}
	rows, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	
	if rows != 1 {
			log.Fatalf("expected to affect 1 row, affected %d", rows)
	}
	
	json.NewEncoder(res).Encode(map[string]interface{}{
		"message": "product added successful",
		"product": "",
	})
	
}
	
