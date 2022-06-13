package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/database"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/middleware"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/models"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/response"
	"log"
	"net/http"
	"reflect"
	"strconv"
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

func FetchProducts(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db, err := database.Connect()
	if err != nil {
		console.SaveLog("Database Connection Error")
		response.ErrorHandler(w, 500, "Database Connection Error")
		return
	}
	defer db.Close()

	ctx, cancel := database.CreateContext(request)
	defer cancel()

	sql := `SELECT
p.id,
p.title,
p.description,
p.price,
p.author_id,
p.brand_id,
p.cover,
p.tags,
p.attributes,
p.specification_id,
p.created_at,
p.updated_at,
p.seller_id,
p.discount,
p.stock
FROM products p
	`

	rows, err := db.QueryContext(ctx, sql)
	if err != nil {
		// if unfortunately close database before query
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 404, "Products Not found")
		return
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		if err := rows.Scan(
			&product.ID,
			&product.Title,
			&product.Description,
			&product.Price,
			&product.AuthorId,
			&product.BrandId,
			&product.Cover,
			&product.Tags,
			&product.Attributes,
			&product.SpecificationId,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.SellerID,
			&product.Discount,
			&product.Stock,
		); err != nil {
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 500, "Product fetch error")
			return
		}
		products = append(products, product)
	}

	json.NewEncoder(w).Encode(products)
}

func LatestProducts(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db, err := database.Connect()
	if err != nil {
		console.SaveLog("Database Connection Error")
		response.ErrorHandler(w, 500, "Database Connection Error")
		return
	}
	defer db.Close()

	ctx, cancel := database.CreateContext(request)
	defer cancel()

	sql := `SELECT
p.id,
p.title,
p.description,
p.price,
p.author_id,
p.brand_id,
p.cover,
p.tags,
p.attributes,
p.specification_id,
p.created_at,
p.updated_at,
p.seller_id,
p.discount,
p.stock
FROM products p order by created_at desc limit 0, 15
	`

	rows, err := db.QueryContext(ctx, sql)
	if err != nil {
		// if unfortunately close database before query
		console.SaveLog(err.Error())
		response.ErrorHandler(w, 404, "Products Not found")
		return
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		if err := rows.Scan(
			&product.ID,
			&product.Title,
			&product.Description,
			&product.Price,
			&product.AuthorId,
			&product.BrandId,
			&product.Cover,
			&product.Tags,
			&product.Attributes,
			&product.SpecificationId,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.SellerID,
			&product.Discount,
			&product.Stock,
		); err != nil {
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 500, "Product fetch error")
			return
		}
		products = append(products, product)
	}

	json.NewEncoder(w).Encode(products)
}

