package models

type ProductQuestion struct {
	QuestionId   int32  `json:"question_id"`
	Question     string `json:"question"`
	Answer       string `json:"answer"`
	QuestionerId int32  `json:"questioner_id"`
	AnswererId   int32  `json:"answerer_id"`
	CreatedAt    string `json:"created_at"`
	ProductId    int32  `json:"product_id"`
}
