package server

import (
	"context"
	book "crud-grpc/generated"
)

type BookServer struct {
	book.UnimplementedBookServiceServer
}

// Book fullfills the requirement for Book Server interface
func (s *BookServer) GetBookRequest(ctx context.Context, bookreq *book.GetBookRequest) (*book.Book, error) {
	return &book.Book{
		Id:     1,
		Isbn:   "1234",
		Title:  "Coba Golang GRPC",
		Author: "Feri Ganteng",
	}, nil
}
