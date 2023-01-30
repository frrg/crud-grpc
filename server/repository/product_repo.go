package main

import (
	"context"
	"crud-grpc/generated/product_model"
	"crud-grpc/server/entity"

	"gorm.io/gorm"
)

type server struct {
	db *gorm.DB
}

func (s *server) AddProduct(ctx context.Context, in *product_model.AddProductRequest) (*product_model.AddProductResponse, error) {
	product := &entity.Product{Name: in.Name, Price: float64(in.Price)}
	s.db.Create(product)
	return &product_model.AddProductResponse{Id: int64(product.ID)}, nil
}

func (s *server) GetProduct(ctx context.Context, in *product_model.GetProductRequest) (*product_model.GetProductResponse, error) {
	product := &entity.Product{}
	s.db.First(product, in.Id)
	return &product_model.GetProductResponse{
		Id:    int64(product.ID),
		Name:  product.Name,
		Price: float32(product.Price),
	}, nil
}

func (s *server) ListProducts(ctx context.Context, in *product_model.ListProductsRequest) (*product_model.ListProductsResponse, error) {
	var products []entity.Product
	s.db.Find(&products)

	resp := &product_model.ListProductsResponse{}
	for _, product := range products {
		resp.Products = append(resp.Products, &product_model.GetProductResponse{
			Id:    int64(product.ID),
			Name:  product.Name,
			Price: float32(product.Price),
		})
	}
	return resp, nil
}