func FetchProductForHomePage(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var body = struct {
		Type string `json:"type"`
	}{}

	json.NewDecoder(request.Body).Decode(&body)

	db, err := database.Connect()
	if err != nil {
		console.SaveLog("Database Connection Error")
		response.ErrorHandler(w, 500, "Database Connection Error")
		return
	}
	defer db.Close()

	ctx, cancel := database.CreateContext(request)
	defer cancel()

	var sql string

	if body.Type == "latest" {
		sql = `SELECT
							p.id,
							p.title,
							p.description,
							p.price,
							p.author_id,
							p.brand_id,
							p.cover,
							p.tags,
							p.attributes,
							p.specification_id,
							p.created_at,
							p.updated_at,
							p.seller_id,
							p.discount,
							p.stock
					FROM products p order by created_at desc limit 0, 10
	`
		rows, err := db.QueryContext(ctx, sql)
		if err != nil {
			// if unfortunately close database before query
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 404, "Products Not found")
			return
		}
		defer rows.Close()

		var products []models.Product

		for rows.Next() {
			var product models.Product
			if err := rows.Scan(
				&product.ID,
				&product.Title,
				&product.Description,
				&product.Price,
				&product.AuthorId,
				&product.BrandId,
				&product.Cover,
				&product.Tags,
				&product.Attributes,
				&product.SpecificationId,
				&product.CreatedAt,
				&product.UpdatedAt,
				&product.SellerID,
				&product.Discount,
				&product.Stock,
			); err != nil {
				console.SaveLog(err.Error())
				response.ErrorHandler(w, 500, "Product fetch error")
				return
			}
			products = append(products, product)
		}

		json.NewEncoder(w).Encode(products)
		return

	} else if body.Type == "top_sales" {
		sql = `
	SELECT count(s.product_id) as sold,
		p.id,
		p.title,
		p.description,
		p.price,
		p.author_id,
		p.brand_id,
		p.cover,
		p.tags,
		p.attributes,
		p.specification_id,
		p.created_at,
		p.updated_at,
		p.seller_id,
		p.discount,
		p.stock
		FROM products p left join sales s on s.product_id = p.id group by p.id order by sold desc  limit 0, 10`

		rows, err := db.QueryContext(ctx, sql)
		if err != nil {
			// if unfortunately close database before query
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 404, "Products Not found")
			return
		}
		defer rows.Close()

		type ProductWithSales struct {
			models.Product
			TopSales *int16 `json:"sold"`
		}

		var products []ProductWithSales
		for rows.Next() {
			var product ProductWithSales
			if err := rows.Scan(
				&product.TopSales,
				&product.ID,
				&product.Title,
				&product.Description,
				&product.Price,
				&product.AuthorId,
				&product.BrandId,
				&product.Cover,
				&product.Tags,
				&product.Attributes,
				&product.SpecificationId,
				&product.CreatedAt,
				&product.UpdatedAt,
				&product.SellerID,
				&product.Discount,
				&product.Stock,
			); err != nil {
				console.SaveLog(err.Error())
				response.ErrorHandler(w, 500, "Product fetch error")
				return
			}
			products = append(products, product)
		}

		json.NewEncoder(w).Encode(products)
		return
	} else if body.Type == "top_discount" {
		sql = `
	SELECT
		p.id,
		p.title,
		p.description,
		p.price,
		p.author_id,
		p.brand_id,
		p.cover,
		p.tags,
		p.attributes,
		p.specification_id,
		p.created_at,
		p.updated_at,
		p.seller_id,
		p.discount,
		p.stock
		FROM products p  order by discount desc limit 0, 10`

		rows, err := db.QueryContext(ctx, sql)
		if err != nil {
			// if unfortunately close database before query
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 404, "Products Not found")
			return
		}
		defer rows.Close()

		var products []models.Product
		for rows.Next() {
			var product models.Product
			if err := rows.Scan(
				&product.ID,
				&product.Title,
				&product.Description,
				&product.Price,
				&product.AuthorId,
				&product.BrandId,
				&product.Cover,
				&product.Tags,
				&product.Attributes,
				&product.SpecificationId,
				&product.CreatedAt,
				&product.UpdatedAt,
				&product.SellerID,
				&product.Discount,
				&product.Stock,
			); err != nil {
				console.SaveLog(err.Error())
				response.ErrorHandler(w, 500, "Product fetch error")
				return
			}
			products = append(products, product)
		}

		json.NewEncoder(w).Encode(products)
		return
	} else if body.Type == "top_rating" {
		sql = `
	SELECT
		p.id,
		p.title,
		p.description,
		p.price,
		p.author_id,
		p.brand_id,
		p.cover,
		p.tags,
		p.attributes,
		p.specification_id,
		p.created_at,
		p.updated_at,
		p.seller_id,
		p.discount,
		p.stock,
	  
	  ROUND(((5 * SUM(five_star)) + (4*SUM(four_star)) + (3*SUM(three_star)) + (2*SUM(two_star)) + SUM(one_star))
	          / (SUM(five_star) + SUM(four_star) + SUM(three_star) + SUM(two_star) + SUM(one_star)), 1)  as rate
		FROM products p
			left join product_reviews r on p.id = r.product_id where rate > 0
			group by p.id
	order by rate desc limit 0, 10`

		rows, err := db.QueryContext(ctx, sql)
		if err != nil {
			// if unfortunately close database before query
			console.SaveLog(err.Error())
			response.ErrorHandler(w, 404, "Products Not found")
			return
		}
		defer rows.Close()

		type ProductWithRate struct {
			models.Product
			Rate *string `json:"rate"`
		}

		var productWithRates []ProductWithRate

		for rows.Next() {
			var productWithRate ProductWithRate
			if err := rows.Scan(
				&productWithRate.ID,
				&productWithRate.Title,
				&productWithRate.Description,
				&productWithRate.Price,
				&productWithRate.AuthorId,
				&productWithRate.BrandId,
				&productWithRate.Cover,
				&productWithRate.Tags,
				&productWithRate.Attributes,
				&productWithRate.SpecificationId,
				&productWithRate.CreatedAt,
				&productWithRate.UpdatedAt,
				&productWithRate.SellerID,
				&productWithRate.Discount,
				&productWithRate.Stock,
				&productWithRate.Rate,
			); err != nil {
				console.SaveLog(err.Error())
				response.ErrorHandler(w, 500, err.Error())
				return
			}
			productWithRates = append(productWithRates, productWithRate)
		}

		json.NewEncoder(w).Encode(productWithRates)
		return

	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "please provide type",
		})
	}

}

