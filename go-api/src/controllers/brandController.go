package controllers

import (
	"encoding/json"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/database"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/models"
	response2 "github.com/rasel-mahmud-dev/mobile-shop-api/src/response"
	"net/http"
)

func FetchBrands(w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db, err := database.Connect()
	defer db.Close()

	rows, err := db.Query(`SELECT * from brands`)
	if err != nil {
		console.SaveLog(err.Error())
		response2.ErrorHandler(w, 500, "Internal Error")
		return
	}
	defer rows.Close()

	var brands []models.Brand

	for rows.Next() {
		var brand models.Brand
		if err := rows.Scan(
			&brand.ID,
			&brand.Name,
			&brand.CreatedAt,
		); err != nil {
			console.SaveLog(err.Error())
			response2.ErrorHandler(w, 500, "Internal Error")
			return
		}
		brands = append(brands, brand)
	}

	w.WriteHeader(200)
	json.NewEncoder(w).Encode(brands)
}

// func FetchProduct(writer http.ResponseWriter, request *http.Request){
// 	writer.Header().Set("Content-Type", "application/json")
//
// 	var params = mux.Vars(request)
// 	id, ok := params["id"]
// 	if !ok {
// 		response.ErrorHandler(writer, 422, "please provide product Id")
// 		return
// 	}
//
// 	productId, err := strconv.Atoi(id)
// 	if err != nil {
// 		response.ErrorHandler(writer, 422, "Please Provide valid product id")
// 		return
// 	}
//
// 	db, err := database.Connect()
// 	defer db.Close()
//
// 	sql := `
// 		select p.*, u.id as user_id, u.username, u.avatar, u.email
// 			from products p join users u
// 			    on u.id = p.author_id
// 		where p.id = ?
//
// 		`
//
// 	var product models.ProductWithAuthor
// 	err = db.QueryRow(sql, productId).
// 		Scan(
// 		&product.ID,
// 		&product.Title,
// 		&product.Description,
// 		&product.AuthorId,
// 		&product.Price,
// 		&product.BrandId,
// 		&product.Cover,
// 		&product.Tags,
// 		&product.Attributes,
// 		&product.CreatedAt,
// 		&product.UpdatedAt,
// 		&product.UserId,
// 		&product.Username,
// 		&product.Avatar,
// 		&product.Email,
// 	)
//
// 	if err != nil {
// 		fmt.Println(err)
// 		response.ErrorHandler(writer, 500, "internal error")
// 		return
// 	}
//
// 	writer.WriteHeader(200)
// 	json.NewEncoder(writer).Encode(&product)
// }
//
// func FilterProduct(writer http.ResponseWriter, request *http.Request)  {
//
// 	var body struct{
// 		CurrentPage int `json:"currentPage"`
// 		PageSize int `json:"pageSize"`
// 	}
//
// 	json.NewDecoder(request.Body).Decode(&body)
//
// 	// offset := body.CurrentPage * body.PageSize
//
// 	db, err := database.Connect()
// 	defer db.Close()
//
// 	sql := `
// 	SELECT p.*, u.id as user_id, u.username, u.avatar, u.email, (select count(*) from products) as total FROM products p
// 	    join users u
// 	        on p.author_id = u.id
// 	LIMIT ?, ?
//  `
//
// 	ctx, cancel := context.WithTimeout(request.Context(), 3*time.Second)
// 	defer cancel()
//
// 	skip := 0
// 	currentPage := 0
// 	if body.CurrentPage == 1 {
// 		currentPage = 0
// 		skip = 0
//
// 	} else {
// 		currentPage = body.CurrentPage - 1
// 		skip = currentPage + body.PageSize
// 	}
//
// 	// fmt.Println(body.PageSize, currentPage)
// 	fmt.Println(body)
//
// 	rows, err := db.QueryContext(ctx, sql, skip, body.PageSize)
//
// 	if err != nil {
// 		fmt.Println(err)
// 		response.ErrorHandler(writer, 500, err)
// 		return
// 	}
// 	defer rows.Close()
// 	var total int
// 	var products []models.ProductWithAuthor
// 	for rows.Next() {
// 		var product models.ProductWithAuthor
// 		err := rows.Scan(
// 			&product.ID,
// 			&product.Title,
// 			&product.Description,
// 			&product.AuthorId,
// 			&product.Price,
// 			&product.BrandId,
// 			&product.Cover,
// 			&product.Tags,
// 			&product.Attributes,
// 			&product.CreatedAt,
// 			&product.UpdatedAt,
// 			&product.UserId,
// 			&product.Username,
// 			&product.Avatar,
// 			&product.Email,
// 			&total,
// 		)
// 		if err != nil {
// 			return
// 		}
//
// 		products = append(products, product)
// 	}
//
// 	writer.WriteHeader(200)
// 	json.NewEncoder(writer).Encode(map[string]interface{}{
// 		"products": products,
// 		"totalProducts": total,
// 	})
// }

