book:
	protoc ./model/book.proto --js_out=import_style=commonjs,binary:./web/generated/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./web/generated/ --go-grpc_out=./generated/ --go_out=./generated/

product: protoc ./model/product.proto --go-grpc_out=./generated/ --go_out=./generated/