func FetchProduct(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")

	var params = mux.Vars(request)
	id := params["id"]

	productId, err := strconv.Atoi(id)
	if err != nil {
		console.SaveLog("Please Provide valid product id")
		response.ErrorHandler(writer, 422, "Please Provide valid product id")
		return
	}

	db, err := database.Connect()
	if err != nil {
		console.SaveLog("Database connection Error")
		response.ErrorHandler(writer, 500, "Database Connection Error")
		return
	}
	defer db.Close()

	sql := `
		select
	p.id,
	p.title,
	p.description,
	p.price,
	p.author_id,
	p.brand_id,
	b.name as brand_name,
	p.cover,
	p.tags,
	p.attributes,
	p.specification_id,
	p.created_at,
	p.updated_at,
	p.seller_id,
	p.discount,
	p.stock,
	u.username,
  u.avatar,
  u.email
		from products p
		    join users u on u.id = p.author_id
		left join sales c on p.id = c.product_id 
		left join brands b on p.brand_id = b.id
		WHERE p.id = ?
		`
	ctx, cancel := database.CreateContext(request)
	defer cancel()

	type ProductWithRate struct {
		models.ProductWithAuthor
		BrandName string `json:"brand_name"`
		// Rate []uint8 `json:"rate"`
	}

	var product ProductWithRate
	err = db.QueryRowContext(ctx, sql, productId).
		Scan(
			&product.ID,
			&product.Title,
			&product.Description,
			&product.Price,
			&product.AuthorId,
			&product.BrandId,
			&product.BrandName,
			&product.Cover,
			&product.Tags,
			&product.Attributes,
			&product.SpecificationId,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.SellerID,
			&product.Discount,
			&product.Stock,
			&product.Username,
			&product.Avatar,
			&product.Email,
			// &product.Rate,
		)

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(writer, 500, "internal error")
		return
	}

	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(product)
}

func FetchProductCustomerRatings(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(request)
	productId, ok := params["product_id"]
	if !ok {
		console.SaveLog("Please Provide valid specification id")
		response.ErrorHandler(writer, 422, "please provide specification Id")
		return
	}

	db, err := database.Connect()
	if err != nil {
		console.SaveLog("Database Connection Error")
		response.ErrorHandler(writer, 500, "Database Connection Error")
		return
	}

	defer db.Close()
	ctx, cancel := database.CreateContext(request)
	defer cancel()

	sql := `select
       r.review_id,
       r.rate,
       r.title,
       r.summary,
       r.customer_id,
       r.created_at,
       r.customer_uploads,
       r.product_id,
       r.one_star,
       r.two_star,
       r.three_star,
       r.four_star,
       r.five_star,
       u.username as customer_name,
       u.avatar as customer_cover
from product_reviews r
    join users u on r.customer_id = u.id
where r.product_id =  ?`

	var productReviews []models.ProductReviewWithAuthor

	rows, err := db.QueryContext(ctx, sql, productId)
	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(writer, 500, "internal error")
		return
	}
	defer rows.Close()

	for rows.Next() {
		var productReview models.ProductReviewWithAuthor
		err := rows.Scan(
			&productReview.ReviewId,
			&productReview.Rate,
			&productReview.Title,
			&productReview.Summary,
			&productReview.CustomerId,
			&productReview.CreatedAt,
			&productReview.CustomerUploads,
			&productReview.ProductId,
			&productReview.OneStar,
			&productReview.TwoStar,
			&productReview.ThreeStar,
			&productReview.FourStar,
			&productReview.FiveStar,
			&productReview.CustomerName,
			&productReview.CustomerAvatar,
		)
		if err != nil {
			fmt.Println(err)
			return
		}

		productReviews = append(productReviews, productReview)
	}

	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(&productReviews)
}

