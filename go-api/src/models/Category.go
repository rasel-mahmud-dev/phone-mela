package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Category struct {
	ID     primitive.ObjectID `json:"_id, omitempty" bson:"_id, omitempty"`
	Fields []string           `json:"fields", bson:"fields"`
}
