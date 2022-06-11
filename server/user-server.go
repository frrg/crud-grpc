package server

import (
	"context"
	user "crud-grpc/generated"
)

type UserServer struct {
	user.UnimplementedUserServiceServer
}

// User fullfills the requirement for User Server interface
func (s *UserServer) User(ctx context.Context, ping *user.GetUserRequest) (*user.User, error) {
	return &user.User{
		Id:   1,
		Name: "Ferii",
	}, nil
}