func FetchProductSpecification(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(request)
	id, ok := params["id"]
	if !ok {
		console.SaveLog("Please Provide valid specification id")
		response.ErrorHandler(writer, 422, "please provide specification Id")
		return
	}

	db, err := database.Connect()
	if err != nil {
		console.SaveLog("Database Connection Error")
		response.ErrorHandler(writer, 500, "Database Connection Error")
		return
	}

	defer db.Close()
	ctx, cancel := database.CreateContext(request)
	defer cancel()

	sql := `select s.* from product_specifications s where s.specification_id =  ?`

	var productSpecification models.ProductSpecification

	err = db.QueryRowContext(ctx, sql, id).
		Scan(
			&productSpecification.SpecificationId,
			&productSpecification.ProductId,
			&productSpecification.Description,
			&productSpecification.Specifications,
			&productSpecification.Highlights,
			&productSpecification.Ram,
			&productSpecification.Storage,
			&productSpecification.Colors,
		)

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(writer, 500, "internal error")
		return
	}

	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(&productSpecification)
}

func FetchProductQuestions(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(request)
	id, ok := params["id"]
	if !ok {
		console.SaveLog("Please Provide valid specification id")
		response.ErrorHandler(writer, 422, "please provide specification Id")
		return
	}

	productId, err := strconv.Atoi(id)
	if err != nil {
		console.SaveLog("Please Provide valid specification id")
		response.ErrorHandler(writer, 422, "Please Provide valid specification id")
		return
	}

	db, err := database.Connect()
	if err != nil {
		console.SaveLog("Database Connection Error")
		response.ErrorHandler(writer, 500, "Database Connection Error")
		return
	}

	defer db.Close()
	ctx, cancel := database.CreateContext(request)
	defer cancel()

	sql := `select q.* from product_questions q where q.product_id = ?`

	var productQuestions []models.ProductQuestion

	rows, err := db.QueryContext(ctx, sql, productId)
	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(writer, 500, "Internal Error")
		return
	}
	defer rows.Close()
	for rows.Next() {
		var productQuestion models.ProductQuestion
		rows.Scan(
			&productQuestion.QuestionId,
			&productQuestion.Question,
			&productQuestion.Answer,
			&productQuestion.QuestionerId,
			&productQuestion.AnswererId,
			&productQuestion.CreatedAt,
			&productQuestion.ProductId,
		)
		productQuestions = append(productQuestions, productQuestion)
	}

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(writer, 500, "internal error")
		return
	}

	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(&productQuestions)
}

func FilterProduct(writer http.ResponseWriter, request *http.Request) {

	var body struct {
		CurrentPage int `json:"currentPage"`
		PageSize    int `json:"pageSize"`
	}

	json.NewDecoder(request.Body).Decode(&body)

	// offset := body.CurrentPage * body.PageSize

	db, err := database.Connect()
	if err != nil {
		response.ErrorHandler(writer, 500, "Database Connection Error")
		return
	}
	defer db.Close()

	sql := `
	SELECT p.*, u.id as user_id, u.username, u.avatar, u.email, (select count(*) from products) as total FROM products p
	    join users u
	        on p.author_id = u.id
	LIMIT ?, ?
 `

	currentPage := 0
	skip := 0
	if body.CurrentPage == 1 {
		currentPage = 0
		skip = 0

	} else {
		currentPage = body.CurrentPage - 1
		skip = currentPage * body.PageSize
	}

	ctx, cancel := database.CreateContext(request)
	defer cancel()

	rows, err := db.QueryContext(ctx, sql, skip, body.PageSize)

	if err != nil {
		fmt.Println(err)
		response.ErrorHandler(writer, 500, err)
		return
	}
	defer rows.Close()
	var total int

	type ProductWithAuthorAndSales struct {
		models.ProductWithAuthor
		TotalSales int16 `json:"total_sales"`
	}

	var products []ProductWithAuthorAndSales
	for rows.Next() {
		var product ProductWithAuthorAndSales
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
			&product.SpecificationId,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.SellerID,
			&product.Discount,
			&product.Stock,
			&product.Username,
			&product.Avatar,
			&product.Email,
			&product.TotalSales,
			&total,
		)
		if err != nil {
			return
		}

		products = append(products, product)
	}

	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(map[string]interface{}{
		"products":      products,
		"totalProducts": total,
	})
}