// func FetchProducts(res http.ResponseWriter, req *http.Request)  {
// 	res.Header().Set("Content-Type", "application/json")
//
// 	params := req.URL.Query()
// 	authorId := params["authorId"][0]
//
// 	page, _ := strconv.ParseInt(params["page"][0], 10, 32)
// 	perPage, _ := strconv.ParseInt(params["perPage"][0], 10, 32)
//
// 	// * sort
// 	// sort := options.FindOptions.SetSort("brand")
//
// 	// * simple pagination
// 	skip := (page - 1) * perPage
// 	limit := perPage
// 	opts := options.FindOptions{
// 		Skip: &skip,
// 		Limit: &limit,
// 	}
//
// 	sortBy := params["sort"]
// 	if len(sortBy) != 0 {
// 		order := params["order"]
// 		if len(order) != 0 {
//
// 		}
// 		if len(order) == 0 {
//
// 		}
// 		opts.SetSort(bson.D{{sortBy[0], 1}})
// 	}
//
// 	Product, ctx := database.GetDBCollection("products")
//
// 	var cursor *mongo.Cursor
//
// 	_id, err := primitive.ObjectIDFromHex(authorId)
// 	if err != nil {
// 		fmt.Println("all products")
// 		cursor, _ = Product.Find(ctx, bson.M{}, &opts)
// 	} else{
// 		cursor, _ = Product.Find(ctx, bson.M{"authorid": _id}, &opts)
// 		fmt.Println("only logged user products")
// 	}
// 	defer cursor.Close(ctx)
//
// 	var products []interface{}
//
// 	for cursor.Next(ctx) {
// 		var product models.Product
// 		_ = cursor.Decode(&product)
// 		products = append(products, product)
// 	}
// 	json.NewEncoder(res).Encode(products)
// }
//

