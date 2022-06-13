package controllers

import (
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/config"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/charge"
	"log"
	"net/http"
)

// Charge incoming data for Stripe API
type Charge struct {
	Amount       int64  `json:"amount"`
	ReceiptEmail string `json:"receiptEmail"`
}

func Pay(w http.ResponseWriter, request *http.Request) {

	charge1 := Charge{
		Amount:       100,
		ReceiptEmail: "raselmr005@gmail.com",
	}

	stripe.Key = config.STRIPE_SECRET_KEY

	_, err := charge.New(&stripe.ChargeParams{
		Amount:       stripe.Int64(charge1.Amount),
		Currency:     stripe.String(string(stripe.CurrencyAUD)),
		Source:       &stripe.SourceParams{Token: stripe.String("tok_visa")}, // this should come from clientside
		ReceiptEmail: stripe.String(charge1.ReceiptEmail)})

	if err != nil {
		log.Println(err)
		// Handle any errors from attempt to charge
		// c.String(http.StatusBadRequest, "Request failed")
		return
	}
	log.Print("Sucess")

}
