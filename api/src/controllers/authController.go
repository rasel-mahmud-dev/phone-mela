package controllers

import (
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"mobile-shop/api/src/config"
	"mobile-shop/api/src/database"
	"mobile-shop/api/src/middleware"
	"mobile-shop/api/src/models"
	"mobile-shop/api/src/response"
	"time"
	
	// "mobile-shop/api/db"
	// "mobile-shop/api/middleware"
	// "mobile-shop/api/models"
	// sessions2 "mobile-shop/api/sessions"
	"net/http"
)

// var (
// 	key = []byte("super-secret-key")
// 	store = sessions.NewCookieStore(key)
// )
//
// const (
// 	APP_KEY = "golangcode.com"
// )
//
// func secret(w http.ResponseWriter, r *http.Request) {
// 	session, _ := store.Get(r, "cookie-name")
//
// 	// Check if user is authenticated
// 	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
// 		http.Error(w, "Forbidden", http.StatusForbidden)
// 		return
// 	}
//
// 	// Print secret message.svg
// 	fmt.Fprintln(w, "The cake is a lie!")
// }


// func Registration(res http.ResponseWriter, req *http.Request) {
// 		res.Header().Set("Content-Type", "application/json")
//
// 		var data map[string]string
// 		json.NewDecoder(req.Body).Decode(&data)
//
// 	UserModel, ctx := db.GetDBCollection("users")
//
// 		var existUser models.User
// 		err := UserModel.FindOne(ctx, bson.D{{"email", data["email"]}}).Decode(&existUser)
// 		if err == nil{
// 			_ = json.NewEncoder(res).Encode(map[string]interface{}{"message.svg": "User Already Exit"})
// 			return
// 		}
//
// 		newUser := models.User{
// 			ID:       primitive.NewObjectID(),
// 			Username: data["username"],
// 			Email:    data["email"],
// 		}
// 		// ? Take Lot of Time..... if salt 14 but 5 ok
// 		hashedPass, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 5)
// 		newUser.Password = string(hashedPass)
//
// 		result, _ := UserModel.InsertOne(ctx, newUser)
//
// 		var createUser models.User
// 		UserModel.FindOne(ctx, bson.D{{"_id", result.InsertedID}}).Decode(&createUser)
//
// 		json.NewEncoder(res).Encode(createUser)
//
// 	}


func Login(writer http.ResponseWriter, request *http.Request) {
	// writer.Header().Set("Content-Type", "application/json")
	
		var data map[string]interface{}
		json.NewDecoder(request.Body).Decode(&data)
	
		db := database.Connect()
		defer db.Close()
	
	
		user := models.User{}
	
		err := db.QueryRow(`SELECT id, username, email, avatar, password FROM users where email = ?`, data["email"]).
			Scan(
				&user.ID,
				&user.Username,
				&user.Email,
				&user.Avatar,
				&user.Password,
				)
		if err != nil {
			response.ErrorHandler(writer, 404, "Please Registration first")
			return
		}
	
		claims := jwt.MapClaims{
			"id": user.ID,
			"exp": time.Now().Add(config.JWT_EXPIRE).Unix(),
			"iat": time.Now().Unix(),
		}
		
		token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), claims)
		signedString, err := token.SignedString([]byte(config.SECRET_KEY))
		if err != nil {
			response.ErrorHandler(writer, 500, "Server Error")
			return
		}
		
		writer.WriteHeader(201)
		json.NewEncoder(writer).Encode(map[string]interface{}{
			"id": user.ID,
			"username": user.Username,
			"email": user.Email,
			"avatar": user.Avatar,
			"token": signedString,
		})
		
		
		// UserModel, ctx := db.GetDBCollection("users")
		// var existUser models.User
		// err := UserModel.FindOne(ctx, bson.D{{"email", data["email"]}}).Decode(&existUser)
		// if err != nil {
		// 	json.NewEncoder(response).Encode(map[string]string{"message.svg": "please registration first"})
		// 	return
		// }
		//
		// id, _ := json.Marshal(existUser.ID)
		// session, _ := sessions2.Session().Get(request, "cookie-name")
		// session.Values["userId"]  = string(id)
		// _ = session.Save(request, response)
		//
		// _ = json.NewEncoder(response).Encode(existUser)
	}

	
func LoginCurrentUser(writer http.ResponseWriter, req *http.Request)  {
	
	authId := middleware.GetAuthId(false)
	if authId == 0 {
		response.ErrorHandler(writer, 403, "Your token expires")
		return
	}
	
	db := database.Connect()
	defer db.Close()
	
	
	user := models.User{}
	
	err := db.QueryRow(`SELECT id, username, email, avatar, password FROM users where id = ?`, authId).
			Scan(
				&user.ID,
				&user.Username,
				&user.Email,
				&user.Avatar,
				&user.Password,
			)
	if err != nil {
		response.ErrorHandler(writer, 404, "Please Registration first")
		return
	}
	
	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(map[string]interface{}{
		"id": user.ID,
		"username": user.Username,
		"email": user.Email,
		"avatar": user.Avatar,
	})
	}


// func LoginOut(res http.ResponseWriter, req *http.Request){
// 	session, _ := sessions2.Session().Get(req, "cookie-name")
//
// 	// delete userId from session
// 	delete(session.Values, "userId")
// 	err := session.Save(req, res)
// 	if err != nil {
// 			json.NewEncoder(res).Encode(map[string]string{"message.svg": "You are Logout"})
// 	}
// 	json.NewEncoder(res).Encode(map[string]string{"message.svg": "Logout unsuccessful"})
// }
