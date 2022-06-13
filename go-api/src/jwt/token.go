package jwt

import (
	"fmt"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/config"
	"net/http"
	"time"
)

func CreateToken(userId uint32) (string, error) {
	claims := jwt.MapClaims{}
	claims["userId"] = userId
	claims["exp"] = time.Now().Add(config.JWT_EXPIRE).Unix()
	claims["iat"] = time.Now().Unix()

	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), claims)

	tokenString, err := token.SignedString([]byte(config.SECRET_KEY))
	return tokenString, err
}

func TokenValid(token string) (userId uint32, err error) {

	tokenExtract, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte(config.SECRET_KEY), nil
	})

	if err != nil {
		return 0, err
	}

	claims, ok := tokenExtract.Claims.(jwt.MapClaims)
	if ok && tokenExtract.Valid {
		return uint32(claims["id"].(float64)), nil
	}
	return 0, err
}

func ExtractToken(req *http.Request) string {
	token := req.Header.Get("X-AUTH-TOKEN")
	return token
}
