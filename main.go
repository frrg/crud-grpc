package main

import (
	model "crud-grpc/generated"
	"crud-grpc/server"
	"fmt"
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	_ "github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	fmt.Println("running")
	apiserver, err := GenerateTLSApi("cert/server.crt", "cert/server.key")
	if err != nil {
		print(err)
		// log.Fatal(err)
	}
	// Start listening on a TCP Port
	if err != nil {
		// log.Fatal(err)
		print(err)
	}

	bookServer := &server.BookServer{}
	model.RegisterBookServiceServer(apiserver, bookServer)
	userServer := &server.UserServer{}
	model.RegisterUserServiceServer(apiserver, userServer)
	// Start serving
	wrappedGrpc := grpcweb.WrapServer(apiserver)
	Handler := http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
		if wrappedGrpc.IsGrpcWebRequest(req) {
			wrappedGrpc.ServeHTTP(resp, req)
			return
		}
		http.DefaultServeMux.ServeHTTP(resp, req)
	})
	http.ListenAndServe(":8080", Handler)
	// log.Fatal(apiserver.Serve(lis))
}

// GenerateTLSApi will load TLS certificates and key and create a grpc server with those.
func GenerateTLSApi(pemPath, keyPath string) (*grpc.Server, error) {
	cred, err := credentials.NewServerTLSFromFile(pemPath, keyPath)
	if err != nil {
		return nil, err
	}

	s := grpc.NewServer(
		grpc.Creds(cred),
	)

	return s, nil
}
