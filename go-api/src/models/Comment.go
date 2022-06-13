package models

type Comment struct {
	ID              uint32 `json:"id" database:"id"`
	Text            string `json:"text"`
	PostId          uint32 `json:"post_id" database:"post_id"`
	UserId          uint32 `json:"user_id" database:"user_id"`
	ParentId        uint32 `json:"parent_id" database:"parent_id"`
	TotalSubComment uint32 `json:"total_sub_comment"`
	CreatedAt       string `json:"created_at" database:"created_at"`
}

type CommentWithAuthor struct {
	Comment
	Author struct {
		Username string `json:"username"`
		Avatar   string `json:"avatar"`
	} `json:"author"`
}