func getSql(filter string) string {

	sql := `FROM products p
						join users u on p.author_id = u.id
						left join sales s on s.product_id = p.id`

	p1 := `SELECT
	p.id,
	p.title,
	p.description,
	p.price,
	p.author_id,
	p.brand_id,
	p.cover,
	p.tags,
	p.attributes,
	p.specification_id,
	p.created_at,
	p.updated_at,
	p.seller_id,
	p.discount,
	p.stock,
	u.username,
	u.avatar,
	u.email,
	count(s.product_id) as total_sales,
`

	countSql := `
			SELECT count(*) FROM products p
` + filter

	s := p1 + `(` + countSql + ` ) as total ` + sql + ` ` + filter
	_ = s
	return s
}

func FilterProductV2(writer http.ResponseWriter, request *http.Request) {

	var body struct {
		Range      map[string][][]int       `json:"range"`
		Search     string                   `json:"search"`
		IN         map[string][]interface{} `json:"in"`
		Pagination struct {
			PageSize   int16 `json:"page_size"`
			PageNumber int16 `json:"page_number"`
		} `json:"pagination"`
		Order struct {
			Field string `json:"field"`
			By    string `json:"by"`
		} `json:"order"`
	}

	json.NewDecoder(request.Body).Decode(&body)

	db, err := database.Connect()
	if err != nil {
		response.ErrorHandler(writer, 500, "Database Connection Error")
		return
	}
	defer db.Close()

	// sql := `SELECT p.*, u.id as user_id, u.username, u.avatar, u.email, (`+countSql+`) as total FROM products p
	//      join users u
	//          on p.author_id = u.id WHERE `

	sqlRange := ``

	var sqlGroupRange string

	var mapCount = 0
	for key, value := range body.Range {

		mapCount++

		var attributeName string
		attributeName = `"$.` + key + `"`

		// "rom": [["8", "16"]]
		// "ram": [["4", "8"]]
		// "battery": [["4000", "5000"], ["5000", "6000"]]

		var groupStatement string

		for i := 0; i < len(value); i++ {
			eachRange := value[i]
			var statement string // each range statement attributes->"$.battery" >= 4000 && attributes->"$.battery" <= 5000
			statement = fmt.Sprintf(" attributes->%s >= %d ", attributeName, eachRange[0])
			statement += fmt.Sprintf("&& attributes->%s <= %d ", attributeName, eachRange[1])

			if i+1 == len(value) {
				//
				groupStatement += statement
			} else {
				groupStatement += statement + "||"
			}

			/**
			groupStatement = ?
			if statement is multiple like  [[4000, 5000], [1000, 2000]] then append start with pipe ||
			result:  attributes->"$.battery" >= 4000 && attributes->"$.battery" <= 5000 || attributes->"$.battery" >= 5000 && attributes->"$.battery" <= 6000
			*/

		}

		if mapCount == len(body.Range) {
			sqlGroupRange += fmt.Sprintf(" (%s)", groupStatement)
		} else {
			sqlGroupRange += fmt.Sprintf(" (%s) &&", groupStatement)
		}

		/**
		if range like single attribute like  {"battery": [["4000", "5000"], ["5000", "6000"]]}
		( attributes->"$.battery" >= 4000 && attributes->"$.battery" <= 5000 || attributes->"$.battery" >= 5000 && attributes->"$.battery" <= 6000 )
		*/
	}

	/*
		if range like multiple attribute like  {"battery": [[4000, 5000], [5000, 6000]], "ram": [[2, 4], [6, 8]]}
		( attributes->"$.battery" >= 4000 && attributes->"$.battery" <= 5000 || attributes->"$.battery" >= 5000 && attributes->"$.battery" <= 6000 )
		&&
		( attributes->"$.ram" >= 2 && attributes->"$.ram" <= 4 || attributes->"$.ram" >= 6 && attributes->"$.ram" <= 8 )
	*/

	sqlRange += sqlGroupRange

	sqlIn := ``

	sqlFieldIn := ""

	// filter products with in operator
	mapCount = 0
	var groupOfInStatement string

	for key, value := range body.IN {
		mapCount++

		if len(value) != 0 {
			// means in property a not empty array

			if key == "brands" {
				// product brand_id filter

				var brandValues string
				for i := 0; i < len(value); i++ {
					intV := value[i].(float64)
					if (i + 1) == len(value) {
						brandValues += fmt.Sprintf("%d", int(intV))
					} else {
						brandValues += fmt.Sprintf("%d,", int(intV))
					}
				}

				sqlFieldIn = fmt.Sprintf("brand_id in ( %s )", brandValues)

			} else {
				// attributes filter

				var attributeName string
				attributeName = `"$.` + key + `"`

				/** Here statement look like this
				Select * from products WHERE attributes->"$.display" in ("ips", "super")
				*/

				listOfValue := "( "
				for i := 0; i < len(value); i++ {
					valType := reflect.TypeOf(value[i]).Name()

					if len(value) == i+1 {
						// last loop
						if valType == "float64" {
							var intNum = int(value[i].(float64))
							listOfValue += fmt.Sprintf("%d", intNum) + " )"
						} else {
							listOfValue += fmt.Sprintf("'%s'", value[i]) + " )"
						}

					} else {
						// in ( 'Android','IOS','Windows' )
						if valType == "float64" {
							var intNum = int(value[i].(float64))
							listOfValue += fmt.Sprintf("%d, ", intNum)
						} else {
							listOfValue += fmt.Sprintf("'%s',", value[i])
						}
					}
				}

				statement := fmt.Sprintf("attributes->%s in %s", attributeName, listOfValue)

				if mapCount == 1 {
					groupOfInStatement += statement
				} else {
					if groupOfInStatement == "" {
						groupOfInStatement += statement
					} else {
						groupOfInStatement += " && " + statement
					}
				}
			}
		}

	}

	if sqlGroupRange != "" {
		sqlIn += groupOfInStatement
	} else {
		sqlIn += groupOfInStatement
	}

	// fmt.Println(groupOfInStatement)

	/**
	groupOfInStatement = attributes->"$.display" in ( 'ips' ) && attributes->"$.camera" in ( 13 )
	*/

	// sql := `
	// SELECT p.*, u.id as user_id, u.username, u.avatar, u.email, (select count(*) from products) as total FROM products p
	//     join users u
	//         on p.author_id = u.id
	// LIMIT ?, ?
	// `

	var pageNumber int16 = 0
	var skip int16 = 0

	if body.Pagination.PageNumber == 1 {
		pageNumber = 0
		skip = 0

	} else {
		pageNumber = body.Pagination.PageNumber - 1
		skip = pageNumber * body.Pagination.PageSize
	}

	sqlSearch := ``
	if body.Search != "" {
		sqlSearch += `p.title like ` + "'" + body.Search + "%" + "'"
	}

	sqlOrderBy := ""
	if body.Order.Field != "" {
		sqlOrderBy = `order by ` + body.Order.Field + ` ` + body.Order.By
	}

	ctx, cancel := database.CreateContext(request)
	defer cancel()

	filter := ""

	if sqlIn != "" {
		filter += ` where ` + sqlIn
	}

	if sqlRange != "" {
		if sqlIn != "" {
			filter += ` && ` + sqlRange
		} else {
			filter += ` where ` + sqlRange
		}
	}

	if sqlSearch != "" {
		if sqlRange != "" || sqlIn != "" {
			filter += ` && ` + sqlSearch
		} else {
			filter += ` where ` + sqlSearch
		}
	}

	if sqlFieldIn != "" {
		if filter != "" {
			filter = filter + "&&" + sqlFieldIn

		} else {
			filter = "where " + sqlFieldIn
		}
	}

	sql := getSql(filter)
	sql = sql + ` group by p.id ` + sqlOrderBy + ` LIMIT ?, ?`

	rows, err := db.QueryContext(ctx, sql, skip, body.Pagination.PageSize)
	// rows, err := db.QueryContext(ctx, sql, skip, body.Pagination.PageSize)

	if err != nil {
		console.SaveLog(err.Error() + "SQL Query = " + sql)
		response.ErrorHandler(writer, 500, err)
		return
	}

	type ProductWithAuthorAndSales struct {
		models.ProductWithAuthor
		TotalSales int16 `json:"total_sales"`
	}

	defer rows.Close()
	var total int

	var products []ProductWithAuthorAndSales
	for rows.Next() {
		var product ProductWithAuthorAndSales
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
			&product.SpecificationId,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.SellerID,
			&product.Discount,
			&product.Stock,
			&product.Username,
			&product.Avatar,
			&product.Email,
			&product.TotalSales,
			&total,
		)
		if err != nil {
			console.SaveLog(err.Error() + "SQL Query = " + sql)
			response.ErrorHandler(writer, 500, err)
			return
		}

		products = append(products, product)
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(map[string]interface{}{
		"products":      products,
		"totalProducts": total,
	})
}