//
// func AddProduct(res http.ResponseWriter, req *http.Request)  {
// // * .......... AddProduct
// 	res.Header().Set("Content-Type", "application/json")
//
// 	//  only for body data
// 	// var data map[string]string
// 	// json.NewDecoder(req.Body).Decode(&data)
//
// 	data := map[string]string{
// 		"name": req.FormValue("name"),
// 		"description": req.FormValue("description"),
// 		"brand": req.FormValue("brand_id"),
// 		"price": req.FormValue("price"),
// 		"quantity": req.FormValue("quantity"),
// 		"authorid": req.FormValue("authorid"),
// 	}
//
// 	if data["authorid"] != middleware.GetAuth() {
// 		json.NewEncoder(res).Encode(map[string]string{"message.svg": "Not Authorized not matched author "})
// 		return
// 	}
//
// 	_id, _ := primitive.ObjectIDFromHex(middleware.GetAuth())
// 	brandId, err := primitive.ObjectIDFromHex(data["brand"])
// 	errorHandler(res, err, "Please Provide brand ID not name")
//
// 	newProduct := models.Product{
// 		ID:          primitive.NewObjectID(),
// 		Name:        data["name"],
// 		BrandID:      brandId,
// 		Quantity:    stringToParseInt(data["quantity"]),
// 		Description: data["description"],
// 		Price:       stringToParseFloat(data["price"]),
// 		AuthorId:      _id,
// 		// CreatedAt: primitive.Timestamp{
// 		// 	T: uint32(time.Now().Unix()),
// 		// 	I: uint32(time.Now().Unix()),
// 		// },
// 	}
//
// 	file, err := FileUpload.Upload("uploads/images/products/", "cover_photo", req)
// 	if err != nil {
// 		// fmt.Println(err)
// 	}
// 	newProduct.Photo = file.Path
// 	// fmt.Println(newProduct)
// 	ProductModel, ctx := database.GetDBCollection("products")
// 	one, err := ProductModel.InsertOne(ctx, newProduct)
// 	if err != nil {
// 		fmt.Println("err")
// 	}
// 	json.NewEncoder(res).Encode(map[string]interface{}{"_id": one.InsertedID})
//
// }
//
//
//
// func AddBrand(res http.ResponseWriter, req *http.Request)  {
// // * .......... AddBrand
// 	res.Header().Set("Content-Type", "application/json")
//
// 	var data map[string]string
// 	json.NewDecoder(req.Body).Decode(&data)
//
// 	// if data["authorid"] != middleware.GetAuth() {
// 	// 	json.NewEncoder(res).Encode(map[string]string{"message.svg": "Not Authorized not matched author "})
// 	// 	return
// 	// }
//
// 	// _id, _ := primitive.ObjectIDFromHex(middleware.GetAuth())
//
// 	newBrand := models.Brand{
// 		ID:          primitive.NewObjectID(),
// 		Name:        data["name"],
// 	}
//
// 	Brand, ctx := database.GetDBCollection("brands")
// 	result, _ := Brand.InsertOne(ctx, newBrand)
// 	json.NewEncoder(res).Encode(result)
// }
//
// func GetBrand(res http.ResponseWriter, req *http.Request)  {
// 	res.Header().Set("Content-Type", "application/json")
//
// 	Brand, ctx := database.GetDBCollection("brands")
// 	cursor, _ := Brand.Find(ctx, bson.M{})
// 	defer cursor.Close(ctx)
// 	var brands []models.Brand
// 	for cursor.Next(ctx) {
// 		var brand models.Brand
// 		cursor.Decode(&brand)
// 		brands = append(brands, brand)
// 	}
// 	json.NewEncoder(res).Encode(brands)
// }
//
//
//
// // func FetchAdminProducts(res http.ResponseWriter, req *http.Request){
// // 	res.Header().Set("Content-Type", "application/json")
// //
// // 	params := mux.Vars(req)
// // 	_id, _ := primitive.ObjectIDFromHex(params["authorId"])
// //
// // 	ProductModel := collection.Database().Collection("products")
// // 	cursor, _ := ProductModel.Find(ctx, bson.D{{"authorid", _id}})
// // 	var products []interface{}
// // 	for cursor.Next(ctx) {
// // 			var product models.Product
// // 		_ = cursor.Decode(&product)
// // 		products = append(products, product)
// // 	}
// // 	json.NewEncoder(res).Encode(products)
// // }
//
//
// func FilterProductCount(res http.ResponseWriter, req *http.Request){
// 	res.Header().Set("Content-Type", "application/json")
//
// 	// filterData Document
// 	var data map[string]interface{}
// 	json.NewDecoder(req.Body).Decode(&data)
//
// 	query := bson.D{}
//
// 	for key := range data {
// 		if key == "search" {
// 			v := data[key].(map[string]interface{})
// 			// query = append(bson.D{{
// 			// 		"$or", []bson.M{
// 			// 			bson.M{"name":  bson.D{{"$regex", primitive.Regex{Pattern: "iPhone 11", Options: "i"}}} },
// 			// 			bson.M{"brand": "apple" },
// 			// 			bson.M{"name": "nova 8 SE" },
// 			// 		},
// 			// 	},
// 			// })
//
// 			// all of $or fields and value
// 			var arrOfOr []bson.M
//
// 			for _, item := range v["fields"].([]interface{})  {
// 				arrOfOr = append(arrOfOr, bson.M{ item.(string):  bson.D{{"$regex", primitive.Regex{Pattern: v["value"].(string), Options: "i"}}} },)
// 			}
//
// 			query = append(query, bson.E{"$or", arrOfOr})
//
// 		} else if key == "range" {
// 			filterRange := data[key].(map[string]interface{})
// 			for j := range filterRange {
// 				f := filterRange[j].([]interface{})
// 				if len(f) == 2 {
// 					query = append(query, bson.E{"price", bson.D{{"$gt", f[0]}, { "$lt", f[1]}}})
// 				}
// 			}
// 		} else if key == "gt" {
// 			filterGt := data[key].(map[string]interface{})
// 			for h := range filterGt {
// 				if filterGt[h].(float64) > -1 {
// 					query = append(query, bson.E{Key: h, Value: bson.D{{"$gt", filterGt[h]}}})
// 				}
// 			}
// 		} else if key == "lt" {
// 			filterGt := data[key].(map[string]interface{})
// 			for h := range filterGt {
// 				if filterGt[h].(float64) > -1 {
// 					query = append(query, bson.E{Key: h, Value: bson.D{{"$lt", filterGt[h]}}})
// 				}
// 			}
// 		} else if key == "filter" {
// 			filterFieldColl := data[key].(map[string]interface{})
//
// 			for key, val := range filterFieldColl {
// 				var A bson.A
// 				arr := val.([]interface{})
// 				if len(arr) > 0 {
// 					if key == "brand" {
// 						for _, s := range arr {
// 							brandId, _ := primitive.ObjectIDFromHex(s.(string))
// 							A = append(A, brandId)
// 						}
// 						query = append(query, bson.E{"brand_id", bson.M{"$in":  A }})
// 					} else{
// 						for _, s := range arr {
// 							A = append(A, s)
// 						}
// 						query = append(query, bson.E{key, bson.M{"$in":  A }} )
// 					}
// 				}
// 			}
// 		}
// 	}
//
// 	opts := options.Count().SetMaxTime(2 * time.Second)
// 	ProductModel, ctx := database.GetDBCollection("products")
//
// 	counts, err := ProductModel.CountDocuments(ctx, query, opts)
// 	if err != nil {
// 		fmt.Println("count fail")
// 	}
// 	json.NewEncoder(res).Encode(counts)
// }
//
// func ProductCount(res http.ResponseWriter, req *http.Request){
// 	res.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(req)
//
//
// 	opts := options.Count().SetMaxTime(2 * time.Second)
// 	ProductModel, ctx := database.GetDBCollection("products")
//
// 	var counts int64
//
// 	if params["authorId"] != "all" {
// 		_id, err := primitive.ObjectIDFromHex(params["authorId"])
// 		if err != nil {
// 				fmt.Println(err)
// 			}
//
// 		count, err := ProductModel.CountDocuments(ctx, bson.M{"authorid": _id}, opts)
// 		if err != nil {
// 			fmt.Println("count fail")
// 		}
// 		counts = count
//
// 	} else {
// 		count, err := ProductModel.CountDocuments(ctx, bson.M{}, opts)
// 		if err != nil {
// 			fmt.Println("count fail")
// 		}
// 		counts = count
// 	}
// 	json.NewEncoder(res).Encode(counts)
// }
//
// func FetchProduct(res http.ResponseWriter, req *http.Request){
// 	res.Header().Set("Content-Type", "application/json")
//
// 	var params = mux.Vars(req)
// 	id, ok := params["id"]
// 	if !ok {
// 		fmt.Println("please provide product Id")
// 		return
// 	}
//
// 	if id == "undefined" {
// 		fmt.Println("please provide product Id")
// 		return
// 	}
//
// 	_id, err := primitive.ObjectIDFromHex(id)
// 	errorHandler(res, err, "Invalid product id")
//
// 	filterById := bson.D{
// 		{ "$match", bson.D{{ "_id",  _id}} },
// 	}
//
// 	authorPopulate := bson.D{
// 		{"$lookup", bson.D{
// 			{"from", "users"},
// 			{"localField", "authorid"},
// 			{"foreignField", "_id"},
// 			{"as", "author"},
// 		}},
// 	}
//
// 	groupAuthor := bson.D{
// 		{"$unwind", bson.D{
// 			{"path", "$author"},
// 			{ "preserveNullAndEmptyArrays", true },
// 		}},
// 	}
//
// 	brandPopulate := bson.D{
// 		{"$lookup", bson.D{
// 			{"from", "brands"},
// 			{"localField", "brand_id"},
// 			{"foreignField", "_id"},
// 			{"as", "brand_id"},
// 		}},
// 	}
//
// 	groupBrand := bson.D{
// 		{"$unwind", bson.D{
// 			{"path", "$brand_id"},
// 			{ "preserveNullAndEmptyArrays", true },
// 		}},
// 	}
//
// 	ProductModel, ctx := database.GetDBCollection("products")
// 	cursor,  _ := ProductModel.Aggregate(ctx, mongo.Pipeline{ filterById, authorPopulate, groupAuthor, brandPopulate, groupBrand })
// 	defer cursor.Close(ctx)
// 	var product []bson.M
// 	err = cursor.All(ctx, &product)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
//
// 	time.Sleep(time.Millisecond * 1000)
// 	json.NewEncoder(res).Encode(product[0])
// }
//
// func UpdateProduct(res http.ResponseWriter, req *http.Request){
// 	res.Header().Set("Content-Type", "application/json")
//
// 	data := map[string]string{
// 		"_id": req.FormValue("_id"),
// 		"authorid": req.FormValue("authorid"),
// 		"name": req.FormValue("name"),
// 		"description": req.FormValue("description"),
// 		"brand": req.FormValue("brand_id"),
// 		"price": req.FormValue("price"),
// 		"quantity": req.FormValue("quantity"),
// 	}
//
// 	var params = mux.Vars(req)
// 	_id, err := primitive.ObjectIDFromHex(params["id"])
// 	errorHandler(res, err, "please provide valid update product id")
//
// 	file, err := FileUpload.Upload("uploads/images/products/", "cover_photo", req)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	data["photo"] = file.Path
// 	// fmt.Println(data)
// 	after := options.After
// 	upsert := true
// 	opts := options.FindOneAndUpdateOptions{
// 		ReturnDocument:               &after,
// 		Upsert:                     &upsert,
// 	}
//
//
// 	// newProduct := models.Product{
// 	// 	ID:          primitive.NewObjectID(),
// 	// 	Name:        data["name"],
// 	// 	BrandID:      brandId,
// 	// 	Quantity:    stringToParseInt(data["quantity"]),
// 	// 	Description: data["description"],
// 	// 	Price:       stringToParseFloat(data["price"]),
//
// 	var emptyBsonD bson.D
// 	for key, value := range data{
// 		if key != "_id" && key != "authorid" {
//
// 			if key == "brand" {
// 				brandId, err := primitive.ObjectIDFromHex(data["brand"])
// 				errorHandler(res, err,  "Please Provide brand ID not name")
// 				emptyBsonD = append(emptyBsonD, bson.E{Key: "brand_id",  Value: brandId })
//
// 			} else if key == "quantity" {
// 				emptyBsonD = append(emptyBsonD, bson.E{Key: key,  Value: stringToParseInt(value) })
//
// 			} else if key == "price" {
// 				emptyBsonD = append(emptyBsonD, bson.E{Key: key,  Value: stringToParseFloat(value) })
//
// 			} else{
// 				if value != "" {
// 					emptyBsonD = append(emptyBsonD, bson.E{Key: key, Value: value} )
// 				}
// 			}
//
// 		}
// 	}
//
// 	// updated date.....
// 	emptyBsonD = append(emptyBsonD, bson.E{Key: "updated_at", Value: primitive.Timestamp{ T: uint32(time.Now().Unix())}} )
//
// 	fmt.Println(emptyBsonD)
//
// 	filter := bson.D{{"_id", _id}}
// 	update := bson.D{{"$set", emptyBsonD}}
// 	var updatedDocument bson.M
// 	ProductModel, ctx := database.GetDBCollection("products")
// 	ProductModel.FindOneAndUpdate(ctx, filter, update, &opts).Decode(&updatedDocument)
//
// 	json.NewEncoder(res).Encode(updatedDocument)
// }
//
//
// func DeleteProduct(res http.ResponseWriter, req *http.Request){
// 	res.Header().Set("Content-Type", "application/json")
//
// 	var params = mux.Vars(req)
// 	_id, _ := primitive.ObjectIDFromHex(params["id"])
//
//
// 	ProductModel, ctx := database.GetDBCollection("products")
// 	result, _ := ProductModel.DeleteOne(ctx, bson.M{"_id": _id})
// 	if result.DeletedCount == 0 {
// 		json.NewEncoder(res).Encode(map[string]string{"message.svg": "product not found"})
// 		return
// 	}
// 	json.NewEncoder(res).Encode(map[string]string{"message.svg": "product deleted", "_id" : params["id"]})
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// //
// //
// // func GetPost(response http.ResponseWriter, request *http.Request)  {
// // 	response.Header().Set("Content-Type", "application/json")
// // 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
// // 	client, _:= mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost/27017"))
// // 	PostModel := client.Database("myDB").Collection("posts")
// // 	// params := mux.Vars(request)
// // 	// id, _ := primitive.ObjectIDFromHex("5fbe78d96842d534d0e7955a")
// // 	// authorId, _ := primitive.ObjectIDFromHex("5fbe21ceb793cfa1b8a2a03d")
// //
// // 	comments := bson.D{
// // 		{"$lookup", bson.D{
// // 			{"from", "comments"},
// // 			{ "localField", "commentId"},
// // 			{ "foreignField", "_id"},
// // 			{"as", "comments"},
// // 		},
// //
// // 		},
// // 	}
// // 	groupStage := bson.D{{"$unwind", bson.D{{"path", "$comments"}, { "preserveNullAndEmptyArrays", true }}}	}
// // 	commenter := bson.D{
// // 		{
// // 			"$lookup", bson.D{
// // 			{"from", "users"},
// // 			{ "localField", "comments.commenterid"},
// // 			{ "foreignField", "_id"},
// // 			{"as", "comments.commenter"},
// // 		},
// // 		},
// // 	}
// //
// // 	commenterGroup := bson.D{{"$unwind", bson.D{{"path", "$comments.commenter"}, { "preserveNullAndEmptyArrays", true }}}	}
// // 	commenterPosts := bson.D{
// // 		{
// // 			"$lookup", bson.D{
// // 			{"from", "posts"},
// // 			{ "localField", "comments.commenter.postId"},
// // 			{ "foreignField", "_id"},
// // 			{"as", "comments.commenter.posts"},
// // 		},
// // 		},
// // 	}
// // 	// commenterPostsGroup := bson.D{{"$unwind", bson.D{{"path", "$comments.commenter.posts"}, { "preserveNullAndEmptyArrays", true }}}	}
// //
// // 	cursor,  t :=PostModel.Aggregate(ctx, mongo.Pipeline{ comments, groupStage, commenter, commenterGroup, commenterPosts })
// // 	var showWithInfo []bson.M
// // 	err := cursor.All(ctx, &showWithInfo)
// // 	if err != nil {
// // 		fmt.Println(err)
// // 	}
// // 	fmt.Println(t)
// //
// // 	json.NewEncoder(response).Encode(showWithInfo)
// // }
// //
// // func AddPost(response http.ResponseWriter, request *http.Request) {
// // 	response.Header().Set("Content-Type", "application/json")
// // 	fmt.Println("Add Post")
// //
// // 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
// // 	client, _:= mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost/27017"))
// // 	database := client.Database("myDB")
// // 	posts := database.Collection("posts")
// //
// // 	var data map[string]string
// // 	json.NewDecoder(request.Body).Decode(&data)
// // 	p1 := models.Post{
// // 		ID:    primitive.NewObjectID(),
// // 		Title: data["title"],
// // 	}
// // 	j, _ := primitive.ObjectIDFromHex(data["authorId"])
// // 	p1.AuthorId  = j
// //
// // 	u, _ := posts.InsertOne(ctx, p1)
// // 	json.NewEncoder(response).Encode(u)
// //
// // }
// //
