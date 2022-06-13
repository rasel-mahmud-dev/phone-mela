package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	ID        primitive.ObjectID `json:"_id, omitempty" bson:"_id, omitempty"`
	Title     string             `json:"title" bson:"title"`
	AuthorId  primitive.ObjectID `json:"authorId, omitempty" bson: "authorId, omitempty"`
	CommentId primitive.ObjectID `json:"commentId, omitempty" bson: "commentId, omitempty"`
}