func AddProduct(res http.ResponseWriter, req *http.Request) {

	// * .......... AddProduct
	res.Header().Set("Content-Type", "application/json")

	//  only for body data
	// var data map[string]string
	// json.NewDecoder(req.Body).Decode(&data)

	body := struct {
		ID          int32   `json:"id"`
		AuthorId    int32   `json:"author_id"`
		SellerID    int32   `json:"seller_id"`
		Title       string  `json:"title"`
		BrandId     int32   `json:"brand_id"`
		Description string  `json:"description"`
		Price       float64 `json:"price"`
		Discount    int32   `json:"discount"`
		Stock       int32   `json:"stock"`
		Cover       string  `json:"cover"`
		Tags        string  `json:"tags"`
		Attributes  string  `json:"attributes"`
	}{}

	json.NewDecoder(req.Body).Decode(&body)

	if int(body.AuthorId) != middleware.GetAuthId(false) {
		res.WriteHeader(411)
		json.NewEncoder(res).Encode(map[string]string{"message": "Not Authorized"})
		return
	}

	ctx, cancel := database.CreateContext(req)
	defer cancel()

	db, err := database.Connect()
	defer db.Close()

	sql := `
	INSERT into products(title, description, price, brand_id, discount, stock, cover, tags, attributes)
	VALUES(
	       ?, ?, ?, ?, ?, ?, ?, ?, ?
	)
	`

	result, err := db.ExecContext(ctx, sql,
		body.Title,
		body.Description,
		body.Price,
		body.BrandId,
		// body.Discount,
		// body.Stock,
		// body.Cover,
		// body.Tags,
		// body.Attributes,
	)

	rows, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}

	if rows != 1 {
		log.Fatalf("expected to affect 1 row, affected %d", rows)
	}
	res.WriteHeader(201)
	json.NewEncoder(res).Encode(map[string]interface{}{
		"message": "product added successful",
		"product": "",
	})

}

func UpdateProduct(res http.ResponseWriter, req *http.Request) {

	// * .......... Update Product
	res.Header().Set("Content-Type", "application/json")

	p := mux.Vars(req)
	productId := p["id"]

	// only for body data
	var body struct {
		ID          int32   `json:"id"`
		Title       string  `json:"title"`
		BrandId     int32   `json:"brand_id"`
		Description string  `json:"description"`
		Price       float64 `json:"price"`
		Discount    int32   `json:"discount"`
		Stock       int32   `json:"stock"`
		Cover       string  `json:"cover"`
		Tags        string  `json:"tags"`
		Attributes  string  `json:"attributes"`
	}
	json.NewDecoder(req.Body).Decode(&body)

	// if int(body.AuthorId) != middleware.GetAuthId(false) {
	// 	res.WriteHeader(411)
	// 	json.NewEncoder(res).Encode(map[string]string{"message": "Not Authorized"})
	// 	return
	// }
	//

	ctx, cancel := database.CreateContext(req)
	defer cancel()

	db, err := database.Connect()
	defer db.Close()

	sql := `
	UPDATE products
	    SET title=?, description=?, price=?, brand_id=?, discount=?, stock=?, cover=?, tags=?, attributes=?
	WHERE id=?
	`

	result, err := db.ExecContext(ctx, sql,
		body.Title,
		body.Description,
		body.Price,
		body.BrandId,
		body.Discount,
		body.Stock,
		body.Cover,
		body.Tags,
		body.Attributes,
		productId,
	)
	if err != nil {
		fmt.Println(err)
		return
	}

	_, err = result.RowsAffected()

	if err != nil {
		console.SaveLog(err.Error())
		response.ErrorHandler(res, 500, err.Error())
	}

	// if rows != 1 {
	// 		log.Fatalf("expected to affect 1 row, affected %d", rows)
	// 	// console.SaveLog("expected to affect 1 row, affected %d)
	// 	// response.ErrorHandler(res, 500, err.Error())
	// }
	res.WriteHeader(201)
	json.NewEncoder(res).Encode(map[string]interface{}{
		"message": "product update successful",
	})

}
